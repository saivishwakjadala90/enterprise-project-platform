package com.company.project_platform.controller;

import com.company.project_platform.dto.KanbanTaskDTO;
import com.company.project_platform.service.KanbanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kanban")
@CrossOrigin("*")
public class KanbanController {

    private final KanbanService kanbanService;

    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }

    @GetMapping("/{projectId}")
    public List<KanbanTaskDTO> getBoard(
            @PathVariable Long projectId) {

        return kanbanService.getBoard(projectId);
    }
}