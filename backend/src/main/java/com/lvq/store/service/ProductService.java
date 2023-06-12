package com.lvq.store.service;



import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lvq.store.domain.Product;
import com.lvq.store.domain.ProductDTO;
import com.lvq.store.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> findProductByName(String name) {
		return productRepository.findProductByName(name);
	}
	
	public void addProduct(Product product) {
		productRepository.save(product);
	}
	public void deleteProduct(String id) {
		productRepository.deleteById(id);
	}
	public void updateProduct(Product product) {
		deleteProduct(product.getProductId());
		addProduct(product);
	}
	public List<Product> getCart(Map<String, Integer> cart) {
		List<Product> rs = new ArrayList<>();
		for (String s : cart.keySet()) {
			Product p = productRepository.findById(s).get();
			p.setStock(cart.get(s));
			rs.add(p);
		}
		return rs;
	}
	public String getTotalAmount(List<ProductDTO> products) {
		BigDecimal rs = new BigDecimal("0");
		System.out.println(products.size());
		for (ProductDTO p : products) {
			Product t = productRepository.findById(p.getProductId()).get();
			//System.out.println(t.getPrice() + " " + p.getQuantity() * Integer.parseInt(t.getPrice()));
			//System.out.println(new BigDecimal(t.getPrice()).multiply(new BigDecimal(p.getQuantity())));

			rs = rs.add(new BigDecimal(t.getPrice()).multiply(new BigDecimal(p.getQuantity())));
		}
		System.out.println("rs = " + rs);
		return rs.toString();
	}
	
}
