package com.lvq.store.domain;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document("order")
public class Order {
	
	@Id
	private String orderId;
	
	private List<ProductDTO> products;
	private Customer customer;
	private String isSubmitted;
	private Date orderDate;
	
	@Field(targetType = FieldType.DECIMAL128) 
	private BigDecimal total;
	
	public Order() {
		super();
	}
	
	public Order(List<ProductDTO> products, Customer customer, String isSubmitted, Date orderDate, BigDecimal total) {
		super();
		this.products = products;
		this.customer = customer;
		this.isSubmitted = isSubmitted;
		this.orderDate = orderDate;
		this.total = total;
	}

	public BigDecimal getTotal() {
		return total;
	}
	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	
	public List<ProductDTO> getProducts() {
		return products;
	}

	public void setProducts(List<ProductDTO> products) {
		this.products = products;
	}

	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public String isSubmitted() {
		return isSubmitted;
	}
	public void setSubmitted(String isSubmitted) {
		this.isSubmitted = isSubmitted;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", products=" + products + ", customer=" + customer + ", isSubmitted="
				+ isSubmitted + ", orderDate=" + orderDate + ", total=" + total + "]";
	}
	
}
