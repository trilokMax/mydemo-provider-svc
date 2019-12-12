package com.eida.services.provider.services.impl;

import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.stereotype.Service;

import com.eida.services.provider.services.ProviderService;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Override
	public Jwt parseJwt(String jwtString) {
		return JwtHelper.decode(jwtString);
	}

}
