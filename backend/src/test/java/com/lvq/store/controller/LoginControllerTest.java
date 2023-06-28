package com.lvq.store.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void testGetToken() throws Exception {
		// Testing authentication with correct credentials
		this.mockMvc.perform(post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"username\":\"usertest\", \"password\":\"usertest\"}"))
					.andDo(print())
					.andExpect(status().isOk());
		
		// Testing authentication with wrong credentials
		this.mockMvc.perform(post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"username\":\"usertest\", \"password\":\"wrongpwd\"}"))
					.andDo(print())
					.andExpect(status().is4xxClientError());
	}

}








