package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.app.pojos.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@ToString
@Table(name="address")
@Entity
public class Address extends BaseEntity {
	@Column
	private String addressLine1;
	
	@Column
	private String addressLine2;
	
	@Column
	private String city;
	
	@Column
	private String state;
	
	@Column
	private int pincode;
	

	@OneToOne(mappedBy="address")
	@JsonIgnoreProperties("address")
	private User user;
}
