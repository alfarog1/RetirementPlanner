package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.UserProfileRepository;
import com.skilldistillery.arewethereyet.repositories.UserRepository;
import com.skilldistillery.retirementapp.entities.UserProfile;

@Service
public class UserProfileServiceImpl implements UserProfileService {
	@Autowired
	UserProfileRepository repo;
	
	@Autowired
	UserRepository userRepo;

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
		UserProfile managed = null;
		if (op.isPresent()) {
			managed = op.get();
			managed.setfName(profile.getfName());		
			managed.setlName(profile.getlName());
			managed.setDob(profile.getDob());
			managed.setRetirementAge(profile.getRetirementAge());
			managed.setPercentIncome(profile.getPercentIncome());
			managed.setIncome(profile.getIncome());
			managed.setPayPeriod(profile.getPayPeriod());
		}

		repo.saveAndFlush(managed);
		return managed;
	}

	@Override
	public UserProfile getByUser_Username(String username) {
		UserProfile profile = repo.getByUser_Username(username);
		return profile;
	}
	
}
