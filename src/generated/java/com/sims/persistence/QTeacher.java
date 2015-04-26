package com.sims.persistence;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;

import com.mysema.query.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTeacher is a Querydsl query type for Teacher
 */
@Generated("com.mysema.query.sql.codegen.MetaDataSerializer")
public class QTeacher extends com.mysema.query.sql.RelationalPathBase<Teacher> {

    private static final long serialVersionUID = -1763816242;

    public static final QTeacher teacher = new QTeacher("teacher");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath sno = createString("sno");

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public final com.mysema.query.sql.PrimaryKey<Teacher> primary = createPrimaryKey(id);

    public QTeacher(String variable) {
        super(Teacher.class, forVariable(variable), "null", "teacher");
        addMetadata();
    }

    public QTeacher(String variable, String schema, String table) {
        super(Teacher.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTeacher(Path<? extends Teacher> path) {
        super(path.getType(), path.getMetadata(), "null", "teacher");
        addMetadata();
    }

    public QTeacher(PathMetadata<?> metadata) {
        super(Teacher.class, metadata, "null", "teacher");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(3).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(password, ColumnMetadata.named("password").withIndex(4).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(sno, ColumnMetadata.named("sno").withIndex(2).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(status, ColumnMetadata.named("status").withIndex(5).ofType(Types.INTEGER).withSize(10).notNull());
    }

}

