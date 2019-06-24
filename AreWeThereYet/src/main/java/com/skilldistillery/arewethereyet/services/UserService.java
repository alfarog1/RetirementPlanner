package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.User;


public interface UserService {

	public List<User> index();

	public User show(String username);

	public User create(User user);

	public User update(int uId, User user);

	public boolean destroy(int uId);

}
