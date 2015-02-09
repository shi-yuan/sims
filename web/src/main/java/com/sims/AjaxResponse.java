package com.sims;

import org.springframework.ui.ModelMap;

public class AjaxResponse extends ModelMap {
    public static AjaxResponse createSuccess(ModelMap... maps) {
        AjaxResponse resp = new AjaxResponse();
        resp.put("success", true);
        resp.put("data", new ModelMap());
        if (null != maps && 0 < maps.length) {
            resp.put("data", maps[0]);
        }
        return resp;
    }

    public static AjaxResponse createFailure(String code, String message) {
        AjaxResponse resp = new AjaxResponse();
        resp.put("success", false);
        resp.put("code", code);
        resp.put("message", message);
        return resp;
    }
}
