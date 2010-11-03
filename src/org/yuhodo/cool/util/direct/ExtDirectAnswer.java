package org.yuhodo.cool.util.direct;

public class ExtDirectAnswer extends ExtDirectDTO {
    private static final long serialVersionUID = 7829548325207546561L;
    private Object result;

    public ExtDirectAnswer(ExtDirectDTO query, Object result) {
        super(query);
        this.result = result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public Object getResult() {
        return result;
    }
}
