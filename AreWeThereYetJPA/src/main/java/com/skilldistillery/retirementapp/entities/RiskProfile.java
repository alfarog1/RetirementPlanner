package com.skilldistillery.retirementapp.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="risk_profile")
public class RiskProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String description;
	
	private int ror;
	
//	@ManyToOne
//	@JoinColumn(name = "vehicle_id")
//	private Vehicle vehicle;

	public RiskProfile() {
		super();
	}

	public RiskProfile(int id, String name, String description, int ror) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.ror = ror;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getRor() {
		return ror;
	}

	public void setRor(int ror) {
		this.ror = ror;
	}


	@Override
	public String toString() {
		return "RiskProfile [id=" + id + ", name=" + name + ", description=" + description + ", ror=" + ror + "]";
	}

}
