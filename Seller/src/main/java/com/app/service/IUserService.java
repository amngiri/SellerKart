package com.app.service;

import java.util.List;


//import com.app.pojos.Order;
import com.app.pojos.User;

public interface IUserService 
{	
	User authenticateUser(String email,String password);
	User signUpUser(User user);
	User checkUserByEmail(String email);
	User deleteById(int userId);
	User getUserByID(int sid);
	List<User>getAllUsers();
}
