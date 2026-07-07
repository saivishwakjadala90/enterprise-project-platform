package com.company.project_platform.service;

import com.company.project_platform.entity.Project;
import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DemoDataService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DemoDataService(ProjectRepository projectRepository,
                           TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public String generateDemoData() {

        Project project1 = new Project();
        project1.setProjectName("Enterprise AI Delivery OS");
        project1.setDescription("AI-powered delivery management platform");
        project1.setStatus("IN_PROGRESS");
        project1.setPriority("HIGH");
        project1.setOwnerEmail("admin@test.com");
        projectRepository.save(project1);

        Project project2 = new Project();
        project2.setProjectName("Client Reporting Dashboard");
        project2.setDescription("Executive reporting and analytics dashboard");
        project2.setStatus("COMPLETED");
        project2.setPriority("MEDIUM");
        project2.setOwnerEmail("admin@test.com");
        projectRepository.save(project2);

        Project project3 = new Project();
        project3.setProjectName("Cloud Deployment Automation");
        project3.setDescription("Docker and cloud deployment automation");
        project3.setStatus("BLOCKED");
        project3.setPriority("HIGH");
        project3.setOwnerEmail("admin@test.com");
        projectRepository.save(project3);

        createTask("Build AI Copilot UI", "COMPLETED", "HIGH", "admin@test.com", project1.getId(), 5);
        createTask("Connect AI backend API", "COMPLETED", "HIGH", "admin@test.com", project1.getId(), 4);
        createTask("Improve AI risk analysis", "IN_PROGRESS", "HIGH", "admin@test.com", project1.getId(), 3);

        createTask("Create reporting charts", "COMPLETED", "MEDIUM", "admin@test.com", project2.getId(), 2);
        createTask("Validate dashboard KPIs", "COMPLETED", "MEDIUM", "admin@test.com", project2.getId(), 1);

        createTask("Fix Docker backend networking", "BLOCKED", "HIGH", "admin@test.com", project3.getId(), 2);
        createTask("Prepare cloud deployment pipeline", "IN_PROGRESS", "HIGH", "admin@test.com", project3.getId(), 6);
        createTask("Configure production database", "TODO", "MEDIUM", "admin@test.com", project3.getId(), 7);

        return "Demo data generated successfully";
    }

    private void createTask(String taskName,
                            String status,
                            String priority,
                            String assignedTo,
                            Long projectId,
                            int dueInDays) {

        Task task = new Task();
        task.setTaskName(taskName);
        task.setDescription(taskName + " demo task");
        task.setStatus(status);
        task.setPriority(priority);
        task.setAssignedTo(assignedTo);
        task.setProjectId(projectId);
        task.setDueDate(LocalDate.now().plusDays(dueInDays));

        taskRepository.save(task);
    }
}