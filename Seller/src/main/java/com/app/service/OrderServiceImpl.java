package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.dao.OrderRepository;
import com.app.dao.ProductRepository;
import com.app.dao.RetailerRepository;
import com.app.dao.WholesalerRepository;
import com.app.pojos.Order;
import java.io.Console;
import java.sql.Date;
import java.time.LocalDate;
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
public class OrderServiceImpl implements IOrderService {
	@Autowired
	OrderRepository order;
	
	@Autowired
	ProductRepository prodsNew;
	@Autowired
	RetailerRepository retailer;
	
	@Autowired
	WholesalerRepository wholesaler;
	
	
	@Override
	public Order placeorder(Order orderplace) {
		int rid=orderplace.getRetailer().getId();
		int wid=orderplace.getWholesaler().getId();
		int pid=orderplace.getProduct().getId();
		int status=orderplace.getStatus();
		int quantity=orderplace.getOrder_quantity();
//		Date date=orderplace.getOrder_Date();
		orderplace.setOrderdate(LocalDate.now());
		System.out.println("rid:"+rid+"wid:"+wid+"pid:"+pid+"status:"+status+"quantity:"+quantity);
		
		
		Order neworder=order.save(orderplace);
		return neworder;
	}



	@Override
	public List<Order> getallorders(int id) {
		System.out.println("inside order repo to get all orders");
//		List<Order> orderlist=new ArrayList<>();
//		List<Order> item=order.findAll();
//		for(Order i:item) {
//			System.out.println("inside for"+i);
//			if(i.getRetailer().getId()==id) {
//				System.out.println("inside if"+i);
//				orderlist.add(i);
//			}
//		}
//		System.out.println("filered items"+orderlist);
		List<Order> orders=order.findByRetailerIdOrderByIdDesc(id);
		System.out.println("order list is :######"+orders);
		return orders;
	}
  


	@Override
	public Order updatereview(int id,int review, int wholesalerid, int retailerid, int productid, int rate,int quantity) {
		System.out.println("inside wholesaler imp to update REVIEW /////////////////////");
		List<Order> orders=order.findByWholesalerIdAndRetailerIdAndProductId(wholesalerid,retailerid,productid);
		for(Order o:orders)
		{
			if(o.getOrder_quantity()==quantity && o.getId()==id)
			{
				o.setReview(review);
				Order updatedorder=order.save(o);
				return updatedorder;
			}
		}
		return null;
	}



	@Override
	public List<Order> getwholesalerorders(int id) {
		System.out.println("inside order repo wholesaler to get all orders");
//		List<Order> orderlist=new ArrayList<>();
//		List<Order> item=order.findAll();
//		for(Order i:item) {
//			System.out.println("inside for"+i);
//			if(i.getRetailer().getId()==id) {
//				System.out.println("inside if"+i);
//				orderlist.add(i);
//			}
//		}
//		System.out.println("filered items"+orderlist);
		List<Order> orders=order.findByWholesalerIdOrderByIdDesc(id);
		return orders;
	}



	@Override
	public Order updatestatus(int id,int status, int wholesalerid, int retailerid, int productid, int rate, int quantity) {
		List<Order> orders=order.findByWholesalerIdAndRetailerIdAndProductId(wholesalerid,retailerid,productid);
		for(Order o:orders)
		{
			if(o.getOrder_quantity()==quantity && o.getStatus()!=2 && o.getId()==id )
			{
				System.out.println("INSIDE IF");
				o.setStatus(status);
				Order updatedorder=order.save(o);
				if(o.getStatus()==3 && o.getId()==id)
				{
					Retailer_Product ret=retailer.findByProductIdAndRetailerId(productid,retailerid);
					Wholesaler_Product wsaler=wholesaler.findByProductIdAndWholesalerId(productid,wholesalerid);
					ret.setQuantity(ret.getQuantity()+quantity);
					Retailer_Product updatedret=retailer.save(ret);
					wsaler.setQuantity(wsaler.getQuantity()-quantity);
					Wholesaler_Product updatedwsaler=wholesaler.save(wsaler);
				}
				return updatedorder;
			}
		}
		return null;
	}



	@Override
	public Order updatewholesalerreview(int id,int review, int wholesalerid, int retailerid, int productid, int rate,
			int quantity) {
		List<Order> orders=order.findByWholesalerIdAndRetailerIdAndProductId(wholesalerid,retailerid,productid);
		for(Order o:orders)
		{
			if(o.getOrder_quantity()==quantity &&  o.getId()==id)
			{
				o.setCreview(review);
				Order updatedorder=order.save(o);
				return updatedorder;
			}
		}
		return null;
	}



	@Override
	public Order cancelOrder(int id,int status, int wholesalerid, int retailerid, int productid, int rate, int quantity) {
		
		List<Order> orders=order.findByWholesalerIdAndRetailerIdAndProductId(wholesalerid,retailerid,productid);
		for(Order o:orders)
		{
			if(o.getOrder_quantity()==quantity && o.getId()==id)
			{
				
				order.delete(o);
				System.out.println("delted item is:@@@@@@@@@@@@@@@@@@"+o);
				return o;
			}
		}
		return null;
	}




}
