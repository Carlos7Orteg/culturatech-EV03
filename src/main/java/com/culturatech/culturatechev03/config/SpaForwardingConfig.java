/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Carlos Ortegón
 */
package com.culturatech.culturatechev03.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaForwardingConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/events")
                .setViewName("forward:/index.html");

        registry.addViewController("/events/{id}")
                .setViewName("forward:/index.html");

        registry.addViewController("/favorites")
                .setViewName("forward:/index.html");

        registry.addViewController("/agenda")
                .setViewName("forward:/index.html");

        registry.addViewController("/notifications")
                .setViewName("forward:/index.html");

        registry.addViewController("/perfil")
                .setViewName("forward:/index.html");

        registry.addViewController("/login")
                .setViewName("forward:/index.html");

        registry.addViewController("/register")
                .setViewName("forward:/index.html");

        registry.addViewController("/admin")
                .setViewName("forward:/index.html");
    }
}
