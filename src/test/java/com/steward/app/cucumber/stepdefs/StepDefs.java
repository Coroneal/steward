package com.steward.app.cucumber.stepdefs;

import com.steward.app.StewardApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = StewardApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
