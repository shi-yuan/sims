package com.sims.persistence;

import javax.annotation.Generated;

/**
 * Teacher is a Querydsl bean type
 */
@Generated("com.mysema.query.codegen.BeanSerializer")
public class Teacher {

    private Integer id;

    private String name;

    private String password;

    private String sno;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

}

