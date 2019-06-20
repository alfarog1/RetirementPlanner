package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.RiskProfile;
@Component
public interface RiskProfileRepository extends JpaRepository<RiskProfile, Integer> {

}
