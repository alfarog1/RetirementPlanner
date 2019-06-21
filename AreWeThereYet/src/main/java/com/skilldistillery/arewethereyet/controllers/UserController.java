package com.skilldistillery.arewethereyet.controllers;

import java.security.Principal;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.arewethereyet.services.UserService;
import com.skilldistillery.retirementapp.entities.User;

@RestController
@RequestMapping("api/users")
@CrossOrigin({ "*", "http://localhost:4208" })
public class UserController {
	@Autowired
	UserService svc;

	@GetMapping(path = "ping")
	public String ping() //
	{
		return "/pong";
	}

	@GetMapping(path = "")
	public List<User> index(HttpServletRequest req, HttpServletResponse res) //
	{
		return svc.index();
	}

	@GetMapping(path = "/{uId}")
	public User show(HttpServletRequest req, HttpServletResponse res, @PathVariable("uId") int uId,
			Principal principal) {
		return svc.show(uId);
	}

	@PostMapping(path = "")
	public User create(HttpServletRequest req, HttpServletResponse res,
			@RequestBody User user) {
		return svc.create(user);
	}

	@PutMapping(path = "/{uId}")
	public User update(HttpServletRequest req, HttpServletResponse res,
			@PathVariable("uId") int uId, @RequestBody User user) {
		return svc.update(uId, user);
	}

	@DeleteMapping(path = "/{uId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res,
			@PathVariable("uId") int uId) //
	{
		svc.destroy(uId);
	}
}
