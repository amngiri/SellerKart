package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserHandlingException;
import com.app.dao.OrderRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Retailer_Product;
import com.app.pojos.User;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	UserRepository users;

	@Autowired
	OrderRepository order;

	@Override
	public List<User> findAllwholesalers() {
		
		
		
		System.out.println("inside re tailer repo");

		List<User> wholelist = users.findAllwholesalerswithlist();
		System.out.println(wholelist);
		
		List<Double> wholereview = new ArrayList<>();
		List<Integer> wholelist2 = users.findAllwholesalerswithId();
		
       List<Integer> countreview=new ArrayList<>();
		System.out.println("DONE WITH THE GETTING ID's FROM USER Table -------" + wholelist2);

		for (Integer i : wholelist2) {
			
			System.out.println(i);
			System.out.println("---------Cheking wholesaler list--------" + wholelist2);

		if(order.findAverageReview(i)==null)
		{
			wholereview.add(0.0);
			countreview.add(0);
		}
		else
		{
			wholereview.add(order.findAverageReview(i));
			countreview.add(order.findCountReview(i));
			
			
	   }
			System.out.println("-----------------" + wholereview);
			int index = wholelist2.indexOf(i);
			User newuser = wholelist.get(index);

			newuser.setAverageReview(wholereview.get(index));
            newuser.setReviewCount(countreview.get(index));
			System.out.println("----------------------------------------------------");
			System.out.println("-------" + newuser + "---------");
			System.out.println("----------------------------------------------------");

			System.out.println("---------------------AVERAGE FINDING --------------------------------");
		}
		

		return wholelist;
	}


	@Override
	public User deleteusers(int id) {
		
		System.out.println("INSIDE DELETE METHOD"+id);
		User  us =users.findByaddressid(id);
		System.out.println(us);
		users.delete(us);
		return us;
//		throw new UserHandlingException("Please Enter a Valid Item Id");
	}
	
	
	
	
	
	

	public List<User> findAllretailers()
	{
		System.out.println("inside retailer repo");

		List<User> retailerlist = users.findAllretailerswithlist();
		System.out.println(retailerlist);
		
		List<Double> retreview = new ArrayList<>();
		List<Integer> retailerlist2 = users.findAllretailerswithId();
		List<Integer> countreviewRetailer=new ArrayList<>();

		System.out.println("DONE WITH THE GETTING ID's FROM USER Table -------" + retailerlist2);

		for (Integer i : retailerlist2) {
			System.out.println(i);
			System.out.println("---------Cheking retailer list--------" + retailerlist2);
			
			

			if(order.findAverageReviewretailer(i)==null)
			{
				retreview.add(0.0);
				countreviewRetailer.add(0);
			}
			else
			{
				retreview.add(order.findAverageReviewretailer(i));
				countreviewRetailer.add(order.findCountReviewRetailer(i));
				
			}
			//retreview.add(order.findAverageReviewretailer(i));
			
			
			System.out.println("-----------------" + retreview);

			int index = retailerlist2.indexOf(i);
			User newuser = retailerlist.get(index);

			newuser.setAverageReview(retreview.get(index));
            newuser.setReviewCount(countreviewRetailer.get(index));
			System.out.println("----------------------------------------------------");
			System.out.println("-------" + newuser + "---------");
			System.out.println("----------------------------------------------------");

			System.out.println("---------------------AVERAGE FINDING --------------------------------");
		}

		return retailerlist;
		
	}
	
	
	public List<User> findAllwithleastReview()
	{
		
		List<User> lessreview = users.findAllwithleastReview();
		
		System.out.println("-------------------");
		
		System.out.println(lessreview);
		return lessreview;
	}
	
	public List<Integer> findcount()
	{
		List<Integer>mylist=new ArrayList<>();
		Integer whole = users.findAllcountwholesaler();
		Integer retail = users.findAllcountretailer();
		
		mylist.add(whole);
		mylist.add(retail);
		System.out.println("-------------------");
		
		System.out.println(whole +"  --wholesaler---retailer count -- "+retail);
		return mylist;
	}
	
	
	
	
}
