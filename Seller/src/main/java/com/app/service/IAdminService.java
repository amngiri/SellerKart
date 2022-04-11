package com.app.service;

import java.util.List;

import com.app.pojos.User;

public interface IAdminService {

//	Order placeorder(Order orderplace);
//
//	List<Order> getallorders(int id);
//
//	Order updateQuantity(int review, int wholesalerid, int retailerid, int productid, int rate);

	List<User> findAllwholesalers();
	List<User> findAllretailers();
	List<User> findAllwithleastReview();
	List<Integer> findcount();
	User deleteusers(int id);
	//User deleteById(int id);
	//User getUserByID(int id);
	
}
