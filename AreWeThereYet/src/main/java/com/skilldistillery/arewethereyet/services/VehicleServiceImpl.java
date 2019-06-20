package com.skilldistillery.arewethereyet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.VehicleRepository;
import com.skilldistillery.retirementapp.entities.Vehicle;

@Service
public class VehicleServiceImpl implements VehicleService {
	@Autowired
	VehicleRepository repo;

	@Override
	public List<Vehicle> index() {
		return repo.findAll();
	}

	@Override
	public Vehicle show(int vId) {
		Optional <Vehicle> v = repo.findById(vId);
		if (v.isPresent()) {
			Vehicle vehicle = v.get();
			return vehicle;
		}
		return null;
	}

	@Override
	public Vehicle update(int vid, Vehicle vehicle) {
		vehicle.setId(vid);
		repo.saveAndFlush(vehicle);
		return vehicle;
	}
}
