package com.sims.persistence.sql;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLDeleteClause;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.mysema.query.sql.dml.SQLMergeClause;
import com.mysema.query.sql.dml.SQLUpdateClause;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.sql.Connection;

public abstract class QueryExecutor {

    private static final Logger logger = LoggerFactory.getLogger(QueryExecutor.class);

    public Object execute(SQLQuery query) {
        return null;
    }

    public long execute(SQLInsertClause query) {
        return 0;
    }

    public long execute(SQLUpdateClause query) {
        return 0;
    }

    public long execute(SQLDeleteClause query) {
        return 0;
    }

    public long execute(SQLMergeClause query) {
        return 0;
    }

    public abstract Object execute(Connection conn, Configuration configuration);

    @SuppressWarnings("unchecked")
    protected <T> T createQ() {
        try {
            Class<T> type = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            for (Field field : type.getDeclaredFields()) {
                int modifiers = field.getModifiers();
                if (Modifier.isPublic(modifiers) && Modifier.isStatic(modifiers) && Modifier.isFinal(modifiers) && field.getType().equals(type)) {
                    return (T) field.get(null);
                }
            }
            throw new RuntimeException("不存在对应的Q实例");
        } catch (Exception e) {
            logger.error("创建Q实例出现异常: {}", e);
            throw new RuntimeException(e);
        }
    }
}
