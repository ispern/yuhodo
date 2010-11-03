package org.yuhodo.cool.util.direct.json;

import java.util.List;

import org.yuhodo.cool.util.direct.ExtDirectDTO;



public class ExtDirectJsonRequest extends ExtDirectDTO {
    private static final long serialVersionUID = 3033899042357548920L;
    private List<Object> data;

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

}
