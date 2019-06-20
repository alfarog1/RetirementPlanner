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

import com.skilldistillery.arewethereyet.services.AssetService;
import com.skilldistillery.retirementapp.entities.Asset;

@RestController
@RequestMapping("api/assets")
@CrossOrigin({"*", "http://localhost:4203"})
public class AssetController {
	@Autowired
	AssetService svc;
	
	 @GetMapping(path = "ping")
	    public String ping() //
	    {
	        return "assets/pong";
	    }

	    @GetMapping(path = "")
	    public List<Asset> index(HttpServletRequest req, HttpServletResponse res, Principal principal) //
	    {
	        return svc.index(principal.getName());
	    }

	    @GetMapping(path = "/{aId}")
	    public Asset show(HttpServletRequest req, HttpServletResponse res, @PathVariable("aId") int aId, Principal principal) 
	    {
	        return svc.show(principal.getName(), aId);
	    }
	    
	    @PostMapping(path = "")
	    public Asset create(Principal principal, HttpServletRequest req, HttpServletResponse res, @RequestBody Asset asset) {
	        return svc.create(principal.getName(), asset);
	    }

	    @PutMapping(path = "/{aId}")
	    public Asset update(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("aId") int aId,
	            @RequestBody Asset asset)
	    {
	        return svc.update(principal.getName(), aId, asset);
	    }

	    @DeleteMapping(path = "/{aId}")
	    public void destroy(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("aId") int aId) //
	    {
	        svc.destroy(principal.getName(), aId);
	    }
	}
