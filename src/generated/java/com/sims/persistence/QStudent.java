package com.sims.persistence;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;

import com.mysema.query.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QStudent is a Querydsl query type for Student
 */
@Generated("com.mysema.query.sql.codegen.MetaDataSerializer")
public class QStudent extends com.mysema.query.sql.RelationalPathBase<Student> {

    private static final long serialVersionUID = 2091582247;

    public static final QStudent student = new QStudent("student");

    public final StringPath address = createString("address");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath profession = createString("profession");

    public final StringPath sno = createString("sno");

    public final StringPath telephone = createString("telephone");

    public final com.mysema.query.sql.PrimaryKey<Student> primary = createPrimaryKey(id);

    public QStudent(String variable) {
        super(Student.class, forVariable(variable), "null", "student");
        addMetadata();
    }

    public QStudent(String variable, String schema, String table) {
        super(Student.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QStudent(Path<? extends Student> path) {
        super(path.getType(), path.getMetadata(), "null", "student");
        addMetadata();
    }

    public QStudent(PathMetadata<?> metadata) {
        super(Student.class, metadata, "null", "student");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(address, ColumnMetadata.named("address").withIndex(8).ofType(Types.VARCHAR).withSize(50).notNull());
        addMetadata(age, ColumnMetadata.named("age").withIndex(4).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(3).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(password, ColumnMetadata.named("password").withIndex(6).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(profession, ColumnMetadata.named("profession").withIndex(5).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(sno, ColumnMetadata.named("sno").withIndex(2).ofType(Types.VARCHAR).withSize(20).notNull());
        addMetadata(telephone, ColumnMetadata.named("telephone").withIndex(7).ofType(Types.VARCHAR).withSize(11).notNull());
    }

}

