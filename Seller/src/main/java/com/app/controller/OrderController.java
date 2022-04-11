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
import com.app.dto.RequestCancelOrder;
import com.app.dto.RequestQuant;
import com.app.dto.RequestReview;
import com.app.dto.RequestStatus;
import com.app.pojos.Order;
import com.app.pojos.Retailer_Product;
//import com.app.pojos.Item;
//import com.app.pojos.Order;
import com.app.pojos.User;
import com.app.service.IOrderService;
//import com.app.service.IItemService;
import com.app.service.IRetailerService;
import com.app.service.IUserService;

import com.app.service.UserServiceImpl; 


@RestController
@RequestMapping("/order")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {
	
	@Autowired
	IOrderService service;

	//wholesalergetorders
	@PostMapping("/placeorder")
	public ResponseEntity<Order> placeorder(@RequestBody Order newItem)
	{
		System.out.println("inside order controller");
		System.out.println("Here"+newItem);
		System.out.println(newItem.getRetailer().getId());
		System.out.println(newItem.getWholesaler().getId());
		System.out.println(newItem.getProduct().getId());
		System.out.println(newItem.getStatus());
		System.out.println(newItem.getOrder_quantity());
		System.out.println(newItem.getOrder_rate());
//		System.out.println(newItem.getReview());
		
		return new ResponseEntity<>(service.placeorder(newItem), HttpStatus.CREATED);//Exception not work
	}

	@PostMapping("/wholesalergetorders/{id}")
	public ResponseEntity<?> wholesalergetorders(@PathVariable int id)
	{
		System.out.println("inside order controller WHOLESALER GET ALL ORDERS");
		return new ResponseEntity<>(service.getwholesalerorders(id), HttpStatus.OK);//Exception Work
	}
	
	@PostMapping("/getallorders/{id}")
	public ResponseEntity<?> getallorders(@PathVariable int id)
	{
		System.out.println("inside order controller GET ALL ORDERS");
		return new ResponseEntity<>(service.getallorders(id), HttpStatus.OK);//Exception Work
	}
	
	@PostMapping("/updatereview")
	public ResponseEntity<?> updatereview(@RequestBody RequestReview request)
	{
		System.out.println("Request id "+request.getId());
		System.out.println("Request id "+request.getReview());
		System.out.println("Request Quantity "+request.getWholesalerid());
		System.out.println("Request userid "+request.getRetailerid());
		System.out.println("Request userid "+request.getProductid());
		System.out.println("Request userid "+request.getRate());
		System.out.println("Request userid "+request.getQuantity());
		return new ResponseEntity<>(service.updatereview(request.getId(),request.getReview(),request.getWholesalerid(),request.getRetailerid(),request.getProductid(),request.getRate(),request.getQuantity()),HttpStatus.OK);//exception work
	}
	
	@PostMapping("/updatestatus")
	public ResponseEntity<?> updatestatus(@RequestBody RequestStatus request)
	{
		System.out.println("Request id "+request.getId());
		System.out.println("Request status "+request.getStatus());
		System.out.println("Request Quantity "+request.getWholesalerid());
		System.out.println("Request userid "+request.getRetailerid());
		System.out.println("Request userid "+request.getProductid());
		System.out.println("Request userid "+request.getRate());
		System.out.println("Request userid "+request.getQuantity());
		return new ResponseEntity<>(service.updatestatus(request.getId(),request.getStatus(),request.getWholesalerid(),request.getRetailerid(),request.getProductid(),request.getRate(),request.getQuantity()),HttpStatus.OK);//exception work
	}
	@PostMapping("/updatewholesalerreview")
	public ResponseEntity<?> updatewholesalerreview(@RequestBody RequestReview request)
	{
		System.out.println("Request id "+request.getId());
		System.out.println("Request id "+request.getReview());
		System.out.println("Request Quantity "+request.getWholesalerid());
		System.out.println("Request userid "+request.getRetailerid());
		System.out.println("Request userid "+request.getProductid());
		System.out.println("Request userid "+request.getRate());
		System.out.println("Request userid "+request.getQuantity());
		return new ResponseEntity<>(service.updatewholesalerreview(request.getId(),request.getReview(),request.getWholesalerid(),request.getRetailerid(),request.getProductid(),request.getRate(),request.getQuantity()),HttpStatus.OK);//exception work
	}
	@PostMapping("/cancelorder")
	public ResponseEntity<?> cancelorder(@RequestBody RequestCancelOrder request)
	{
		System.out.println("to cancel order====");
		System.out.println("Request id "+request.getId());
		System.out.println("Request status "+request.getStatus());
		System.out.println("Request Quantity "+request.getWholesalerid());
		System.out.println("Request userid "+request.getRetailerid());
		System.out.println("Request userid "+request.getProductid());
		System.out.println("Request userid "+request.getRate());
		System.out.println("Request userid "+request.getQuantity());
		return new ResponseEntity<>(service.cancelOrder(request.getId(),request.getStatus(),request.getWholesalerid(),request.getRetailerid(),request.getProductid(),request.getRate(),request.getQuantity()),HttpStatus.OK);//exception work
	}
}
