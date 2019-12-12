package com.eida.services.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;

@EnableResourceServer
@Configuration
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
	
    @Autowired
    private ResourceServerTokenServices tokenServices;

    @Value("${security.jwt.resource-ids:account}")
    private String resourceIds;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId(resourceIds).tokenServices(tokenServices);
    }
 
	@Override
	public void configure(HttpSecurity http) throws Exception {
		
	  	http
        .authorizeRequests()
            .requestMatchers(EndpointRequest.to("status", "info", "health")).permitAll()
            .requestMatchers(EndpointRequest.toAnyEndpoint())
                .hasRole("ACTUATOR")
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .permitAll()
            .antMatchers("/index.html", "/assets/images/**", "**/*.css", "/*ui", "/*")
            	.permitAll()
            .antMatchers("/provider/**")
            	.authenticated();

	}
	
}