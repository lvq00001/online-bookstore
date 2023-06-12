package com.lvq.store.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document("product")
public class Product {
	@Id
	private String productId;
	
	private String name;
	private String image;
	private String info;
	private String price;
	private long stock;
	private String category;
	
	public Product() {
		super();
	}
	
	public Product(String name, String info, String price, long stock, String category) {
		super();
		this.name = name;
		this.image = name + ".jpg";
		this.info = info;
		this.price = price;
		this.stock = stock;
		this.category = category;
	}

	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public long getStock() {
		return stock;
	}
	public void setStock(long stock) {
		this.stock = stock;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	
	
}
