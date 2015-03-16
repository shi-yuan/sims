package com.sims.persistence.sql.cmd;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.RelationalPath;
import com.mysema.query.sql.dml.SQLMergeClause;
import com.sims.persistence.sql.QueryExecutor;

import java.sql.Connection;

public abstract class Merge<Q extends RelationalPath<?>> extends QueryExecutor {

    public Q Q;

    public Merge() {
        this.Q = createQ();
    }

    @Override
    public abstract long execute(SQLMergeClause query);

    @Override
    public Long execute(Connection conn, Configuration configuration) {
        return execute(new SQLMergeClause(conn, configuration, Q));
    }
}
