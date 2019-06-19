package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

}
