package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.RiskProfile;

public interface RiskProfileRepository extends JpaRepository<RiskProfile, Integer> {

}
