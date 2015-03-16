package com.sims.controller.student;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.mysema.query.Tuple;
import com.mysema.query.sql.SQLQuery;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.persistence.QTeacher;
import com.sims.persistence.QTopic;
import com.sims.persistence.Student;
import com.sims.persistence.sql.cmd.Select;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/student")
public class StudentController extends AbstractController {

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    /**
     * 获取毕设题目列表
     */
    @RequestMapping(value = "/topic/list", method = RequestMethod.GET)
    @ResponseBody
    public Object topicList(HttpServletRequest request) {
        final Student student = (Student) request.getSession().getAttribute("user");
        ModelMap map = new ModelMap();
        // 我的毕设题目信息
        map.put("myTopic", repositories.topic.execute(new Select() {
            @Override
            public ModelMap execute(SQLQuery query) {
                ModelMap m = null;
                Tuple result = query.from(QTopic.topic, QTeacher.teacher)
                        .where(QTopic.topic.teacherId.eq(QTeacher.teacher.id))
                        .where(QTopic.topic.studentId.eq(student.getId()))
                        .singleResult(QTopic.topic.name, QTeacher.teacher.name);
                if (null != result) {
                    m = new ModelMap();
                    m.put("topicName", result.get(QTopic.topic.name));
                    m.put("teacherName", result.get(QTeacher.teacher.name));
                }
                return m;
            }
        }));
        // 毕设题目列表
        map.put("topics", repositories.topic.execute(new Select() {
            @Override
            public List<ModelMap> execute(SQLQuery query) {
                List<ModelMap> list = new ArrayList<>();
                List<Tuple> results = query.from(QTopic.topic, QTeacher.teacher)
                        .where(QTopic.topic.teacherId.eq(QTeacher.teacher.id))
                        .where(QTopic.topic.studentId.isNull())
                        .list(QTopic.topic.id, QTopic.topic.name, QTeacher.teacher.name);
                if (null != results && !results.isEmpty()) {
                    list.addAll(Collections2.transform(results, new Function<Tuple, ModelMap>() {
                        @Nullable
                        @Override
                        public ModelMap apply(Tuple input) {
                            ModelMap m = new ModelMap();
                            m.put("topicId", input.get(QTopic.topic.id));
                            m.put("topicName", input.get(QTopic.topic.name));
                            m.put("teacherName", input.get(QTeacher.teacher.name));
                            return m;
                        }
                    }));
                }
                return list;
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 选题
     */
    @RequestMapping(value = "/topic/select", method = RequestMethod.PUT)
    @ResponseBody
    public Object selectTopic(@RequestParam final int topicId, HttpServletRequest request) {
        Student student = (Student) request.getSession().getAttribute("user");
        Integer result = repositories.topic.execute(new Select() {
            @Override
            public Integer execute(SQLQuery query) {
                return query.from(QTopic.topic).where(QTopic.topic.id.eq(topicId)).uniqueResult(QTopic.topic.studentId);
            }
        });
        // 问题是否被选择
        if (null == result) {
            // 未被选择就选择
            services.student.selectTopic(student.getId(), topicId);
            return AjaxResponse.createSuccess();
        } else {
            // 已选择
            return AjaxResponse.createFailure("503", "该毕设题目已被选择");
        }
    }
}
