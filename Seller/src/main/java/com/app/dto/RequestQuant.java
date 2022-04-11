package com.app.dto;

public class RequestQuant {
private int id;
private int quantity;
private int userid;
private int rate;
public RequestQuant(int id, int quantity, int userid, int rate) {
	super();
	this.id = id;
	this.quantity = quantity;
	this.userid = userid;
	this.rate = rate;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public int getQuantity() {
	return quantity;
}
public void setQuantity(int quantity) {
	this.quantity = quantity;
}
public int getUserid() {
	return userid;
}
public void setUserid(int userid) {
	this.userid = userid;
}
public int getRate() {
	return rate;
}
public void setRate(int rate) {
	this.rate = rate;
}
@Override
public String toString() {
	return "RequestQuant [id=" + id + ", quantity=" + quantity + ", userid=" + userid + ", rate=" + rate + "]";
}



}
