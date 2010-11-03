package org.yuhodo.cool.util.direct.form;

import java.util.Map;

import org.yuhodo.cool.util.direct.ExtDirectDTO;



public class ExtDirectFormRequest extends ExtDirectDTO {
    private static final long serialVersionUID = 3033899042357548920L;
    private Map<String, Object> data;


    public Map<String, Object> getData() {
        return data;
    }
    public void setData(Map<String, Object> data) {
        this.data = data;
    }

}
