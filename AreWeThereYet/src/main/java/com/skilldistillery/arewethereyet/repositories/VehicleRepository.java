package com.skilldistillery.arewethereyet.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.Vehicle;
@Component
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {


}
