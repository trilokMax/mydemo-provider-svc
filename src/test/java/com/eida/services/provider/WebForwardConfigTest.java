package com.eida.services.provider;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.servlet.config.annotation.ResourceChainRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@RunWith(MockitoJUnitRunner.class)
public class WebForwardConfigTest {

	private WebForwardConfig config = new WebForwardConfig();

	@Mock
	ResourceHandlerRegistry registry;

	@Mock
	ResourceHandlerRegistration registration;

	@Mock
	ResourceChainRegistration chain;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testAddResourceHandlers() {

		when(registry.addResourceHandler(anyString())).thenReturn(registration);
		when(registration.addResourceLocations(anyString())).thenReturn(registration);
		when(registration.resourceChain(true)).thenReturn(chain);

		config.addResourceHandlers(registry);

		Mockito.verify(registry).addResourceHandler("/**/*");
		Mockito.verify(registration).addResourceLocations("classpath:/static/");
		Mockito.verify(registration).resourceChain(true);

	}
}
