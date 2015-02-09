package com.sims.persistence.sql.cmd;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.RelationalPath;
import com.mysema.query.sql.dml.SQLInsertClause;
import com.sims.persistence.sql.QueryExecutor;

import java.sql.Connection;


public abstract class Insert<Q extends RelationalPath<?>> extends QueryExecutor {

    public Q Q;

    public Insert() {
        this.Q = createQ();
    }

    @Override
    public abstract long execute(SQLInsertClause query);

    @Override
    public Long execute(Connection conn, Configuration configuration) {
        return execute(new SQLInsertClause(conn, configuration, Q));
    }
}
