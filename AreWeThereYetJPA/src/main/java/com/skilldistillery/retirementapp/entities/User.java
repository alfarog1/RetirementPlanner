package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "user_name")
	private String userName;
	private String password;
	private String emaill;
	private Boolean enabled;
	@OneToOne
	private UserProfile userProfile;
	@OneToMany
	private List<Asset> assets;

	public User() {
		super();
	}

	public User(int id, String userName, String password, String emaill, Boolean enabled, UserProfile userProfile,
			List<Asset> assets) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.emaill = emaill;
		this.enabled = enabled;
		this.userProfile = userProfile;
		this.assets = assets;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmaill() {
		return emaill;
	}

	public void setEmaill(String emaill) {
		this.emaill = emaill;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public List<Asset> getPortfolio() {
		return assets;
	}

	public void setPortfolio(List<Asset> assets) {
		this.assets = assets;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", emaill=" + emaill
				+ ", enabled=" + enabled + "]";
	}

}
