package com.skilldistillery.arewethereyet.services;

import java.util.List;

import com.skilldistillery.retirementapp.entities.Asset;

public interface AssetService {
	
	public List<Asset> index(String username);

	public Asset show(String username, int aid);

	public Asset create(String username, Asset asset);

	public Asset update(String username, int aid, Asset asset);

	public boolean destroy(String username, int aid);
	
	public List<Asset> getAllAssets();

}
