package com.skilldistillery.arewethereyet.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.arewethereyet.services.AuthService;
import com.skilldistillery.retirementapp.entities.User;

@RestController
@CrossOrigin({ "*", "http://localhost:4208" })
public class AuthController {
	@Autowired
	private AuthService svc;

	@PostMapping("/register")
	public User register(@RequestBody User user, HttpServletResponse res) {
		if (user == null) {
			res.setStatus(400);
		}

		user = svc.register(user);

		return user;
	}

	@GetMapping("/authenticate")
	public Principal authenticate(Principal principal) {
		return principal;
	}

}
