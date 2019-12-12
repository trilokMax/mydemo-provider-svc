package com.eida.services.provider.service.impl;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import com.eida.services.provider.services.impl.ProviderServiceImpl;

@RunWith(SpringRunner.class)
public class ProviderServiceImplTest {

	String  header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

	ProviderServiceImpl providerService;
	
	@Before
	public void init() {
		providerService = new ProviderServiceImpl();
	}
	
	@Test
	public void testParseJwt() {
		String claims = "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}";
		assertEquals(providerService.parseJwt(header).getClaims(), claims);
	}

}
