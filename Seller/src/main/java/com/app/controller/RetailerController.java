package com.app.controller;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginRequest;
import com.app.dto.RequestQuant;
import com.app.pojos.Retailer_Product;
//import com.app.pojos.Item;
//import com.app.pojos.Order;
import com.app.pojos.User;
import com.app.service.IAdminService;
//import com.app.service.IItemService;
import com.app.service.IRetailerService;
import com.app.service.IUserService;

import com.app.service.UserServiceImpl; 
@RestController
@RequestMapping("/retailer")
@CrossOrigin(origins="http://localhost:3000")
public class RetailerController {
	
	@Autowired
	IRetailerService service;
	

	@PostMapping("/getitemlist/{id}")
	public ResponseEntity<?> getRetailerItemList(@PathVariable int id)
	{
		System.out.println("inside retailer controller GET ALL PRODUCTS");
		return new ResponseEntity<>(service.getRetailerItemList(id), HttpStatus.OK);//Exception Work
	}
	@PostMapping("/updateQuantity")
	public ResponseEntity<?> updateQuantity(@RequestBody @Valid RequestQuant request)
	{
		
		System.out.println("Request id "+request.getId());
		System.out.println("Request Quantity "+request.getQuantity());
		System.out.println("Request userid "+request.getUserid());
		return new ResponseEntity<>(service.updateQuantity(request.getId(),request.getQuantity(),request.getUserid()),HttpStatus.OK);//exception work
	}
	@PostMapping("/deleteProduct")
	public List<Retailer_Product>  deleteItem(@RequestBody @Valid RequestQuant request)
	{
		System.out.println("Request id "+request.getId());		
		System.out.println("Request userid "+request.getUserid());
		
		System.out.println("inside DELETE PRODUCT");
		if(service.deleteItem(request.getId(),request.getUserid())!=null)
		{
			System.out.println("inside retailer controller GET ALL PRODUCTS iFFFF");
			return service.getAllItemList();
		}
		return null;
	}
	@PostMapping("/addItem")
	public ResponseEntity<Retailer_Product> addNewItemToList(@RequestBody Retailer_Product newItem)
	{
		System.out.println("Here"+newItem);
		return new ResponseEntity<>(service.addNewItemToList(newItem), HttpStatus.CREATED);//Exception not work
	}
	
	@PostMapping("/getfilteredproducts/{id}")
	public ResponseEntity<?> getFilteredItemList(@PathVariable int id)
	{
		System.out.println("inside retailer controller GET filtered PRODUCTS");
		return new ResponseEntity<>(service.getFilteredItemList(id), HttpStatus.OK);//Exception Work
	}

	
}
