package com.skilldistillery.retirementapp.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Asset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "asset_name")
	private String assetName;
	@Column(name = "is_qualified")
	private Boolean isQualified;
	@Column(name = "is_fixed")
	private Boolean isFixed;
	@Column(name = "max_contribution")
	private  int maxContribution;

}
