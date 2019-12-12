package com.eida.services.provider.endpoints;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.jwt.Jwt;

import com.eida.services.provider.ProviderApplicationTests;
import com.eida.services.provider.services.ProviderService;

public class ProviderResourceTest extends ProviderApplicationTests	{
	
	@Mock
	ProviderService providerService;
	
	protected Jwt mockJwt;
	
	protected String mockClaims = "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}";
	
	String  jwtString = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

	@InjectMocks
	protected ProviderResource providerResource;
	
	@Before
	public void setup() {
		mockJwt = mock(Jwt.class);
		when(mockJwt.getClaims()).thenReturn(mockClaims);
		when(providerService.parseJwt(anyString())).thenReturn(mockJwt);
	}
	
	@Test
	public void testReturnClaims() throws Exception {
		String claims = "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}";
		
		Jwt jwt = providerResource.getToken(jwtString);
		assertEquals(jwt.getClaims(), claims);
	}

}
