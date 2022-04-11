package com.app.service;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.custom_exceptions.UserHandlingException;
import com.app.dao.ProductRepository;
import com.app.dao.RetailerRepository;
import com.app.pojos.Products;
//import com.app.pojo.User;
import com.app.pojos.Retailer_Product;
import com.app.pojos.Wholesaler_Product;

@Service
@Transactional
public class RetailerServiceImpl implements IRetailerService {

	@Autowired
	RetailerRepository items;

	@Autowired
	ProductRepository prodsNew;

//	@SuppressWarnings("null")
	@Override
	public List<Retailer_Product> getRetailerItemList(int id) {
		System.out.println("inside retailer repo");
//		List<Retailer_Product> itemlist=new ArrayList<>();
//		List<Retailer_Product> item=items.findAll();
//		for(Retailer_Product i:item) {
//			System.out.println("inside for"+i);
//			if(i.getRetailer().getId()==id) {
//				System.out.println("inside if"+i);
//				itemlist.add(i);
//			}
		List<Retailer_Product> itemlist = items.findByRetailerIdOrderByIdDesc(id);
		return itemlist;
	}
//		throw new UserHandlingException("Email Not Found !!!");

//	

//	@Override
//	public Retailer_Product updateQuantity(int id, int quantity, int userid) {
//		System.out.println("INSIDE UPDATE METHOD"+id+quantity+userid);
//		Retailer_Product item = items.findById(id).orElse(null);
//		if(item!=null)
//		{
//			item.setQuantity(quantity);
//			Retailer_Product updatedItem=items.save(item);
//			return updatedItem;
//		}
//		throw new UserHandlingException("Please Enter a Valid Item Id");
//	}

	@Override
	public List<Retailer_Product> getAllItemList() {
		List<Retailer_Product> item = items.findAll();

		if (item == null) {
			throw new UserHandlingException("No Item in Item List");
		} else {
			return item;
		}
	}

	@Override
	public Retailer_Product updateQuantity(int id, int quantity, int userid) {
		System.out.println("INSIDE UPDATE METHOD" + id + quantity + userid);
		Retailer_Product item = items.findByProductIdAndRetailerId(id, userid);
		System.out.println("FOUND PRODUCT" + item);
//		for(Retailer_Product i:item)
//		{
//			if(i.getProduct().getId()==id)
//			{
//				i.setQuantity(quantity);
//				Retailer_Product updatedItem=items.save(i);
//				return updatedItem;
//			}
//		}
		item.setQuantity(quantity);
		Retailer_Product updatedItem = items.save(item);
		return updatedItem;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}

	@Override
	public Retailer_Product deleteItem(int id, int userid) {
//		List<Retailer_Product>  item = items.findByRetailerId(userid);
//		System.out.println("inside SERVICE DELETE"+item);
//		for(Retailer_Product i:item)
//		{
//			if(i.getProduct().getId()==itemId)
//			{
////				Retailer_Product updatedItem=items.save(i);
//				item.remove(i);
//				System.out.println("REMOVED PRODUCT"+i);
//				List<Retailer_Product> updatedItem=items.saveAll(item);
//				System.out.println("UPDATED LIST"+updatedItem);	
//				return updatedItem;
//			}
//		}

		System.out.println("INSIDE DELETE METHOD" + id + userid);
		Retailer_Product item = items.findByProductIdAndRetailerId(id, userid);
		System.out.println(item);
		items.delete(item);
		return item;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}

	@Override
	public Retailer_Product addNewItemToList(Retailer_Product newAddedItem) {
		int id = newAddedItem.getRetailer().getId();
		Products prodname = newAddedItem.getProduct();
		System.out.println("retailer id is:" + id);
		System.out.println("product  id is: " + newAddedItem.getProduct().getId());
		System.out.println("retailer name is: " + newAddedItem.getRetailer().getName());
		System.out.println("----added product-----" + prodname);

		Products product = prodsNew.findByProductName(prodname.getProductName());
		if (product != null) {
			Retailer_Product retailer = items.findByProductIdAndRetailerId(product.getId(),
					newAddedItem.getRetailer().getId());
			if (retailer != null) {
				throw new UserHandlingException("Enter a valid Details Of product !!!");
			} else {
				System.out.println("inside else");
				newAddedItem.setProduct(product);
				Retailer_Product prods = items.save(newAddedItem);
				return prods;

			}
		} else if (product == null) {
			System.out.println("inside else if");
			Products newProds = prodsNew.save(prodname);
			System.out.println("---------------------------------------" + id);
			Retailer_Product prods = items.save(newAddedItem);
			prods.setProduct(newProds);
			System.out.println(newAddedItem);
			return prods;
		}
		return null;

	}
	// }
//		else {
//			throw new UserHandlingException("Enter a valid Details Of product !!!");
//		}
//		return null;

	@Override
	public List<Retailer_Product> getFilteredItemList(int id) {
		System.out.println("inside retailer service to filter products");
		List<Retailer_Product> itemlist = new ArrayList<>();
		List<Retailer_Product> item = items.findAll();
		for (Retailer_Product i : item) {
			System.out.println("inside for" + i);
			if (i.getRetailer().getId() == id && i.getQuantity() < i.getThreshold_limit()) {
				System.out.println("inside if" + i);
				itemlist.add(i);
			}
		}
		return itemlist;
	}

}
