package com.app.dto;

public class RequestPrice {
	private int id;
	private int rate;
	private int userid;
public RequestPrice(int id, int quantity,int userid) {
	super();
	this.id = id;
	this.rate = quantity;
	this.userid=userid;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public int getRate() {
	return rate;
}
public void setRate(int rate) {
	this.rate = rate;
}
public int getUserid() {
	return userid;
}
public void setUserid(int userid) {
	this.userid = userid;
}
@Override
public String toString() {
	return "RequestQuant [id=" + id + ", quantity=" + rate + ", userid=" + userid + "]";
}



}
