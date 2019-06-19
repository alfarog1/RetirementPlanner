package com.skilldistillery.arewethereyet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.retirementapp.entities.Asset;

public interface AssetRepository extends JpaRepository<Asset, Integer> {

}
