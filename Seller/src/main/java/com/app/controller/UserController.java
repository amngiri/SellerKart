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
//import com.app.pojos.Item;
//import com.app.pojos.Order;
import com.app.pojos.User;
import com.app.service.IUserService;
import com.app.service.UserServiceImpl; 
@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	
	@Autowired
	IUserService user;
	
	@PostMapping("/authenticate")
	public ResponseEntity<User> authenticateUser(@RequestBody LoginRequest request)
	{
		System.out.println("+++++++++++++++++++++++++++++^^^^^^^^^^^^^^^^^^^^^");
		System.out.println("Hrer"+request.getEmail());
		System.out.println("Here"+request.getPassword());
		System.out.println("Here"+request);
		return new ResponseEntity<>(user.authenticateUser(request.getEmail(),request.getPassword()),HttpStatus.OK);//exception work
	}
	
	//Adding new user detail in user_table
		@PostMapping("/adduser")
		public ResponseEntity<User> signUpUser(@RequestBody User userNew)
		{
			System.out.println("Here"+userNew);
			return new ResponseEntity<>(user.signUpUser(userNew), HttpStatus.CREATED);//Exception not work
		}
		
		@PostMapping("/checkUser/{email}")
		   public ResponseEntity<User> checkUserByEmail(@PathVariable String email) {
//			if(user.checkUserByEmail(email)!=null) {
//				return user.checkUserByEmail(email);
//			}
//			return null;
			   return new ResponseEntity<>(user.checkUserByEmail(email),HttpStatus.OK);   
		}
		@DeleteMapping("/checkUser/{userId}")
		   public String deleteById(@PathVariable int userId) {
			   System.out.println("Here User"+ userId);
		      if(user.deleteById(userId)!=null) {
		    	  return "deletion successfull";
		      }
			return null;
		   }
		
//		@DeleteMapping("/{id}")
//		public String deleteEmpDetails(@PathVariable int id) {
//			System.out.println("in del emp dtls " + id);
//			return user.deleteEmpDetails(id);
//		}
//		
}
