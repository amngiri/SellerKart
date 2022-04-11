package com.app.service;

import java.util.List;

import com.app.pojos.Retailer_Product;

public interface IRetailerService {

	List<Retailer_Product> getRetailerItemList(int id);
	
	
	List<Retailer_Product> getAllItemList();
	

	Retailer_Product deleteItem(int id,int userid);

	Retailer_Product updateQuantity(int id, int quantity, int userid);
	Retailer_Product addNewItemToList(Retailer_Product newAddedItem);


	List<Retailer_Product> getFilteredItemList(int id);
}
