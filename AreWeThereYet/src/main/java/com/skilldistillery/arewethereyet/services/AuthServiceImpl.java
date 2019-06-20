package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.UserRepository;
import com.skilldistillery.retirementapp.entities.User;
@Service
public class AuthServiceImpl implements AuthService{
	@Autowired
	private UserRepository repo;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		user.setRole("standard");
		repo.saveAndFlush(user);
		return user;
	}

}
