package com.app.dao;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.app.pojos.Products;
import com.app.pojos.User;

public interface ProductRepository extends JpaRepositoryImplementation<Products, Integer>{

	Products findByProductName(String productName);

}
