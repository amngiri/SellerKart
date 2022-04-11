package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.app.pojos.User;

public interface UserRepository extends JpaRepositoryImplementation<User, Integer> {

	User findByEmailAndPassword(String email, String password);
	Optional<User> findByEmail(String email);
	@Query("select u from User u where u.id = ?1")
	  User findByaddressid(int id);
	
	//User findById(int id);
//	
	@Query("select u.id from User u where u.role='WHOLESALER' ")
  List<Integer> findAllwholesalerswithId();

	@Query("select u from User u where u.role='WHOLESALER' ")
	List<User>findAllwholesalerswithlist();
	//List<User> findByRoleStartingWith(String string);
	
	
	@Query("select u.id from User u where u.role='RETAILER' ")
  List<Integer> findAllretailerswithId();
	
	@Query("select u from User u where u.role='RETAILER' ")
	List<User>findAllretailerswithlist();
	
	//select * from users where role <> "ADMIN" and average_review<1.5
		@Query(value = "SELECT * FROM users WHERE role <> \"ADMIN\" AND average_review<2 AND review_count !=0", nativeQuery = true)
		List<User> findAllwithleastReview();
		
		@Query(value = "select count(role) from users where role=\"WHOLESALER\";", nativeQuery = true)
		Integer findAllcountwholesaler();
		
		@Query(value = "select count(role) from users where role=\"RETAILER\";", nativeQuery = true)
		Integer findAllcountretailer();


	//User findById(int id);

}
