package com.sims.controller.common;

import com.mysema.query.sql.SQLQuery;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.enums.UserIdentity;
import com.sims.persistence.*;
import com.sims.persistence.sql.cmd.Select;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class CommonController extends AbstractController {

    private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

    /**
     * 登录
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object login(@RequestParam String identity, @RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        Object user;
        if (String.valueOf(UserIdentity.STUDENT.value()).equals(identity)) {
            // 如果是学生
            user = repositories.student.execute(new Select() {
                @Override
                public Student execute(SQLQuery query) {
                    return query.from(QStudent.student)
                            .where(QStudent.student.sno.eq(username).and(QStudent.student.password.eq(password)))
                            .singleResult(QStudent.student);
                }
            });
        } else if (String.valueOf(UserIdentity.TEACHER.value()).equals(identity)) {
            // 如果是教师
            user = repositories.teacher.execute(new Select() {
                @Override
                public Teacher execute(SQLQuery query) {
                    return query.from(QTeacher.teacher)
                            .where(QTeacher.teacher.sno.eq(username).and(QTeacher.teacher.password.eq(password)))
                            .singleResult(QTeacher.teacher);
                }
            });
        } else {
            // 如果是管理员
            user = repositories.manager.execute(new Select() {
                @Override
                public Manager execute(SQLQuery query) {
                    return query.from(QManager.manager)
                            .where(QManager.manager.sno.eq(username).and(QManager.manager.password.eq(password)))
                            .singleResult(QManager.manager);
                }
            });
        }
        if (null != user) {
            request.getSession(true).setAttribute("user", user);
            logger.info("{}[username={}] login", UserIdentity.valueOf(Integer.parseInt(identity)), username);

            return AjaxResponse.createSuccess();
        } else {
            return AjaxResponse.createFailure(null, null);
        }
    }

    /**
     * 退出系统
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public Object logout(HttpSession session) {
        session.removeAttribute("user");
        return AjaxResponse.createSuccess();
    }
}
