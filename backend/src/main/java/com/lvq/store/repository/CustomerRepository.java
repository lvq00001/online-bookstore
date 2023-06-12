package com.lvq.store.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.lvq.store.domain.Customer;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String>{
	Customer findByUsername(String username);
	Customer findByCustomerId(String customerId);
}
