package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserHandlingException;
import com.app.dao.ProductRepository;
//import com.app.pojo.User;
import com.app.dao.WholesalerRepository;
import com.app.pojos.Products;
import com.app.pojos.Retailer_Product;
import com.app.pojos.Wholesaler_Product;

@Service
@Transactional
public class WholesalerServiceImpl implements IWholesalerService {

	@Autowired
	WholesalerRepository itemss;

	@Autowired
	ProductRepository prodsNew;

//	@SuppressWarnings("null")
	@Override
	public List<Wholesaler_Product> getWholesalerItemList(int id) {
		System.out.println("inside retailer repo");
		List<Wholesaler_Product> itemlist = itemss.findByWholesalerIdOrderByIdDesc(id);
//		List<Wholesaler_Product> item = itemss.findAll();
//		for (Wholesaler_Product i : item) {
//			System.out.println("inside for" + i);
//			if (i.getWholesaler().getId() == id) {
//				System.out.println("inside if" + i);
//				itemlist.add(i);
//			}
//		}
		
		return itemlist;
//		throw new UserHandlingException("Email Not Found !!!");

	}

	@Override
	public Wholesaler_Product addNewItemToList(Wholesaler_Product newAddedItem) {
		int id = newAddedItem.getWholesaler().getId();
		Products prodname = newAddedItem.getProduct();
		System.out.println("----added product-----" + prodname);
		Products product = prodsNew.findByProductName(prodname.getProductName());
		if (product != null) {
			Wholesaler_Product wholesaler = itemss.findByProductIdAndWholesalerId(product.getId(),
					newAddedItem.getWholesaler().getId());
			if (wholesaler != null) {
				throw new UserHandlingException("Enter a valid Details Of product !!!");
			} else {
				System.out.println("inside else");
				newAddedItem.setProduct(product);
				Wholesaler_Product prods = itemss.save(newAddedItem);
				return prods;

			}
		} else if (product == null) {
			System.out.println("inside else if");
			Products newProds = prodsNew.save(prodname);
			System.out.println("---------------------------------------" + id);
			Wholesaler_Product prods = itemss.save(newAddedItem);
			prods.setProduct(newProds);
			System.out.println(newAddedItem);
			return prods;
		}
		return null;

	}

	@Override
	public Wholesaler_Product deleteItem(int id, int userid) {
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

		System.out.println("INSIDE DELETE METHOD of WHOLESALER " + id + userid);
		Wholesaler_Product item = itemss.findByProductIdAndWholesalerId(id, userid);
		System.out.println(item);
		itemss.delete(item);
		return item;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}

	@Override
	public List<Wholesaler_Product> getAllItemList() {
		List<Wholesaler_Product> item = itemss.findAll();

		if (item == null) {
			throw new UserHandlingException("No Item in Item List");
		} else {
			return item;
		}
	}

	@Override
	public Wholesaler_Product updatePrice(int id, int rate, int userid) {
		System.out.println("INSIDE UPDATE METHOD of WHOLESALER for Price" + id + " " + rate + " " + userid);
		Wholesaler_Product item = itemss.findByProductIdAndWholesalerId(id, userid);
		System.out.println("FOUND PRODUCT of WHOLESALER for price  " + item);

		item.setRate(rate);
		Wholesaler_Product updatedItem = itemss.save(item);
		return updatedItem;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}

	@Override
	public Wholesaler_Product updateQuantity(int id, int quantity, int rate, int userid) {
		System.out.println("INSIDE UPDATE METHOD of WHOLESALER" + id + " " + quantity + " " + userid);

		Wholesaler_Product item = itemss.findByProductIdAndWholesalerId(id, userid);
		System.out.println("FOUND PRODUCT of WHOLESALER " + item);
		if (quantity != 0) {
			item.setQuantity(quantity);
		}
		if (rate != 0) {
			item.setRate(rate);

		}

		Wholesaler_Product updatedItem = itemss.save(item);

		return updatedItem;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}

	@Override
	public List<Wholesaler_Product> getWholesalerList(int proid) {
		System.out.println("inside getwholesaler service implementation");
		List<Wholesaler_Product> list = itemss.findByProductIdOrderByRate(proid);

		return list;
	}

}
