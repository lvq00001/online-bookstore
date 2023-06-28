package com.lvq.store.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.lvq.store.security.JwtService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {
	
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
	void testGetProducts() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/product/id/{productId}", "6453d4761b3cfd8775ac23fb")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Đời ngắn đừng ngủ dài"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.image").value("https://i.imgur.com/h2zY7Ky.jpg"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.price").value(100000));
	}

	@Test
	void testFindProducts() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/product/{keyWord}", "Đời ngắn")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Đời ngắn đừng ngủ dài"))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].image").value("https://i.imgur.com/h2zY7Ky.jpg"))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].price").value(100000));
	}

	@Test
	void testGetAllProducts() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/product/all/{number}", "0")
				.header("Authorization", jwts)
				.accept(MediaType.APPLICATION_JSON))
		        .andDo(print())
		        .andExpect(status().isOk())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(5))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].image").value("https://i.imgur.com/h2zY7Ky.jpg"))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].price").value(100000));
	}
}
