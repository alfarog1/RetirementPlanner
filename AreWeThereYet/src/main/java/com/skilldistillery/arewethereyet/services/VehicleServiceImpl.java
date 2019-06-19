package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {
	@Autowired
	VehicleRepository repo;
}
