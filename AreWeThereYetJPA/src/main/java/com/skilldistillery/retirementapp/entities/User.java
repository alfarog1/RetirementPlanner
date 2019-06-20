package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private String emaill;
	private Boolean enabled;
	private String role;
	@OneToOne(mappedBy = "user")
	private UserProfile userProfile;
	@OneToMany
	private List<Asset> assets;

	public User() {
		super();
	}

	public User(int id, String username, String password, String emaill, Boolean enabled, String role, UserProfile userProfile,
			List<Asset> assets) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.emaill = emaill;
		this.enabled = enabled;
		this.role = role;
		this.userProfile = userProfile;
		this.assets = assets;
	}
	

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
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
		return "User [id=" + id + ", userName=" + username + ", password=" + password + ", emaill=" + emaill
				+ ", enabled=" + enabled + "]";
	}

}
