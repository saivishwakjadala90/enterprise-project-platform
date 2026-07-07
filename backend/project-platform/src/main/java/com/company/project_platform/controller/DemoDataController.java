package com.company.project_platform.controller;

import com.company.project_platform.service.DemoDataService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demo")
public class DemoDataController {

    private final DemoDataService demoDataService;

    public DemoDataController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @PostMapping("/generate")
    public String generateDemoData() {
        return demoDataService.generateDemoData();
    }
}