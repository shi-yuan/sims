package com.sims.controller;

import com.sims.persistence.RepositoryContainer;
import com.sims.service.ServiceContainer;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractController {
    @Autowired
    protected ServiceContainer services;

    @Autowired
    protected RepositoryContainer repositories;
}
