package com.lvq.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lvq.store.domain.Product;
import com.lvq.store.repository.ProductRepository;
import com.lvq.store.service.ProductService;

@CrossOrigin
@RestController
public class ProductController {
	@Autowired 
	private ProductService productService;
	
	@Autowired
	private ProductRepository productRepository;
	
	@RequestMapping("/product/id/{productId}")
	public Product getProducts(@PathVariable("productId") String productId) {
		System.out.println("Search product by productId =" + productId);
		return productRepository.findById(productId).get();
	}
	
	@RequestMapping("/product/{keyWord}")
	public List<Product> findProducts(@PathVariable("keyWord") String keyWord) {
		System.out.println("Search product by keyWord");
		return productRepository.findProductByKeyWord(keyWord);
	}
	
	@RequestMapping("/product/all/{number}")
	public List<Product> getAllProducts(@PathVariable("number") String number) {
		System.out.println("Search product by " + number);
		PageRequest sortedByName = PageRequest.of(Integer.parseInt(number), 5, Sort.by("productId"));
		System.out.println(sortedByName.toString());
		
		return productRepository.findAll(sortedByName).getContent();
	}
	
	@RequestMapping(value = "/product/add", method =RequestMethod.POST)
	public String addProduct(@ModelAttribute("newProduct") Product newProduct) {
		productService.addProduct(newProduct);
		System.out.println("New proudct is added.");
		return "New proudct is added.";
	}
	
	@RequestMapping(value = "/product/delete/{id}", method =RequestMethod.DELETE)
	public String deleteProduct(@PathVariable("id") String id) {
		productService.deleteProduct(id);
		return "Product is deleted.";
	}
	
	@RequestMapping(value = "/product/update", method =RequestMethod.PUT)
	public String updateProduct(@ModelAttribute("updatedProduct") Product updatedProduct) {
		productService.updateProduct(updatedProduct);
		return "Product is updated.";
	}
}
