package com.lvq.store.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;



@Component
public class JwtService {
	static final long EXPIRATIONTIME = 86400000; 
	static final String PREFIX = "Bearer";
	// Generate secret key. Only for the demonstration
	// You should read it from the application configuration
	//static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	// Generate signed JWT token
	//@Value("${jwt.secret}")
	private String secret="abcdefghijklmnOPQRSTUVWXYZIsThisStringLongEnough?";
	public String getToken(String username) {
		@SuppressWarnings("deprecation")
		String token = Jwts.builder()
				.setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis()
						+ EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
		return token;
	}
	// Get a token from request Authorization header,
	// verify a token and get user name
	public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (token != null) {
			String user = Jwts.parserBuilder()
					.setSigningKey(secret)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();
			if (user != null) return user;
		}
		System.out.println("jwt service");
		return null;
	}
}