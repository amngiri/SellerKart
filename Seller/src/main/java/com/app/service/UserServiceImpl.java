package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

//import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserHandlingException;
import com.app.dao.UserRepository;
//import com.app.pojos.Item;
//import com.app.pojos.Order;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	
	@Autowired
	UserRepository user;	
	
	@Override
	public User authenticateUser(String email,String password) {
		// TODO Auto-generated method stub
		System.out.println("Email check"+ email);
		System.out.println("Password Check"+password);
		 User u=user.findByEmailAndPassword(email.trim(),password.trim());
		 System.out.println(u);
		if(u!=null) {
			return u;
		}
		else {
			throw new UserHandlingException("Enter a valid Email and Password !!!");
		}
		
	}
	@Override
	public List<User> getAllUsers() {

		return user.findAll();
	}
	
	
	@Override
	public User signUpUser(User userNewlyCreated) {
		
		User u= user.save(userNewlyCreated);
		if(u!=null) {
			return u;
		}
		else {
			throw new UserHandlingException("Enter a valid Details Of user !!!");
		}
	}
	
	@Override
	public User checkUserByEmail(String email) {
		List<User> userList=user.findAll();
		for(User u:userList) {
			if(u.getEmail().equals(email)) {
				return u;
			}
		}
		throw new UserHandlingException("Email Not Found !!!");
		
	}
	
	@Override
	public User getUserByID(int sid) {
		return user.findById(sid).orElseThrow(() -> new UserHandlingException("Invalid User ID...!!!"));
	}
	
	@Override
	public User deleteById(int userId) {
		User u=getUserByID(userId);
		System.out.println(u);
		if(u!=null) {
			user.delete(u);
			return u;
		}
		else {
			throw new UserHandlingException("Enter a valid Id");
		}
	}
	

}
	
		
	


