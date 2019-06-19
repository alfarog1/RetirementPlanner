package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
