package com.lvq.store.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lvq.store.domain.Customer;
import com.lvq.store.domain.Order;
import com.lvq.store.domain.Product;
import com.lvq.store.domain.ProductDTO;
import com.lvq.store.repository.CustomerRepository;
import com.lvq.store.repository.OrderRepository;
import com.lvq.store.service.CustomerService;
import com.lvq.store.service.OrderService;
import com.lvq.store.service.ProductService;

@CrossOrigin
@RestController
public class CustomerController {
	@Autowired
	private ProductService productService;
	
	@Autowired 
	private CustomerService customerService;
	
	@Autowired 
	private CustomerRepository customerRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderService orderService;
	
	
	@RequestMapping(value = "/customer/order/{id}", method =RequestMethod.GET)
	public List<Order> getCustomerOrders(@PathVariable("id") String id) { 
		return orderService.findCustomerOrders(id); 
	}
	
	@RequestMapping(value = "/customer/checking-order/{id}", method =RequestMethod.POST)
	public String checkingOrder(@RequestBody List<ProductDTO> products, @PathVariable("id") String customerId) {
		customerService.removeFromCartService(products, customerId);
		Customer customer = customerRepository.findByCustomerId(customerId);
		String total = productService.getTotalAmount(products);
		ObjectId id = new ObjectId();
		Order order = new Order(id.toHexString(), products, customer, "false", null, new BigDecimal(total));
		orderRepository.insert(order);
		return id.toHexString();
	}
	
	@RequestMapping(value = "/customer/delete-order", method =RequestMethod.POST)
	public String removeOrder(@RequestBody String orderId) {
		orderId = orderId.replace("\"", "");
		Order order = orderRepository.findById(orderId).get();
		orderRepository.delete(order);
		return "Remove order!";
	}
	
	@RequestMapping(value = "customer/delete-order/{orderId}", method =RequestMethod.POST)
	public String deleteOrder(@PathVariable String orderId) {
		orderId = orderId.replace("\"", "");
		Order order = orderRepository.findById(orderId).get();
		orderRepository.delete(order);
		return "Remove order!";
	}
	
	@RequestMapping(value = "/customer/submit-order/{id}", method =RequestMethod.POST)
	public Order submitOrder(@RequestBody Order order, @PathVariable("id") String customerId) {
		System.out.println("submit order");
		order.setOrderDate(new Date());
		order.setSubmitted("true");
		orderService.submittedOrder(order);
		return order;
	}
	
	@RequestMapping(value = "/customer/remove-from-cart/{id}", method =RequestMethod.POST)
	public String removeFromCart(@RequestBody ProductDTO product, @PathVariable("id") String customerId) {
		List<ProductDTO> list = new ArrayList<>();
		list.add(product);
		customerService.removeFromCartService(list, customerId);
		return "Remove from cart";
	}
	
	@RequestMapping(value = "/customer/add-to-cart/{id}", method =RequestMethod.POST)
	public String addToCart(@RequestBody ProductDTO product, @PathVariable("id") String customerId) {
		System.out.println("adding products to cart");
		Customer customer = customerRepository.findByCustomerId(customerId);
		Map<String, Integer> customerCart = customer.getCart();
		if (customerCart == null) customerCart = new HashMap<>();
		String key = product.getProductId();
		if (customerCart.containsKey(key)) {
			customerCart.put(key, customerCart.get(key) + product.getQuantity());
		} else {
			customerCart.put(key, product.getQuantity());
		}
		customer.setCart(customerCart);
		customerRepository.save(customer);
		System.out.println(customer.getCart());		
		return "Add to cart successfully!";
	}
	
	@RequestMapping(value = "/customer/cart/{id}", method =RequestMethod.GET)
	public  List<Product> getCustomerCart(@PathVariable("id") String id) {
		Map<String, Integer> cart = customerRepository.findByCustomerId(id).getCart();
		List<Product> rs = productService.getCart(cart);
		return rs; 
	}
	
	@RequestMapping(value = "/customer/sign-up", method =RequestMethod.POST)
	public List<String> registerCustomer(@RequestBody Customer newCustomer, HttpServletResponse response) {
		System.out.println("adding customer");
		boolean isRegister =  customerService.findCustomerByName(newCustomer.getUsername()) == null ? true : false;
		List<String> rs = new ArrayList<>();
		if (isRegister) {
			System.out.println("vao");
			customerService.addCustomer(newCustomer);
			rs.add("Sign up successfully!");
			return rs;
		}
		rs.add("Sign up failed! User already exists!"); 
		return rs;
					
	}
	
	@RequestMapping(value = "/customer/username/{name}", method =RequestMethod.GET)
	public Customer getCustomerId(@PathVariable("name") String username) {
		return customerRepository.findByUsername(username);
	}
	
//	@RequestMapping(value = "/customer/update", method =RequestMethod.PUT)
//	public String updateCustomer(@ModelAttribute("updatedCustomer") Customer updatedCustomer) {
//		customerService.updateCustomer(updatedCustomer);
//		return "Customer is updated.";
//	}
//	
	@RequestMapping(value = "/customer/delete/{name}", method =RequestMethod.DELETE)
	public String deleteCustomer(@PathVariable("name") String username) {
		customerService.deleteCustomerByUsername(username);
		return "Account is deleted.";
	}
	
	@RequestMapping(value = "/customer/{id}", method =RequestMethod.GET)
	public Customer getCustomer(@PathVariable("id") String id) {
		return customerRepository.findByCustomerId(id);
	}
	
//	@RequestMapping(value = "/customer/all", method =RequestMethod.GET)
//	public List<Customer> getAllCustomers() {
//		return customerService.listAllCustomer();
//	}
	
	
	
}
