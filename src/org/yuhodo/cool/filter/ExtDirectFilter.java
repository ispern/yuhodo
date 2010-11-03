package org.yuhodo.cool.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;
import net.arnx.jsonic.JSONException;

import org.slim3.controller.ControllerConstants;
import org.slim3.controller.FrontController;
import org.slim3.util.StringUtil;
import org.yuhodo.cool.util.direct.ExceptionAnswer;
import org.yuhodo.cool.util.direct.ExtDirectAnswer;
import org.yuhodo.cool.util.direct.ExtDirectDTO;
import org.yuhodo.cool.util.direct.ExtDirectException;
import org.yuhodo.cool.util.direct.ExtDirectDTO.Type;
import org.yuhodo.cool.util.direct.ExtDirectUtil.Const;
import org.yuhodo.cool.util.direct.form.ExtDirectFormRequest;
import org.yuhodo.cool.util.direct.json.ExtDirectJsonRequest;


public class ExtDirectFilter extends FrontController {

    @Override
    protected void doFilter(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
                throws IOException, ServletException {

        ExtDirectDTO requestParam = null;
        try {
            if (request.getCharacterEncoding() == null) {
                request.setCharacterEncoding(charset);
            }

            // リクエストパラメータのパース
            requestParam = parseRequest(request);

            // リクエストパラメータのチェック
            this.checkParams(requestParam);

            // パスの生成
            StringBuilder path = new StringBuilder("/");
            path.append(requestParam.getAction());
            path.append("/");
            path.append(requestParam.getMethod());

            request.setAttribute(Const.EXT_DIRECT_QUERY, requestParam);

            if (request.getAttribute(ControllerConstants.ROUTED_KEY) == Boolean.TRUE) {
                request.removeAttribute(ControllerConstants.ROUTED_KEY);
                doFilter(request, response, chain, path.toString());
            } else {
                request.setAttribute(ControllerConstants.ROUTED_KEY, true);
                doForward(request, response, path.toString());
            }
        } catch (Exception e) {
            if (requestParam == null) {
                requestParam = new ExtDirectJsonRequest();
            }
            this.handleError(response, requestParam, e);
        }
    }

    /**
     * Do a forward to the path.
     *
     * @param request the request
     * @param response the response
     * @param path the path
     * @throws IOException if {@link IOException} has occurred
     * @throws ServletException if {@link ServletException} has occurred
     */
    @Override
    protected void doForward(HttpServletRequest request,
            HttpServletResponse response, String path) throws IOException,
            ServletException {
        RequestDispatcher rd = servletContext.getRequestDispatcher(path);
        if (rd == null) {
            throw new ExtDirectException(
                "The rquest dispatcher specified by the path ("
                + path
                + ") is not found.");
        }
        rd.forward(request, response);
    }

    private String parseRequest(BufferedReader reader) throws IOException {
        StringBuilder param = new StringBuilder();
        String buf = null;
        while((buf = reader.readLine()) != null) {
            param.append(buf);
        }
        return param.toString();
    }

    private ExtDirectDTO parseRequest(HttpServletRequest request) throws IOException {
        if (request.getParameter(Const.EXT_ACTION) == null) {
            return this.parseJsonRequest(request);
        }

        return this.parseFormRequest(request);
    }

    private ExtDirectDTO parseFormRequest(HttpServletRequest request) {
         @SuppressWarnings("rawtypes")
        Enumeration names = request.getParameterNames();
        ExtDirectFormRequest query = new ExtDirectFormRequest();
        Map<String, Object> params = new HashMap<String, Object>();
        while (names.hasMoreElements()) {
            String name = (String) names.nextElement();
            if (name.equals(Const.EXT_ACTION)) {
                query.setAction(request.getParameter(Const.EXT_ACTION));
            } else if (name.equals(Const.EXT_METHOD)) {
                query.setMethod(request.getParameter(Const.EXT_METHOD));
            } else if (name.equals(Const.EXT_TID)) {
                query.setTid(Integer.parseInt(request.getParameter(Const.EXT_TID)));
            } else if (name.equals(Const.EXT_TYPE)) {
                query.setType(Enum.valueOf(Type.class, request.getParameter(Const.EXT_TYPE)));
            } else {
                params.put(name, request.getParameter(name));
            }
        }
        query.setData(params);

        return query;
    }

    @SuppressWarnings("unchecked")
    private ExtDirectDTO parseJsonRequest(HttpServletRequest request) throws IOException {
        String query = this.parseRequest(request.getReader());
        Map<String, Object> requestParam = JSON.decode(query, Map.class);

        ExtDirectJsonRequest obj = new ExtDirectJsonRequest();
        obj.setAction((String) requestParam.get(Const.ACTION));
        obj.setMethod((String) requestParam.get(Const.METHOD));
        obj.setType(Enum.valueOf(Type.class, (String) requestParam.get(Const.TYPE)));
        obj.setTid(((BigDecimal) requestParam.get(Const.TID)).intValue());
        obj.setData((List<Object>) requestParam.get(Const.DATA));

        return obj;
    }

    private boolean checkParams(ExtDirectDTO obj) {
        if (StringUtil.isEmpty(obj.getAction()) || StringUtil.isEmpty(obj.getMethod())
                || obj.getType() == null) {
            throw new ExtDirectException("requested action name should not be null");
        } else if (!obj.getType().equals(ExtDirectDTO.Type.rpc.toString())) {
            throw new ExtDirectException("request type '" + obj.getType()
                + "' is not supported. it should be only 'rpc'");
        }
        return true;
    }

    private void handleError(HttpServletResponse response, ExtDirectDTO query,
            Throwable error) throws JSONException, IOException {
        ExtDirectAnswer answer = new ExceptionAnswer(query, error.getMessage(),
            error.toString());

        response.getWriter().write(JSON.encode(answer));
    }
}
