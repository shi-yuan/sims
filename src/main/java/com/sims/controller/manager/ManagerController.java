package com.sims.controller.manager;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.mysema.query.Tuple;
import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.mysema.query.sql.dml.SQLUpdateClause;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.enums.TeacherStatus;
import com.sims.persistence.*;
import com.sims.persistence.sql.cmd.Insert;
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

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;

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
        return "templates/main/manager/student_update";
    }

    /**
     * 获取学生信息
     */
    @RequestMapping(value = "/student/show", method = RequestMethod.GET)
    @ResponseBody
    public Object studentShow(@RequestParam final String sno) {
        ModelMap map = new ModelMap();
        map.put("student", repositories.student.execute(new Select() {
            @Override
            public Object execute(SQLQuery query) {
                return query.from(QStudent.student).where(QStudent.student.sno.eq(sno)).singleResult(QStudent.student);
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 新增学生信息
     */
    @RequestMapping(value = "/student/create", method = RequestMethod.POST)
    @ResponseBody
    public Object createStudent(final Student student) {
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

    /**
     * 编辑学生信息
     */
    @RequestMapping(value = "/student/update", method = RequestMethod.PUT)
    @ResponseBody
    public Object updateStudent(final Student student) {
        repositories.student.execute(new Update<QStudent>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.where(QStudent.student.sno.eq(student.getSno()))
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

    /**
     * 获取教师列表
     */
    @RequestMapping(value = "/teacher/list", method = RequestMethod.GET)
    @ResponseBody
    public Object teacherList() {
        ModelMap map = new ModelMap();
        map.put("teachers", repositories.teacher.execute(new Select() {
            @Override
            public Object execute(SQLQuery query) {
                return query.from(QTeacher.teacher).where(QTeacher.teacher.status.eq(TeacherStatus.NORMAL.value())).list(QTeacher.teacher);
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 教师信息页面
     */
    @RequestMapping(value = "/teacher/view", method = RequestMethod.GET)
    public String teacherView() {
        return "templates/main/manager/teacher_update";
    }

    /**
     * 获取教师信息
     */
    @RequestMapping(value = "/teacher/show", method = RequestMethod.GET)
    @ResponseBody
    public Object teacherShow(@RequestParam final String sno) {
        ModelMap map = new ModelMap();
        map.put("teacher", repositories.teacher.execute(new Select() {
            @Override
            public Object execute(SQLQuery query) {
                return query.from(QTeacher.teacher).where(QTeacher.teacher.sno.eq(sno)).singleResult(QTeacher.teacher);
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 新增教师信息
     */
    @RequestMapping(value = "/teacher/create", method = RequestMethod.POST)
    @ResponseBody
    public Object createTeacher(final Teacher teacher) {
        repositories.teacher.execute(new Insert<QTeacher>() {
            @Override
            public long execute(SQLInsertClause query) {
                return query
                        .set(QTeacher.teacher.sno, teacher.getSno())
                        .set(QTeacher.teacher.name, teacher.getName())
                        .set(QTeacher.teacher.password, teacher.getPassword())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }

    /**
     * 编辑教师信息
     */
    @RequestMapping(value = "/teacher/update", method = RequestMethod.PUT)
    @ResponseBody
    public Object updateTeacher(final Teacher teacher) {
        repositories.teacher.execute(new Update<QTeacher>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.where(QTeacher.teacher.sno.eq(teacher.getSno()))
                        .set(QTeacher.teacher.name, teacher.getName())
                        .set(QTeacher.teacher.password, teacher.getPassword())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }

    /**
     * 删除教师
     */
    @RequestMapping(value = "/teacher/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteTeacher(final Teacher teacher) {
        repositories.teacher.execute(new Update<QTeacher>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.where(QTeacher.teacher.sno.eq(teacher.getSno()))
                        .set(QTeacher.teacher.status, TeacherStatus.DELETED.value())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }

    /**
     * 获取毕设题目列表
     */
    @RequestMapping(value = "/topic/list", method = RequestMethod.GET)
    @ResponseBody
    public Object topicList() {
        ModelMap map = new ModelMap();
        map.put("topics", repositories.topic.execute(new Select() {
            @Override
            public List<ModelMap> execute(SQLQuery query) {
                List<ModelMap> list = new ArrayList<>();
                List<Tuple> results = query.from(QTopic.topic)
                        .innerJoin(QTeacher.teacher).on(QTopic.topic.teacherId.eq(QTeacher.teacher.id))
                        .leftJoin(QStudent.student).on(QTopic.topic.studentId.eq(QStudent.student.id))
                        .list(QTopic.topic.name, QTopic.topic.describe, QTeacher.teacher.name, QStudent.student.name);
                if (null != results && !results.isEmpty()) {
                    list.addAll(Collections2.transform(results, new Function<Tuple, ModelMap>() {
                        @Nullable
                        @Override
                        public ModelMap apply(Tuple input) {
                            ModelMap m = new ModelMap();
                            m.put("topicName", input.get(QTopic.topic.name));
                            m.put("describe", input.get(QTopic.topic.describe));
                            m.put("teacherName", input.get(QTeacher.teacher.name));
                            m.put("studentName", input.get(QStudent.student.name));
                            return m;
                        }
                    }));
                }
                return list;
            }
        }));
        return AjaxResponse.createSuccess(map);
    }
}
