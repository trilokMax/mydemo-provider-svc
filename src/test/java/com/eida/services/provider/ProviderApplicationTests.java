package com.eida.services.provider;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(properties = {"spring.cloud.consul.config.enabled=false", "spring.cloud.consul.enabled=false"})
public class ProviderApplicationTests {

	@Test
	public void contextLoads() {
	}

	static {
		System.setProperty("keycloak.auth.server.url", "http://localhost:9080");
	}
}
