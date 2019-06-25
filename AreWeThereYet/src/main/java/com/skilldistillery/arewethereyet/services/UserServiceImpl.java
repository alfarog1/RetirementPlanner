package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.UserRepository;
import com.skilldistillery.retirementapp.entities.User;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository repo;

	@Override
	public List<User> index() {
		
		return repo.findAll();
	}

	@Override
	public User show(String username) {
		User user = repo.findByUsername(username);
		return user;
	}

	@Override
	public User create(User user) {
		User createdUser = repo.saveAndFlush(user);
		return createdUser;
	}

	@Override
	public User update(int uId, User user) {
		user.setId(uId);
		user.getUserProfile().setUser(user);
		return repo.saveAndFlush(user);
	}

	@Override
	public boolean destroy(int uId) {
		User u = null;
		Optional<User> user = repo.findById(uId);
		if(user.isPresent()) {
			u = user.get();
			repo.delete(u);
			return true;
		}
		return false;
	}
}
