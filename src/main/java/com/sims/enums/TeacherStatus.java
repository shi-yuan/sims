package com.sims.enums;

public enum TeacherStatus {
    /**
     * 被删除
     */
    DELETED(0),

    /**
     * 正常
     */
    NORMAL(1);

    private int value;

    private TeacherStatus(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }

    public static TeacherStatus valueOf(int value) {
        return values()[value];
    }
}