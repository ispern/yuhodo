package org.yuhodo.cool.util.direct;

public class ExceptionAnswer extends ExtDirectAnswer {
    private static final long serialVersionUID = -1916901047425202781L;
    private String message;
    private String where;

    public ExceptionAnswer(ExtDirectDTO query, String message, String where) {
        super(query, "");
        this.message = message;
        this.where = where;
        this.setType(ExtDirectDTO.Type.exception);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getWhere() {
        return where;
    }

    public void setWhere(String where) {
        this.where = where;
    }
}
