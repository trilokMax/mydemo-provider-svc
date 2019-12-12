package com.eida.services.provider;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer.AuthorizedUrl;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer.ExpressionInterceptUrlRegistry;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.test.util.ReflectionTestUtils;
@RunWith(MockitoJUnitRunner.class)
public class ResourceServerConfigTest {
	
	private ResourceServerConfig resourceServerConfig = new ResourceServerConfig();
	
	@Mock
	ResourceServerTokenServices mockTokenServices;
	
	@Mock
    HttpSecurity mockHttpSecurity;
	
	@Mock
	ExpressionInterceptUrlRegistry mockExpressionInterceptUrlRegistry; 
	
	@Mock
	AuthorizedUrl mockAuthorizedUrl;
	
	@Mock
	EndpointRequest mockEndpointRequest;
	
	@Mock
	PathRequest mockPathRequest;
	   
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}
	
    @Test
    public void configureResourceTest_Success() throws Exception {

		ResourceServerSecurityConfigurer configurer = new ResourceServerSecurityConfigurer();
		ResourceServerSecurityConfigurer mockResourceServerSecurityConfigurer = mock(ResourceServerSecurityConfigurer.class);
		
		when(mockResourceServerSecurityConfigurer.resourceId(anyString())).thenReturn(mockResourceServerSecurityConfigurer);
		when(mockResourceServerSecurityConfigurer.tokenServices(mockTokenServices)).thenReturn(mockResourceServerSecurityConfigurer);
		
		ReflectionTestUtils.setField(resourceServerConfig, "resourceIds", "oauth2-resource");
		ReflectionTestUtils.setField(resourceServerConfig, "tokenServices", mockTokenServices);
		
    	resourceServerConfig.configure(mockResourceServerSecurityConfigurer);
    	verify(mockResourceServerSecurityConfigurer).resourceId("oauth2-resource");
    	verify(mockResourceServerSecurityConfigurer).tokenServices(mockTokenServices);
    }
    
    @Test
    public void configureResourceTest_Negative() throws Exception {

		ResourceServerSecurityConfigurer configurer = new ResourceServerSecurityConfigurer();
		ResourceServerSecurityConfigurer mockResourceServerSecurityConfigurer = mock(ResourceServerSecurityConfigurer.class);
		
    	try {
			resourceServerConfig.configure(mockResourceServerSecurityConfigurer);
		} catch (Exception e) {
			verify(mockResourceServerSecurityConfigurer).resourceId(null);
		}
    
    }
	
    @Test
	public void configureHttpSecurity_Success() throws Exception {
		
    	when(mockHttpSecurity.authorizeRequests()).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	when(mockExpressionInterceptUrlRegistry.requestMatchers(any())).thenReturn(mockAuthorizedUrl);
    	
    	when(mockAuthorizedUrl.permitAll()).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	when(mockAuthorizedUrl.hasRole("ACTUATOR")).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	when(mockAuthorizedUrl.permitAll()).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	when(mockExpressionInterceptUrlRegistry.antMatchers("/index.html", "/assets/images/**", "**/*.css", "/*ui", "/*")).thenReturn(mockAuthorizedUrl);
    	
    	when(mockAuthorizedUrl.permitAll()).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	when(mockExpressionInterceptUrlRegistry.antMatchers("/provider/**")).thenReturn(mockAuthorizedUrl);
    	
    	when(mockAuthorizedUrl.authenticated()).thenReturn(mockExpressionInterceptUrlRegistry);
    	
    	resourceServerConfig.configure(mockHttpSecurity);
    	
    	verify(mockHttpSecurity).authorizeRequests();
	}
	
    
	
}