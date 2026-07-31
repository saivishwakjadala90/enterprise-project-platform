package com.company.project_platform.controller;

import com.company.project_platform.entity.Project;
import com.company.project_platform.repository.ProjectRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.company.project_platform.service.ActivityLogService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ActivityLogService activityLogService;

    public ProjectController(ProjectRepository projectRepository,
                             ActivityLogService activityLogService) {

        this.projectRepository = projectRepository;
        this.activityLogService = activityLogService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Project createProject(@RequestBody Project project) {

        Project savedProject = projectRepository.save(project);

        activityLogService.createActivity(
                "PROJECT",
                "Created project: " + savedProject.getProjectName()
        );

        return savedProject;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
        return projectRepository.findById(id).map(project -> {
            project.setProjectName(updatedProject.getProjectName());
            project.setDescription(updatedProject.getDescription());
            project.setStatus(updatedProject.getStatus());
            project.setPriority(updatedProject.getPriority());
            project.setOwnerEmail(updatedProject.getOwnerEmail());
            project.setStartDate(updatedProject.getStartDate());
            project.setEndDate(updatedProject.getEndDate());
            Project savedProject = projectRepository.save(project);

            activityLogService.createActivity(
                    "PROJECT",
                    "Updated project: " + savedProject.getProjectName()
            );

            return savedProject;
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteProject(@PathVariable Long id) {
        projectRepository.findById(id).ifPresent(project ->
                activityLogService.createActivity(
                        "PROJECT",
                        "Deleted project: " + project.getProjectName()
                )
        );

        projectRepository.deleteById(id);

        return "Project deleted successfully";
    }
}