package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.UserProfileRepository;
import com.skilldistillery.retirementapp.entities.UserProfile;

@Service
public class UserProfileServiceImpl implements UserProfileService {
	@Autowired
	UserProfileRepository repo;

	@Override
	public List<UserProfile> getAll() {
		return repo.findAll();
	}

	@Override
	public UserProfile findById(Integer id) {
		UserProfile profile;
		Optional<UserProfile> op = repo.findById(id);
		if(op.isPresent()) {
			profile = op.get();
		}else {
			profile = null;
		}
		return profile;
	}
	@Override
	public UserProfile create(UserProfile profile) {
		if (profile != null) {
			repo.saveAndFlush(profile);
			return profile;
		} else {
			return null;
		}
	}

	@Override
	public UserProfile replace(int id, UserProfile profile) {
		Optional<UserProfile> op = repo.findById(id);
		if (op.isPresent()) {
			profile.setId(op.get().getId());
					
		}
		repo.saveAndFlush(profile);
		return profile;
	}

	@Override
	public UserProfile getByUser_Username(String username) {
		UserProfile profile = repo.getByUser_Username(username);
		return profile;
	}
	
}
