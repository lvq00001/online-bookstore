package com.lvq.store.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lvq.store.domain.Customer;
import com.lvq.store.domain.ProductDTO;
import com.lvq.store.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> listAllCustomer() {
		System.out.println(customerRepository.findAll());
		return customerRepository.findAll();
	}
	
	public Customer findCustomerByName(String name) {
		return customerRepository.findByUsername(name);
	}
	
	public void addCustomer(Customer customer) {
		String pass = customer.getPassword();
		customer.setPassword(encoder.encode(pass));
		customerRepository.save(customer);
	}
	public void deleteCustomer(String id) {
		customerRepository.deleteById(id);
	}
	public void updateCustomer(Customer customer) {
		deleteCustomer(customer.getCustomerId());
		addCustomer(customer);
	}
	public void removeFromCartService(List<ProductDTO> product, String customerId) {
		System.out.println("Remove products from cart");
		Customer customer = customerRepository.findByCustomerId(customerId);
		Map<String, Integer> customerCart = customer.getCart();
		for (int i = 0; i < product.size(); i++) {
			String key = product.get(i).getProductId();
			customerCart.remove(key);
			customer.setCart(customerCart);
		}
		customerRepository.save(customer);
	}
}
