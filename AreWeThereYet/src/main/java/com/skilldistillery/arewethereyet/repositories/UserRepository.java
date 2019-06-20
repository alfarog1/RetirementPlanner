package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.User;
@Component
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);
}
