package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.UserProfileRepository;

@Service
public class UserProfileServiceImpl implements UserProfileService {
	@Autowired
	UserProfileRepository repo;
	
}
