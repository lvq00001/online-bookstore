package com.lvq.store.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lvq.store.domain.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String>{
	List<Product> findProductByName(String name);
	
	@Query("{'name': {$regex: '.*:#{#keyWord}.*'} }")
	List<Product> findProductByKeyWord(@Param("keyWord") String keyWord);
}
