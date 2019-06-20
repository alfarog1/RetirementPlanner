package com.skilldistillery.arewethereyet.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.skilldistillery.retirementapp.entities.Asset;
@Component
public interface AssetRepository extends JpaRepository<Asset, Integer> {
	
	List<Asset> findByUser_Username(String username);

	Asset findByIdAndUser_Username(int aid, String username);

}
