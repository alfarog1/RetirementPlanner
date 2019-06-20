package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.RiskProfile;

public interface RiskProfileService {
	List<RiskProfile> allRiskProfiles();
	RiskProfile findById(int id);
	RiskProfile create(RiskProfile risk);
	RiskProfile replace(int id , RiskProfile risk);
	Boolean deleteById(int id);

}
