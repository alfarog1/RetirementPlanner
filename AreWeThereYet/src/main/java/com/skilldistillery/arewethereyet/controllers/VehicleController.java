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

import com.skilldistillery.arewethereyet.services.VehicleService;
import com.skilldistillery.retirementapp.entities.Vehicle;

@RestController
@RequestMapping("api/vehicles")
@CrossOrigin({ "*", "http://localhost:4203" })
public class VehicleController {
	@Autowired
	VehicleService svc;

	@GetMapping(path = "ping")
	public String ping() //
	{
		return "vehicles/pong";
	}

	@GetMapping(path = "")
	public List<Vehicle> index(HttpServletRequest req, HttpServletResponse res) //
	{
		return svc.index();
	}

	@GetMapping(path = "/{vId}")
	public Vehicle show(HttpServletRequest req, HttpServletResponse res, @PathVariable("vId") int vId,
			Principal principal) {
		return svc.show(vId);
	}


	@PutMapping(path = "/{vId}")
	public Vehicle update(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("vId") int vId, @RequestBody Vehicle vehicle) {
		return svc.update(vId, vehicle);
	}

}
