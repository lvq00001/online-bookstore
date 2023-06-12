package com.lvq.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lvq.store.domain.Order;
import com.lvq.store.repository.CustomerRepository;
import com.lvq.store.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private CustomerRepository customerRepository;
	
	public void addOrder(Order order) {
		orderRepository.save(order);
	}
	public List<Order> findCustomerOrders(String customerId) {
		return orderRepository.findByCustomer(customerRepository.findByCustomerId(customerId));
	}
	public void submittedOrder(Order order) {
		orderRepository.deleteById(order.getOrderId());
		addOrder(order);
	}
	public void deleteByUserId(String userId) {
		List<Order> orders = findCustomerOrders(userId);
		orderRepository.deleteAll(orders);
	}
}
