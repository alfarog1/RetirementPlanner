package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.RiskProfileRepository;

@Service
public class RiskProfileServiceImpl implements RiskProfileService {
	@Autowired
	RiskProfileRepository repo;
}
