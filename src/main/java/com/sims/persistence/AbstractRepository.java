package com.sims.persistence;

import com.sims.persistence.sql.QueryTemplate;
import com.sims.persistence.sql.cmd.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;

public class AbstractRepository {

    @Autowired
    private DataSource dataSource;

    protected QueryTemplate getTemplate() {
        return new QueryTemplate(dataSource);
    }

    @SuppressWarnings("unchecked")
    public <T> T execute(Select select) {
        return (T) getTemplate().execute(select);
    }

    @SuppressWarnings("unchecked")
    public long execute(Insert insert) {
        return (Long) getTemplate().execute(insert);
    }

    @SuppressWarnings("unchecked")
    public long execute(Delete delete) {
        return (Long) getTemplate().execute(delete);
    }

    @SuppressWarnings("unchecked")
    public long execute(Merge merge) {
        return (Long) getTemplate().execute(merge);
    }

    @SuppressWarnings("unchecked")
    public long execute(Update update) {
        return (Long) getTemplate().execute(update);
    }
}
