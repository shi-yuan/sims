package com.sims.persistence.sql.cmd;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.RelationalPath;
import com.mysema.query.sql.dml.SQLDeleteClause;
import com.sims.persistence.sql.QueryExecutor;

import java.sql.Connection;

public abstract class Delete<Q extends RelationalPath<?>> extends QueryExecutor {

    public Q Q;

    public Delete() {
        this.Q = createQ();
    }

    @Override
    public abstract long execute(SQLDeleteClause query);

    @Override
    public Long execute(Connection conn, Configuration configuration) {
        return execute(new SQLDeleteClause(conn, configuration, Q));
    }
}
