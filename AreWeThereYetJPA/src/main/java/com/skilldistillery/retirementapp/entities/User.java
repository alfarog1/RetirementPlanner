package com.skilldistillery.retirementapp.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
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
	private List<Portfolio> portfolios;

	public User() {
		super();
	}

	public User(int id, String userName, String password, String emaill, Boolean enabled, UserProfile userProfile,
			List<Portfolio> portfolios) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.emaill = emaill;
		this.enabled = enabled;
		this.userProfile = userProfile;
		this.portfolios = portfolios;
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

	public List<Portfolio> getPortfolio() {
		return portfolios;
	}

	public void setPortfolio(List<Portfolio> portfolios) {
		this.portfolios = portfolios;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", emaill=" + emaill
				+ ", enabled=" + enabled + "]";
	}

}
