package com.sims.service;

import com.mysema.query.sql.dml.SQLUpdateClause;
import com.sims.persistence.QTopic;
import com.sims.persistence.sql.cmd.Update;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService extends AbstractService {

    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);

    /**
     * 选择毕设题目
     */
    @Transactional
    public void selectTopic(final int studentId, final int topicId) {
        // 取消选择
        repositories.topic.execute(new Update<QTopic>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.setNull(QTopic.topic.studentId).where(QTopic.topic.studentId.eq(studentId)).execute();
            }
        });
        // 重新选择
        repositories.topic.execute(new Update<QTopic>() {
            @Override
            public long execute(SQLUpdateClause query) {
                return query.set(QTopic.topic.studentId, studentId).where(QTopic.topic.id.eq(topicId)).execute();
            }
        });
    }
}
