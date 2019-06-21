package com.skilldistillery.arewethereyet.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.AssetRepository;
import com.skilldistillery.arewethereyet.repositories.UserRepository;
import com.skilldistillery.retirementapp.entities.Asset;
import com.skilldistillery.retirementapp.entities.User;

@Service
public class AssetServiceImpl implements AssetService {
	@Autowired
	private AssetRepository repo;
	
	@Autowired
	private UserRepository uRepo;

	@Override
	public List<Asset> index(String username) {
		return repo.findByUser_Username(username);
	}

	@Override
	public Asset show(String username, int aid) {
		return repo.findByIdAndUser_Username(aid, username);
	}

	@Override
	public Asset create(String username, Asset asset) {
		User u = uRepo.findByUsername(username);
		if (u == null) {
			return null;
		}
		asset.setUser(u);
		return repo.saveAndFlush(asset);
	}

	@Override
	public Asset update(String username, int aid, Asset asset) {
		Asset assetToModify = repo.findByIdAndUser_Username(aid, username);
		if (assetToModify == null) {
			return null;
		}
		assetToModify.setAmount(asset.getAmount());
		assetToModify.setContributionFixed(asset.getContributionFixed());
		assetToModify.setContributionPercent(asset.getContributionPercent());
	
		return repo.saveAndFlush(assetToModify);
	}

	@Override
	public boolean destroy(String username, int aid) {
		Asset assetToDelete = repo.findByIdAndUser_Username(aid, username);
		if (assetToDelete == null) {
			return false;
		}
		repo.delete(assetToDelete);
		return true;
	}

	@Override
	public List<Asset> getAllAssets() {
		return repo.findAll();
	}

}
