package com.sims.persistence;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;

import com.mysema.query.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QManager is a Querydsl query type for Manager
 */
@Generated("com.mysema.query.sql.codegen.MetaDataSerializer")
public class QManager extends com.mysema.query.sql.RelationalPathBase<Manager> {

    private static final long serialVersionUID = 511021209;

    public static final QManager manager = new QManager("manager");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath sno = createString("sno");

    public final com.mysema.query.sql.PrimaryKey<Manager> primary = createPrimaryKey(id);

    public QManager(String variable) {
        super(Manager.class, forVariable(variable), "null", "manager");
        addMetadata();
    }

    public QManager(String variable, String schema, String table) {
        super(Manager.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QManager(Path<? extends Manager> path) {
        super(path.getType(), path.getMetadata(), "null", "manager");
        addMetadata();
    }

    public QManager(PathMetadata<?> metadata) {
        super(Manager.class, metadata, "null", "manager");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(3).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(password, ColumnMetadata.named("password").withIndex(4).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(sno, ColumnMetadata.named("sno").withIndex(2).ofType(Types.VARCHAR).withSize(20).notNull());
    }

}

