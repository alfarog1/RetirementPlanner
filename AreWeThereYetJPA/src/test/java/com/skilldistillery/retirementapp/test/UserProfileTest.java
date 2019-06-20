package com.skilldistillery.retirementapp.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.retirementapp.entities.RiskProfile;
import com.skilldistillery.retirementapp.entities.UserProfile;

class UserProfileTest {
	private EntityManager em;
	private static EntityManagerFactory emf;
	private UserProfile user;
	
	@BeforeAll
	public static void setupAll() {
			emf = Persistence.createEntityManagerFactory("retirementPU");
	}
	
	@AfterAll
	public static void closeAll() {
		emf.close();
	}

	@BeforeEach
	public void setUp() throws Exception {
		em = emf.createEntityManager();
		user = em.find(UserProfile.class, 1);
		
	}

	@AfterEach
	public void tearDown() throws Exception {
		em.close();
		user = null;
	}
	
	@Test
	public void test() {
		assertEquals(1, user.getId());
	}

}
