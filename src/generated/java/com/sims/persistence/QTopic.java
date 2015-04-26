package com.sims.persistence;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;

import com.mysema.query.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTopic is a Querydsl query type for Topic
 */
@Generated("com.mysema.query.sql.codegen.MetaDataSerializer")
public class QTopic extends com.mysema.query.sql.RelationalPathBase<Topic> {

    private static final long serialVersionUID = -1878615781;

    public static final QTopic topic = new QTopic("topic");

    public final StringPath describe = createString("describe");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> studentId = createNumber("studentId", Integer.class);

    public final NumberPath<Integer> teacherId = createNumber("teacherId", Integer.class);

    public final com.mysema.query.sql.PrimaryKey<Topic> primary = createPrimaryKey(id);

    public QTopic(String variable) {
        super(Topic.class, forVariable(variable), "null", "topic");
        addMetadata();
    }

    public QTopic(String variable, String schema, String table) {
        super(Topic.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTopic(Path<? extends Topic> path) {
        super(path.getType(), path.getMetadata(), "null", "topic");
        addMetadata();
    }

    public QTopic(PathMetadata<?> metadata) {
        super(Topic.class, metadata, "null", "topic");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(describe, ColumnMetadata.named("describe").withIndex(5).ofType(Types.VARCHAR).withSize(500));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(studentId, ColumnMetadata.named("student_id").withIndex(4).ofType(Types.INTEGER).withSize(10));
        addMetadata(teacherId, ColumnMetadata.named("teacher_id").withIndex(3).ofType(Types.INTEGER).withSize(10).notNull());
    }

}

