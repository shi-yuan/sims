package com.sims.controller.teacher;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.mysema.query.Tuple;
import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.mysema.query.sql.dml.SQLUpdateClause;
import com.sims.AjaxResponse;
import com.sims.controller.AbstractController;
import com.sims.persistence.QStudent;
import com.sims.persistence.QTopic;
import com.sims.persistence.Teacher;
import com.sims.persistence.Topic;
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
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/teacher")
public class TeacherController extends AbstractController {

    private static final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    /**
     * 获取毕设题目列表
     */
    @RequestMapping(value = "/topic/list", method = RequestMethod.GET)
    @ResponseBody
    public Object topicList(HttpServletRequest request) {
        final Teacher teacher = (Teacher) request.getSession().getAttribute("user");
        ModelMap map = new ModelMap();
        map.put("topics", repositories.topic.execute(new Select() {
            @Override
            public List<ModelMap> execute(SQLQuery query) {
                List<ModelMap> list = new ArrayList<>();
                List<Tuple> results = query.from(QTopic.topic).leftJoin(QStudent.student)
                        .on(QTopic.topic.studentId.eq(QStudent.student.id))
                        .where(QTopic.topic.teacherId.eq(teacher.getId()))
                        .list(QTopic.topic.id, QTopic.topic.name, QStudent.student.name);
                if (null != results && !results.isEmpty()) {
                    list.addAll(Collections2.transform(results, new Function<Tuple, ModelMap>() {
                        @Nullable
                        @Override
                        public ModelMap apply(Tuple input) {
                            ModelMap m = new ModelMap();
                            m.put("id", input.get(QTopic.topic.id));
                            m.put("topicName", input.get(QTopic.topic.name));
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

    /**
     * 毕设题目信息页面
     */
    @RequestMapping(value = "/topic/view", method = RequestMethod.GET)
    public String topicView() {
        return "templates/main/teacher/topic_update";
    }

    /**
     * 获取毕设题目
     */
    @RequestMapping(value = "/topic/show", method = RequestMethod.GET)
    @ResponseBody
    public Object topicShow(@RequestParam final Integer id) {
        ModelMap map = new ModelMap();
        map.put("topic", repositories.topic.execute(new Select() {
            @Override
            public Object execute(SQLQuery query) {
                return query.from(QTopic.topic).where(QTopic.topic.id.eq(id)).singleResult(QTopic.topic);
            }
        }));
        return AjaxResponse.createSuccess(map);
    }

    /**
     * 新增毕设题目
     */
    @RequestMapping(value = "/topic/create", method = RequestMethod.POST)
    @ResponseBody
    public Object createTopic(final Topic topic, HttpServletRequest request) {
        final Teacher teacher = (Teacher) request.getSession().getAttribute("user");
        repositories.topic.execute(new Insert<QTopic>() {
            @Override
            public long execute(SQLInsertClause query) {
                return query
                        .set(QTopic.topic.name, topic.getName())
                        .set(QTopic.topic.teacherId, teacher.getId())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }

    /**
     * 编辑毕设题目
     */
    @RequestMapping(value = "/topic/update", method = RequestMethod.PUT)
    @ResponseBody
    public Object updateTopic(final Topic topic) {
        repositories.topic.execute(new Update<QTopic>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.where(QTopic.topic.id.eq(topic.getId()))
                        .set(QTopic.topic.name, topic.getName())
                        .execute();
            }
        });
        return AjaxResponse.createSuccess();
    }
}
