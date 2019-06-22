package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Asset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private Double amount;
	
	@Column(name = "contribution_fixed")
	private Double contributionFixed;
	
	@Column(name = "contribution_percent")
	private Integer contributionPercent;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;
	
	@OneToMany(mappedBy="asset")
	private List<EmployerMatch> employerMatch;
	
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

	public Integer getContributionPercent() {
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

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public List<EmployerMatch> getEms() {
		return employerMatch;
	}

	public void setEms(List<EmployerMatch> ems) {
		this.employerMatch = ems;
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
		this.employerMatch = ems;
		this.riskProfile = riskProfile;
	}

	@Override
	public String toString() {
		return "Portfolio [id=" + id + ", amount=" + amount + ", contributionFixed=" + contributionFixed
				+ ", contributionPercent=" + contributionPercent + "]";
	}

}
