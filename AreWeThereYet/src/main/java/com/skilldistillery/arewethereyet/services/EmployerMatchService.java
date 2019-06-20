package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.EmployerMatch;

public interface EmployerMatchService {
	List<EmployerMatch> allMatches();
	EmployerMatch findById(int id);
	EmployerMatch create(EmployerMatch match);
	EmployerMatch replace(int id , EmployerMatch match);
	Boolean deleteById(int id);

}
