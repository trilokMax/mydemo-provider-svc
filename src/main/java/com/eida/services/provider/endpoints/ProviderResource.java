package com.eida.services.provider.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eida.services.provider.services.ProviderService;

@RestController
public class ProviderResource {
	
	@Autowired
	protected ProviderService providerService;
	
	@GetMapping(value = "/provider/token")
    @ResponseBody
    public Jwt getToken(@RequestHeader("Authorization") String token) {
		return providerService.parseJwt(token.replaceAll("(?i)Bearer ", ""));
	}
	
}
