package com.sims.enums;

public enum UserIdentity {
    /**
     * 学生
     */
    STUDENT(0),

    /**
     * 教师
     */
    TEACHER(1),

    /**
     * 管理员
     */
    MANAGER(1);

    private int value;

    private UserIdentity(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }

    public static UserIdentity valueOf(int value) {
        return values()[value];
    }
}