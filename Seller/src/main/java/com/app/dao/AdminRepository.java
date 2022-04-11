package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;


import com.app.pojos.User;

//import com.app.pojo.User;

public interface AdminRepository extends JpaRepositoryImplementation<User, Integer> {
	//
//	Retailer_Product findByEmailAndPassword(String email, String password);
//
//	Optional<Retailer_Product> findByEmail(String email);
//	@Query(value = "SELECT * FROM tutorials t WHERE t.published=true", nativeQuery = true)

	//@Query("select new com.app.pojos.User(*) from User e where e.role='WHOLESALER' or e.role='RETAILER'")--, nativeQuery = true
//	@Query("SELECT u.id FROM User u WHERE u.role like %WHOLESALER% ")
//     List<Integer> findAllwholesalerswithId();
//	
//	
//	@Query(value = "SELECT u.id FROM User u WHERE u.role like %RETAILER% ")
//	List<Integer>findAllretailers();
}
