package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.EmployerMatchRepository;

@Service
public class EmployerMatchServiceImpl implements EmployerMatchService {
	@Autowired
	EmployerMatchRepository repo;
}
