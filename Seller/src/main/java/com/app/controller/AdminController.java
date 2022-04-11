package com.app.controller;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RequestQuant;
import com.app.pojos.User;
import com.app.service.IAdminService;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins="http://localhost:3000")

 
public class AdminController {
	
	@Autowired
	IAdminService service;
	
	
	@PostMapping("/getwholesalerlist")
	public ResponseEntity<?> findAllwholesalers()
	{
		System.out.println("inside Admin controller");
		return new ResponseEntity<>(service.findAllwholesalers(), HttpStatus.OK);
		
	}
	
	@PostMapping("/getretailerlist")
	public ResponseEntity<?> findAllretailers()
	{
		System.out.println("inside Admin controller");
		return new ResponseEntity<>(service.findAllretailers(), HttpStatus.OK);
		
	}
	
	@PostMapping("/deleteUser")
	public List<User>  deleteItem(@RequestBody @Valid RequestQuant request)
	{
		System.out.println("Request id "+request.getId());		
		//System.out.println("Request userid "+request.getUserid());
		
		System.out.println("inside delete USER");
		if(service.deleteusers(request.getId())!=null)
		{
			System.out.println("inside Admin controller of deleting");
			return service.findAllwholesalers();
		}
		return null;
	}
	
	
	
	@PostMapping("/getleastreview")
	public ResponseEntity<?> findAllwithleastReview()
	{
		System.out.println("inside Admin controller");
		return new ResponseEntity<>(service.findAllwithleastReview(), HttpStatus.OK);
		
	}
	
	@PostMapping("/getcount")
	public ResponseEntity<?> findcount()
	{
		System.out.println("inside Admin controller of count ");
		return new ResponseEntity<>(service.findcount(), HttpStatus.OK);	
	}
	

}
