package com.company.project_platform.controller;

import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.company.project_platform.service.ActivityLogService;
import com.company.project_platform.service.EmailService;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final ActivityLogService activityLogService;
    private final EmailService emailService;

    public TaskController(TaskRepository taskRepository,
                          ActivityLogService activityLogService,
                          EmailService emailService) {

        this.taskRepository = taskRepository;
        this.activityLogService = activityLogService;
        this.emailService = emailService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Task createTask(@RequestBody Task task) {

        Task savedTask = taskRepository.save(task);

        activityLogService.createActivity(
                "TASK",
                "Created task: " + savedTask.getTaskName()
        );

        try {

            System.out.println("========== EMAIL DEBUG ==========");
            System.out.println("Assigned To: " + savedTask.getAssignedTo());

            emailService.sendEmail(
                    savedTask.getAssignedTo(),
                    "New Task Assigned - Enterprise Project Platform",
                    """
                    Hello,
        
                    You have been assigned a new task.
        
                    Task Name: %s
        
                    Description: %s
        
                    Priority: %s
        
                    Status: %s
        
                    Due Date: %s
        
                    Regards,
                    Enterprise Project Platform
                    """.formatted(
                            savedTask.getTaskName(),
                            savedTask.getDescription(),
                            savedTask.getPriority(),
                            savedTask.getStatus(),
                            savedTask.getDueDate()
                    )
            );

            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {

            System.out.println("EMAIL FAILED");
            e.printStackTrace();
        }

        return savedTask;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTaskName(updatedTask.getTaskName());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setPriority(updatedTask.getPriority());
            task.setAssignedTo(updatedTask.getAssignedTo());
            task.setProjectId(updatedTask.getProjectId());
            task.setDueDate(updatedTask.getDueDate());
            Task savedTask = taskRepository.save(task);

            activityLogService.createActivity(
                    "TASK",
                    "Updated task: " + savedTask.getTaskName()
            );
            emailService.sendEmail(
                    savedTask.getAssignedTo(),
                    "Task Updated - Enterprise Project Platform",
                    """
                    Hello,
            
                    A task assigned to you has been updated.
            
                    Task Name: %s
            
                    Description: %s
            
                    Priority: %s
            
                    Status: %s
            
                    Due Date: %s
            
                    Regards,
                    Enterprise Project Platform
                    """.formatted(
                            savedTask.getTaskName(),
                            savedTask.getDescription(),
                            savedTask.getPriority(),
                            savedTask.getStatus(),
                            savedTask.getDueDate()
                    )
            );

            return savedTask;
        }).orElse(null);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Task updateTaskStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return taskRepository.findById(id).map(task -> {

            task.setStatus(status);

            Task updatedTask = taskRepository.save(task);

            activityLogService.createActivity(
                    "TASK",
                    "Moved task '" + updatedTask.getTaskName() + "' to " + status
            );

            return updatedTask;

        }).orElse(null);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTask(@PathVariable Long id) {
        taskRepository.findById(id).ifPresent(task ->
                activityLogService.createActivity(
                        "TASK",
                        "Deleted task: " + task.getTaskName()
                )
        );

        taskRepository.deleteById(id);

        return "Task deleted successfully";
    }
}