package com.sims.persistence;

import javax.annotation.Generated;

/**
 * Topic is a Querydsl bean type
 */
@Generated("com.mysema.query.codegen.BeanSerializer")
public class Topic {

    private Integer id;

    private String name;

    private Integer studentId;

    private Integer teacherId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

}

