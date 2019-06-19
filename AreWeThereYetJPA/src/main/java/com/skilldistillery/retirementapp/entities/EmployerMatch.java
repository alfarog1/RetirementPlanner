package com.skilldistillery.retirementapp.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Entity
public class EmployerMatch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "bottom_threshold")
	private int bottomThreshold;
	@Column(name = "top_threshold")
	private int topThreshold;
	@Column(name = "matching_percent")
	private int matchingPercent;
	@ManyToOne
	@JoinColumn(name = "asset_id")
	private Asset asset;
	
	

	public EmployerMatch() {
		super();
	}

	public EmployerMatch(int id, int bottomThreshold, int topThreshold, int matchingPercent, Asset asset) {
		super();
		this.id = id;
		this.bottomThreshold = bottomThreshold;
		this.topThreshold = topThreshold;
		this.matchingPercent = matchingPercent;
		this.asset = asset;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBottomThreshold() {
		return bottomThreshold;
	}

	public void setBottomThreshold(int bottomThreshold) {
		this.bottomThreshold = bottomThreshold;
	}

	public int getTopThreshold() {
		return topThreshold;
	}

	public void setTopThreshold(int topThreshold) {
		this.topThreshold = topThreshold;
	}

	public int getMatchingPercent() {
		return matchingPercent;
	}

	public void setMatchingPercent(int matchingPercent) {
		this.matchingPercent = matchingPercent;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	@Override
	public String toString() {
		return "EmployerMatch [id=" + id + ", bottomThreshold=" + bottomThreshold + ", topThreshold=" + topThreshold
				+ ", matchingPercent=" + matchingPercent + "]";
	}

}
