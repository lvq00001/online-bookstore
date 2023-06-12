package com.lvq.store.domain;

public class CheckingOrder {
	private Customer customer;
	private String totalAmount;
	
	public CheckingOrder() {
		super();
	}

	public CheckingOrder(Customer customer, String totalAmount) {
		super();
		this.customer = customer;
		this.totalAmount = totalAmount;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	
}
