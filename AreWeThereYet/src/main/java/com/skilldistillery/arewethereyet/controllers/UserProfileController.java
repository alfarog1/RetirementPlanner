package com.skilldistillery.arewethereyet.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.arewethereyet.services.UserProfileService;
import com.skilldistillery.retirementapp.entities.UserProfile;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4203"})
public class UserProfileController {
	@Autowired
	UserProfileService svc;
	
	@GetMapping("profiles")
	public List<UserProfile> getAllCourses(){
		return svc.getAll();
	}
	@GetMapping("profiles/{id}")
	public UserProfile getCourseById(@PathVariable int id, HttpServletResponse resp) {
		UserProfile profile = svc.findById(id);
		if(profile != null) {
			resp.setStatus(200);
			return profile;
		}else {
			resp.setStatus(404);
			return null;
		}
	}
	@PostMapping("profiles")
	public UserProfile createCourse(@RequestBody UserProfile profile, HttpServletResponse resp, HttpServletRequest req) {
		try{
			if(svc.create(profile) != null) {
				resp.setStatus(201);
				StringBuffer sb = req.getRequestURL();
				sb.append("/");
				sb.append(profile.getId());
				resp.addHeader("Location", sb.toString());
			}
		}catch(Exception e) {
			System.err.println(e);
			resp.setStatus(418);
		}
		return profile;
		
	}
	@PutMapping("profiles/{id}")
	public UserProfile replacePost(@RequestBody UserProfile profile, @PathVariable int id, HttpServletRequest req, HttpServletResponse resp) {
	
		UserProfile updateCourse = svc.replace(id, profile);
			
		if(updateCourse == null) {
			resp.setStatus(404);
		}
		return updateCourse;
	}

}
