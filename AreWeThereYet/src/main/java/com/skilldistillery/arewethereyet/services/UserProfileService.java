package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.UserProfile;

public interface UserProfileService {
	
	public List<UserProfile> getAll();
	public UserProfile findById(Integer id);
	public UserProfile create(UserProfile profile);
	public UserProfile replace(int id, UserProfile profile);
}
