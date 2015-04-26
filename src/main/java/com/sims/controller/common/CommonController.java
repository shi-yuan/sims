package com.sims.controller.common;

import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLUpdateClause;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.enums.TeacherStatus;
import com.sims.enums.UserIdentity;
import com.sims.persistence.*;
import com.sims.persistence.sql.cmd.Select;
import com.sims.persistence.sql.cmd.Update;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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
    public Object login(@RequestParam String identity, @RequestParam final String username, @RequestParam final String password, HttpServletRequest request) {
        Object user, userId = null;
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
            if (null != user) {
                userId = ((Student) user).getId();
            }
        } else if (String.valueOf(UserIdentity.TEACHER.value()).equals(identity)) {
            // 如果是教师
            user = repositories.teacher.execute(new Select() {
                @Override
                public Teacher execute(SQLQuery query) {
                    return query.from(QTeacher.teacher)
                            .where(QTeacher.teacher.sno.eq(username).and(QTeacher.teacher.password.eq(password)).and(QTeacher.teacher.status.eq(TeacherStatus.NORMAL.value())))
                            .singleResult(QTeacher.teacher);
                }
            });
            if (null != user) {
                userId = ((Teacher) user).getId();
            }
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
            if (null != user) {
                userId = ((Manager) user).getId();
            }
        }
        if (null != user) {
            request.getSession(true).setAttribute("user", user);
            logger.info("{}[username={}] login", UserIdentity.valueOf(Integer.parseInt(identity)), username);

            ModelMap map = new ModelMap();
            map.put("userId", userId);
            return AjaxResponse.createSuccess(map);
        } else {
            return AjaxResponse.createFailure("502", "用户名/密码错误");
        }
    }

    /**
     * 修改密码
     */
    @RequestMapping(value = "/password/update", method = RequestMethod.PUT)
    @ResponseBody
    public Object updatePassword(@RequestParam String identity, @RequestParam final int userId, @RequestParam final String newPassword) {
        if (String.valueOf(UserIdentity.STUDENT.value()).equals(identity)) {
            // 如果是学生
            repositories.student.execute(new Update<QStudent>() {
                @Override
                public long execute(SQLUpdateClause query) {
                    return query.set(QStudent.student.password, newPassword).where(QStudent.student.id.eq(userId)).execute();
                }
            });
        } else if (String.valueOf(UserIdentity.TEACHER.value()).equals(identity)) {
            // 如果是教师
            repositories.teacher.execute(new Update<QTeacher>() {
                @Override
                public long execute(SQLUpdateClause query) {
                    return query.set(QTeacher.teacher.password, newPassword).where(QTeacher.teacher.id.eq(userId)).execute();
                }
            });
        } else {
            // 如果是管理员
            repositories.manager.execute(new Update<QManager>() {
                @Override
                public long execute(SQLUpdateClause query) {
                    return query.set(QManager.manager.password, newPassword).where(QManager.manager.id.eq(userId)).execute();
                }
            });
        }
        return AjaxResponse.createSuccess();
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
