package com.sims.persistence.sql;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.SQLQuery;
import com.mysema.query.sql.dml.SQLDeleteClause;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.mysema.query.sql.dml.SQLMergeClause;
import com.mysema.query.sql.dml.SQLUpdateClause;
import org.springframework.beans.BeanUtils;
import org.springframework.util.ClassUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.sql.Connection;

public abstract class QueryExecutor {
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
        Class<T> type = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        Constructor<?> con = ClassUtils.getConstructorIfAvailable(type, String.class);
        return (T) BeanUtils.instantiateClass(con, "null");
    }
}
