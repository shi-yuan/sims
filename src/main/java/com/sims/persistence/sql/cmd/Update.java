package com.sims.persistence.sql.cmd;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.RelationalPath;
import com.mysema.query.sql.dml.SQLUpdateClause;
import com.sims.persistence.sql.QueryExecutor;

import java.sql.Connection;

public abstract class Update<Q extends RelationalPath<?>> extends QueryExecutor {

    public Q Q;

    public Update() {
        this.Q = createQ();
    }

    @Override
    public abstract long execute(SQLUpdateClause query);

    @Override
    public Long execute(Connection conn, Configuration configuration) {
        return execute(new SQLUpdateClause(conn, configuration, Q));
    }
}
