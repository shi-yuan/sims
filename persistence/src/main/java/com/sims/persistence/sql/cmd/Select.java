package com.sims.persistence.sql.cmd;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.SQLQuery;
import com.sims.persistence.sql.QueryExecutor;

import java.sql.Connection;

public abstract class Select extends QueryExecutor {

    @Override
    public abstract Object execute(SQLQuery query);

    @Override
    public Object execute(Connection conn, Configuration configuration) {
        return execute(new SQLQuery(conn, configuration));
    }
}
