package com.lvq.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.lvq")

@ComponentScan(basePackages = "com.lvq")
//@EntityScan("com.lvq.domain")

public class StoreApplication {
	
	@Bean
	public PasswordEncoder encoder() {
	    return new BCryptPasswordEncoder();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(StoreApplication.class, args);
	}

}
