package com.sims.service;

import com.sims.persistence.RepositoryContainer;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractService {

    @Autowired
    protected RepositoryContainer repositories;
}
