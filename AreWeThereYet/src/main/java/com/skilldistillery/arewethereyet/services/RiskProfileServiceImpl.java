package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.RiskProfileRepository;
import com.skilldistillery.retirementapp.entities.RiskProfile;

@Service
public class RiskProfileServiceImpl implements RiskProfileService {
	@Autowired
	RiskProfileRepository repo;

	@Override
	public List<RiskProfile> allRiskProfiles() {
		return repo.findAll();
	}

	@Override
	public RiskProfile findById(int id) {
		RiskProfile risk;
		Optional<RiskProfile> op = repo.findById(id);
		if(op.isPresent()) {
			risk = op.get();
		}else {
			risk = null;
		}
		return risk;
	}

	@Override
	public RiskProfile create(RiskProfile risk) {
		RiskProfile newRisk;
		if (risk != null) {
			newRisk = repo.saveAndFlush(risk);
		}else {
			newRisk = null;
		}
		return newRisk;
	}

	@Override
	public RiskProfile replace(int id, RiskProfile risk) {
		Optional<RiskProfile> op = repo.findById(id);
		if (op.isPresent()) {
			risk.setId(op.get().getId());
		
			repo.saveAndFlush(risk);
		}
		return risk;
	}

	@Override
	public Boolean deleteById(int id) {
		Optional<RiskProfile> op = repo.findById(id);
		if(op.isPresent()) {
			repo.deleteById(id);
			return true;
		}else {
		return false;
		}
	}
}
