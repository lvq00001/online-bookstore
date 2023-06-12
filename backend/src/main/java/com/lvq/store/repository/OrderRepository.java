package com.lvq.store.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lvq.store.domain.Customer;
import com.lvq.store.domain.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

	public List<Order> findByCustomer(Customer customer);
	public void deleteById(String orderId);
	
	@Query("{ '_id': ObjectId(':#{#orderId}') }")
	public Order findByOrderId(@Param(value = "orderId") ObjectId orderId);
	
	@Query("{ '_id': ?0 }")
	public Order findById(ObjectId orderId);
}
