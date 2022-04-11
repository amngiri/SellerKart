package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.app.pojos.Order;
import com.app.pojos.Products;

public interface OrderRepository extends JpaRepositoryImplementation<Order, Integer>{

	List<Order> findByRetailerId(int id);

	List<Order> findByWholesalerIdAndRetailerIdAndProductId(int wholesalerid, int retailerid, int productid);

	List<Order> findByWholesalerIdOrderByIdDesc(int id);

	List<Order> findByRetailerIdOrderByIdDesc(int id);
	//Order findByWholesalerIdAndRetailerIdAndProductId(int wholesalerid, int retailerid, int productid);
	 
		//@Query(value = "SELECT AVG(review) FROM ORDER WHERE wholesaler_id = ?1", nativeQuery = true)
		
//		@Query("SELECT AVG(review) FROM Order WHERE wholesaler_id = ?")
		
		@Query(value = "SELECT AVG(review) FROM orders WHERE wholesaler_id=?", nativeQuery = true)
		Double findAverageReview(double wholelist2);
		
		@Query(value = "select count(review) from orders where wholesaler_id=?", nativeQuery = true)
		Integer findCountReview(int wholelist2);
		
		////Integer findAverageReview(int wholelist2);
		//List<Integer>
		
		@Query(value = "SELECT AVG(creview) FROM orders WHERE retailer_id=?", nativeQuery = true)
		Double findAverageReviewretailer(double wholelist2);
		
		@Query(value = "select count(creview) from orders where retailer_id=?", nativeQuery = true)
		Integer findCountReviewRetailer(int wholelist2);
}
