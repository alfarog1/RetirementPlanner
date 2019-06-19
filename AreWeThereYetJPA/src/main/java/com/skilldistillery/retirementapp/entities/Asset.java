package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

public class Asset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Double amount;
	@Column(name = "contribution_fixed")
	private Double contributionFixed;
	@Column(name = "contribution_percent")
	private int contributionPercent;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "asset_id")
	private Vehicle vehicle;
	@OneToMany
	private List<EmployerMatch> ems;
	@ManyToOne
	@JoinColumn(name = "risk_profile_id")
	private RiskProfile riskProfile;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getContributionFixed() {
		return contributionFixed;
	}

	public void setContributionFixed(Double contributionFixed) {
		this.contributionFixed = contributionFixed;
	}

	public int getContributionPercent() {
		return contributionPercent;
	}

	public void setContributionPercent(int contributionPercent) {
		this.contributionPercent = contributionPercent;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Vehicle getAsset() {
		return vehicle;
	}

	public void setAsset(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public List<EmployerMatch> getEms() {
		return ems;
	}

	public void setEms(List<EmployerMatch> ems) {
		this.ems = ems;
	}

	public RiskProfile getRiskProfile() {
		return riskProfile;
	}

	public void setRiskProfile(RiskProfile riskProfile) {
		this.riskProfile = riskProfile;
	}

	public Asset() {
		super();
	}

	public Asset(int id, Double amount, Double contributionFixed, int contributionPercent, User user, Vehicle vehicle,
			List<EmployerMatch> ems, RiskProfile riskProfile) {
		super();
		this.id = id;
		this.amount = amount;
		this.contributionFixed = contributionFixed;
		this.contributionPercent = contributionPercent;
		this.user = user;
		this.vehicle = vehicle;
		this.ems = ems;
		this.riskProfile = riskProfile;
	}

	@Override
	public String toString() {
		return "Portfolio [id=" + id + ", amount=" + amount + ", contributionFixed=" + contributionFixed
				+ ", contributionPercent=" + contributionPercent + "]";
	}

}