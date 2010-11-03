package org.yuhodo.cool.util.direct;

public class ExtDirectException extends RuntimeException {
    private static final long serialVersionUID = 8637792414966662920L;
    private String message;
    private String where;

    public ExtDirectException(final Throwable throwable) {
        super(throwable);
    }
    public ExtDirectException(final String message, final Throwable throwable) {
        this(message, throwable.toString());
    }

    private ExtDirectException(final String message, final String where) {
        super(message);
        this.message = message;
        this.where = where;
    }

    public ExtDirectException(final String message) {
        super(message);
        this.message = message;
    }

    public String getDebugMessage() {
        return message;
    }

    public String getWhere() {
        return where;
    }
}
