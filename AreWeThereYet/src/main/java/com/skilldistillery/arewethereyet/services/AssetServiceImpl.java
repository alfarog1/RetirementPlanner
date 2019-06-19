package com.skilldistillery.arewethereyet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.arewethereyet.repositories.AssetRepository;

@Service
public class AssetServiceImpl implements AssetService {
	@Autowired
	AssetRepository repo;

}
