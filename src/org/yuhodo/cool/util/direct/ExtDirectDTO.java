package org.yuhodo.cool.util.direct;

import java.io.Serializable;

public class ExtDirectDTO implements Serializable {
    private static final long serialVersionUID = -1412521088994778147L;
    private String action;
    private String method;
    private String type;
    private int tid;

    public enum Type {
        rpc,
        exception
    }

    public ExtDirectDTO() {
        this.action = "";
        this.method = "";
        this.type = null;
        this.tid = 0;
    }

    public ExtDirectDTO(ExtDirectDTO dto) {
        this.action = dto.getAction();
        this.method = dto.getMethod();
        this.type = dto.getType().toString();
        this.tid = dto.getTid();
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type.toString();
    }

    public int getTid() {
        return tid;
    }

    public void setTid(int tid) {
        this.tid = tid;
    }
}
