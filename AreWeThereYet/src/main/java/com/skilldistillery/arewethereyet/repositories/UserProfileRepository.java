package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.UserProfile;
@Component
public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
	
	UserProfile getByUser_Username(String username);

}
