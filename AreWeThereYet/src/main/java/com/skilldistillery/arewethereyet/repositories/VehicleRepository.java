package com.skilldistillery.arewethereyet.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {


}
