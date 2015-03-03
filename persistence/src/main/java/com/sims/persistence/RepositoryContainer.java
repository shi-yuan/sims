package com.sims.persistence;

import com.sims.persistence.repository.ManagerRepository;
import com.sims.persistence.repository.StudentRepository;
import com.sims.persistence.repository.TeacherRepository;
import com.sims.persistence.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RepositoryContainer {

    @Autowired
    public StudentRepository student;

    @Autowired
    public TeacherRepository teacher;

    @Autowired
    public ManagerRepository manager;

    @Autowired
    public TopicRepository topic;
}
