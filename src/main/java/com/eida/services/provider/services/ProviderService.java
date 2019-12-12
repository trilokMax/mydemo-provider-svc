package com.eida.services.provider.services;

import org.springframework.security.jwt.Jwt;

public interface ProviderService {
	public Jwt parseJwt(String jwtString);
}
