package com.lvq.store.domain;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("customer")
public class Customer {
	@Id
	private String customerId;
	
	private String password;
	private String username;
	private String role;
	private String address;
	private String phone;
	private Map<String, Integer> cart;
	
	public Customer() {
		super();
	}

	public Customer(Customer another) {
		this.customerId = another.customerId;
		this.password = another.password;
		this.username = another.username;
		this.role = another.role;
		this.address = another.address;
		this.phone = another.phone;
		this.cart = another.cart;
	 }

	public Customer(String customerId, String password, String username, String role, String address, String phone,
			Map<String, Integer> cart) {
		super();
		this.customerId = customerId;
		this.password = password;
		this.username = username;
		this.role = role;
		this.address = address;
		this.phone = phone;
		this.cart = cart;
	}



	public Map<String, Integer> getCart() {
		return cart;
	}

	public void setCart(Map<String, Integer> cart) {
		this.cart = cart;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
}
