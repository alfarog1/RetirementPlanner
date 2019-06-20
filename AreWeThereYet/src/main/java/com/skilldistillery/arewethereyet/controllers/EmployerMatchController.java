package com.skilldistillery.arewethereyet.controllers;

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

import com.skilldistillery.arewethereyet.services.EmployerMatchService;
import com.skilldistillery.retirementapp.entities.EmployerMatch;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4203"})
public class EmployerMatchController {
	@Autowired
	EmployerMatchService svc;
	
	@GetMapping("matches")
	public List<EmployerMatch> getAll(){
		return svc.allMatches();
	}
	@GetMapping("matches/{id}")
	public EmployerMatch getById(@PathVariable int id, HttpServletResponse resp) {
		EmployerMatch match = svc.findById(id);
		if(match != null) {
			resp.setStatus(200);
			return match;
		}else {
			resp.setStatus(404);
			return null;
		}
	}
	@PostMapping("matches")
	public EmployerMatch create(@RequestBody EmployerMatch match, HttpServletResponse resp, HttpServletRequest req) {
		try{
			if(svc.create(match) != null) {
				resp.setStatus(201);
				StringBuffer sb = req.getRequestURL();
				sb.append("/");
				sb.append(match.getId());
				resp.addHeader("Location", sb.toString());
			}
		}catch(Exception e) {
			System.err.println(e);
			resp.setStatus(400);
		}
		return match;
		
	}
	@PutMapping("matches/{id}")
	public EmployerMatch replace(@RequestBody EmployerMatch match, @PathVariable int id, HttpServletRequest req, HttpServletResponse resp) {
	
		EmployerMatch updateMatch = svc.replace(id, match);
			
		if(updateMatch == null) {
			resp.setStatus(404);
		}
		return match;
	}
	@DeleteMapping("matches/{id}")
	public Boolean delete(@PathVariable int id, HttpServletResponse resp) {
		Boolean success = svc.deleteById(id);
		if (success) {
			resp.setStatus(200);
		}else {
			resp.setStatus(418);
		}
		return success;
	}

}
