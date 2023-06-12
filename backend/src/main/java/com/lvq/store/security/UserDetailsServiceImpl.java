package com.lvq.store.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lvq.store.domain.Customer;
import com.lvq.store.repository.CustomerRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private CustomerRepository customerRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Customer> user = Optional.of(customerRepository.findByUsername(username));
		UserBuilder builder = null;
		if (user.isPresent()) {
			System.out.println("user is present");
			Customer currentUser = user.get();
			builder = User.withUsername(username);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}
		return builder.build();
	}
}