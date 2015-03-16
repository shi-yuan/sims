package com.sims.persistence.sql;

import com.mysema.query.sql.Configuration;
import com.mysema.query.sql.MySQLTemplates;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcAccessor;

import javax.sql.DataSource;
import java.sql.Connection;

public class QueryTemplate extends JdbcAccessor {

    private Configuration configuration;

    public QueryTemplate(DataSource dataSource) {
        this.configuration = new Configuration(new MySQLTemplates());
        setDataSource(dataSource);
        afterPropertiesSet();
    }

    public Object execute(QueryExecutor cmd) throws RuntimeException {
        Connection connection = DataSourceUtils.getConnection(getDataSource());
        try {
            return cmd.execute(connection, configuration);
        } catch (Exception ex) {
            connection = null;
            throw ex;
        } finally {
            DataSourceUtils.releaseConnection(connection, getDataSource());
        }
    }
}
