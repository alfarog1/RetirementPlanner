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

import com.skilldistillery.arewethereyet.services.RiskProfileService;
import com.skilldistillery.retirementapp.entities.RiskProfile;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4203"})
public class RiskProfileController {
	@Autowired
	RiskProfileService svc;
	
	@GetMapping("risks")
	public List<RiskProfile> getAllRiskProfiles(){
		return svc.allRiskProfiles();
	}
	@GetMapping("risks/{id}")
	public RiskProfile getRiskProfileById(@PathVariable int id, HttpServletResponse resp) {
		RiskProfile risk = svc.findById(id);
		if(risk != null) {
			resp.setStatus(200);
			return risk;
		}else {
			resp.setStatus(404);
			return null;
		}
	}
	@PostMapping("risks")
	public RiskProfile createRiskProfile(@RequestBody RiskProfile risk, HttpServletResponse resp, HttpServletRequest req) {
		try{
			if(svc.create(risk) != null) {
				resp.setStatus(201);
				StringBuffer sb = req.getRequestURL();
				sb.append("/");
				sb.append(risk.getId());
				resp.addHeader("Location", sb.toString());
			}
		}catch(Exception e) {
			System.err.println(e);
			resp.setStatus(418);
		}
		return risk;
		
	}
	@PutMapping("risks/{id}")
	public RiskProfile replaceRiskProfile(@RequestBody RiskProfile risk, @PathVariable int id, HttpServletRequest req, HttpServletResponse resp) {
	
		RiskProfile updateAddress = svc.replace(id, risk);
			
		if(updateAddress == null) {
			resp.setStatus(404);
		}
		return updateAddress;
	}
	@DeleteMapping("risks/{id}")
	public Boolean deleteRiskProfile(@PathVariable int id, HttpServletResponse resp) {
		Boolean success = svc.deleteById(id);
		if (success) {
			resp.setStatus(200);
		}else {
			resp.setStatus(418);
		}
		return success;
	}
}
