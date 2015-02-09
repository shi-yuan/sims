package com.sims.controller.manager;

import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.persistence.QStudent;
import com.sims.persistence.Student;
import com.sims.persistence.sql.cmd.Insert;
import com.sims.persistence.sql.cmd.Select;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/manager")
public class ManagerController extends AbstractController {

    private static final Logger logger = LoggerFactory.getLogger(ManagerController.class);

    /**
     * 获取学生列表
     */
    @RequestMapping(value = "/student/list", method = RequestMethod.GET)
    @ResponseBody
    public Object studentList() {
        ModelMap map = new ModelMap();
        map.put("students", repositories.student.execute(new Select() {
            @Override
            public Object execute(SQLQuery query) {
                return query.from(QStudent.student).list(QStudent.student);
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 学生信息页面
     */
    @RequestMapping(value = "/student/view", method = RequestMethod.GET)
    public String studentView() {
        return "templates/main/manager/student_create";
    }

    /**
     * 新增学生列表
     */
    @RequestMapping(value = "/student/create", method = RequestMethod.POST)
    @ResponseBody
    public Object createStudent(Student student) {
        repositories.student.execute(new Insert<QStudent>() {
            @Override
            public long execute(SQLInsertClause query) {
                return query
                        .set(QStudent.student.sno, student.getSno())
                        .set(QStudent.student.name, student.getName())
                        .set(QStudent.student.profession, student.getProfession())
                        .set(QStudent.student.password, student.getPassword())
                        .set(QStudent.student.age, student.getAge())
                        .set(QStudent.student.telephone, student.getTelephone())
                        .set(QStudent.student.address, student.getAddress())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }
}
