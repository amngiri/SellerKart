package com.app.service;

import java.util.List;

import com.app.pojos.Order;

public interface IOrderService {

	Order placeorder(Order orderplace);

	List<Order> getallorders(int id);

	Order updatereview(int id,int review, int wholesalerid, int retailerid, int productid, int rate,int quantity);

	List<Order> getwholesalerorders(int id);

	Order updatestatus(int id,int status, int wholesalerid, int retailerid, int productid, int rate, int quantity);

	Order updatewholesalerreview(int id,int review, int wholesalerid, int retailerid, int productid, int rate, int quantity);

	Order cancelOrder(int id,int status, int wholesalerid, int retailerid, int productid, int rate, int quantity);

	
}
