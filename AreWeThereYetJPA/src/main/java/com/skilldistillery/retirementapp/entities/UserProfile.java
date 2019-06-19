package com.skilldistillery.retirementapp.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

public class UserProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "retirement_age")
	private int retirementAge;
	@Column(name = "life_expectancy")
	private int retirementExpectancy;
	@Column(name = "percent_income")
	private int percentIncome;
	@Column(name = "first_name")
	private String fName;
	@Column(name = "last_name")
	private String lName;
	private Date dob;
	private int income;
	@Column(name = "pay_period")
	private String payPeriod;
	@OneToOne
	private User user;

	public UserProfile() {
		super();
	}

	public UserProfile(int id, int retirementAge, int retirementExpectancy, int percentIncome, String fName,
			String lName, Date dob, int income, String payPeriod, User user) {
		super();
		this.id = id;
		this.retirementAge = retirementAge;
		this.retirementExpectancy = retirementExpectancy;
		this.percentIncome = percentIncome;
		this.fName = fName;
		this.lName = lName;
		this.dob = dob;
		this.income = income;
		this.payPeriod = payPeriod;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRetirementAge() {
		return retirementAge;
	}

	public void setRetirementAge(int retirementAge) {
		this.retirementAge = retirementAge;
	}

	public int getRetirementExpectancy() {
		return retirementExpectancy;
	}

	public void setRetirementExpectancy(int retirementExpectancy) {
		this.retirementExpectancy = retirementExpectancy;
	}

	public int getPercentIncome() {
		return percentIncome;
	}

	public void setPercentIncome(int percentIncome) {
		this.percentIncome = percentIncome;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public int getIncome() {
		return income;
	}

	public void setIncome(int income) {
		this.income = income;
	}

	public String getPayPeriod() {
		return payPeriod;
	}

	public void setPayPeriod(String payPeriod) {
		this.payPeriod = payPeriod;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "UserProfile [id=" + id + ", retirementAge=" + retirementAge + ", retirementExpectancy="
				+ retirementExpectancy + ", percentIncome=" + percentIncome + ", fName=" + fName + ", lName=" + lName
				+ ", dob=" + dob + ", income=" + income + ", payPeriod=" + payPeriod + "]";
	}

}
