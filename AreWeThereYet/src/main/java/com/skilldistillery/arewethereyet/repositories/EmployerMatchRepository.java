package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.EmployerMatch;
@Component
public interface EmployerMatchRepository extends JpaRepository<EmployerMatch, Integer> {

}
