package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.EmployerMatch;

public interface EmployerMatchRepository extends JpaRepository<EmployerMatch, Integer> {

}
