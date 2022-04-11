package com.app.dto;

public class DeleteRequest {
private int id;
private int userid;
public DeleteRequest(int id, int userid) {
	super();
	this.id = id;
	this.userid=userid;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}


public int getUserid() {
	return userid;
}
public void setUserid(int userid) {
	this.userid = userid;
}
@Override
public String toString() {
	return "RequestQuant [id=" + id + ", userid=" + userid + "]";
}


}
