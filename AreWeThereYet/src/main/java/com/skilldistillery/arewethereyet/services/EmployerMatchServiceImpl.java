package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.EmployerMatchRepository;
import com.skilldistillery.retirementapp.entities.EmployerMatch;

@Service
public class EmployerMatchServiceImpl implements EmployerMatchService {
	@Autowired
	EmployerMatchRepository repo;

	@Override
	public List<EmployerMatch> allMatches() {
		return repo.findAll();
	}

	@Override
	public EmployerMatch findById(int id) {
		EmployerMatch match;
		Optional<EmployerMatch> op = repo.findById(id);
		if (op.isPresent()) {
			match = op.get();
			return match;
		} else {
			return null;	
		}
	}

	@Override
	public EmployerMatch create(EmployerMatch match) {
		if (match != null) {
			repo.save(match);
			repo.flush();
			return match;
		} else {
			return null;
		}
	}

	@Override
	public EmployerMatch replace(int id, EmployerMatch match) {
		Optional<EmployerMatch> op = repo.findById(id);
		if (op.isPresent()) {
			match.setId(op.get().getId());
					
		}
		repo.saveAndFlush(match);
		return match;
	}

	@Override
	public Boolean deleteById(int id) {
		Optional<EmployerMatch> op = repo.findById(id);
		if (op.isPresent()) {
			repo.deleteById(id);
			return true;
		}else {
			return false;
		}
	}
}
