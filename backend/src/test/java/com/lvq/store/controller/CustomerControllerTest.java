package com.lvq.store.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lvq.store.domain.Order;
import com.lvq.store.security.JwtService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTest {

	String jwts = "";
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken("usertest", "usertest");
		Authentication auth = authenticationManager.authenticate(creds);
		// Generate token
		jwts = jwtService.getToken(auth.getName());
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void testGetCustomerOrders() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/customer/order/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
//		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
				
	}

	@Test
	void testCheckingOrder_And_RemoveOrder() throws Exception {
		//checking order
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/checking-order/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.content("[{\"productId\": \"6453d4761b3cfd8775ac23fb\", \"quantity\": \"1\"}]")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk());
		//remove order
		ResultActions rs =  this.mockMvc.perform(MockMvcRequestBuilders.get("/customer/order/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
		        .andExpect(status().isOk());
		
		String json = rs.andReturn().getResponse().getContentAsString();
		List<Order> res = new ObjectMapper().readValue(json, new TypeReference<List<Order>>(){});
		String orderId = res.get(0).getOrderId();
		
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/delete-order/{orderId}", orderId)
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk());
	}
	
	@Test
	void testSubmitOrder() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/submit-order/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.content("{\"products\": [{\"productId\": \"6453d4761b3cfd8775ac23fb\", \"quantity\": \"1\"}], \"customer\": {\"username\": \"usertest\", \"password\": \"usertest\"}, \"isSubmitted\": \"false\", \"orderDate\": \"null\", \"total\": \"100000\"}")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.orderDate").isNotEmpty());
	}
	
	@Test
	void testAddToCart_And_RemoveFromCart() throws Exception {
		//add to cart
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/add-to-cart/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.content("{\"productId\": \"6453d4761b3cfd8775ac23fb\", \"quantity\": \"1\"}")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk());
		//remove from cart
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/remove-from-cart/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.content("{\"productId\": \"6453d4761b3cfd8775ac23fb\", \"quantity\": \"1\"}")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk());
	}

	@Test
	void testGetCustomerCart() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/customer/cart/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
	}
	
	@Test
	void testRegisterCustomer() throws Exception {
		//register customer
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/sign-up")
				.content("{\"username\": \"user\", \"password\": \"user\", \"address\": \"123 q1 hcm\", \"phone\": \"123456789\"}")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk());
		//register already exits customer
		this.mockMvc.perform(MockMvcRequestBuilders.post("/customer/sign-up")
				.content("{\"username\": \"user\", \"password\": \"user\", \"address\": \"123 q1 hcm\", \"phone\": \"123456789\"}")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value("Sign up failed! User already exists!"));
		//delete customer
		this.mockMvc.perform(MockMvcRequestBuilders.delete("/customer/delete/{name}", "user")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}

	@Test
	void testGetCustomerId() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/customer/username/{name}", "usertest")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.customerId").value("649989ff55d89c05fec7009a"));
	}

	@Test
	void testGetCustomer() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/customer/{id}", "649989ff55d89c05fec7009a")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("usertest"));
	}

}
