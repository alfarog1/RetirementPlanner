package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.Vehicle;


public interface VehicleService {
	
	public List<Vehicle> index();

	public Vehicle show(int vid);

	public Vehicle update(int vid, Vehicle vehicle);


}
