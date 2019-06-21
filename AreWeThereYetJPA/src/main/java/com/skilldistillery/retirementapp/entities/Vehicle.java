package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
@Entity
public class Vehicle {
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
	private Integer maxContribution;
	
	@Column(name = "is_pretax")
	private Boolean isPretax;
	
	@Column(name = "has_employer_match")
	private Boolean hasEmployerMatch;
	
	@OneToMany(mappedBy="vehicle")
	private List<Asset> assets;
	
//	@OneToMany(mappedBy="vehicle")
//	private List<RiskProfile> riskProfiles;

	public Vehicle() {
		super();
	}

	public Vehicle(int id, String assetName, Boolean isQualified, Boolean isFixed, int maxContribution,
			Boolean isPretax, Boolean hasEmployerMatch, List<Asset> assets) {
		super();
		this.id = id;
		this.assetName = assetName;
		this.isQualified = isQualified;
		this.isFixed = isFixed;
		this.maxContribution = maxContribution;
		this.isPretax = isPretax;
		this.hasEmployerMatch = hasEmployerMatch;
		this.assets = assets;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public Boolean getIsQualified() {
		return isQualified;
	}

	public void setIsQualified(Boolean isQualified) {
		this.isQualified = isQualified;
	}

	public Boolean getIsFixed() {
		return isFixed;
	}

	public void setIsFixed(Boolean isFixed) {
		this.isFixed = isFixed;
	}


	public int getMaxContribution() {
		return maxContribution;
	}

	public void setMaxContribution(Integer maxContribution) {
		this.maxContribution = maxContribution;
	}

	public Boolean getIsPretax() {
		return isPretax;
	}

	public void setIsPretax(Boolean isPretax) {
		this.isPretax = isPretax;
	}

	public Boolean getHasEmployerMatch() {
		return hasEmployerMatch;
	}

	public void setHasEmployerMatch(Boolean hasEmployerMatch) {
		this.hasEmployerMatch = hasEmployerMatch;
	}

	public List<Asset> getAssets() {
		return assets;
	}

	public void setAssets(List<Asset> assets) {
		this.assets = assets;
	}



	@Override
	public String toString() {
		return "Vehicle [id=" + id + ", assetName=" + assetName + ", isQualified=" + isQualified + ", isFixed="
				+ isFixed + ", maxContribution=" + maxContribution + ", isPretax=" + isPretax + ", hasEmployerMatch="
				+ hasEmployerMatch + "]";
	}
}
