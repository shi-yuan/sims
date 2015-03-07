package com.sims.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServiceContainer {

    @Autowired
    public StudentService student;
}
