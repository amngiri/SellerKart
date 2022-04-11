package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="wholesaler_product")
public class Wholesaler_Product extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name="product_id",nullable = false)
	private Products product;
	
	@ManyToOne
	@JoinColumn(name="wholesaler_id",nullable = false)
	private User wholesaler;
	
	@NotNull(message ="please add a valid quantity" )
	@Min(value = 1, message="quantity should be greater than 0")
	private int quantity;
	
	@NotNull(message ="please add a valid price" )
	private double rate;
	
}
