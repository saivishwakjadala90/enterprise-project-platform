package com.company.project_platform.service;

import com.company.project_platform.dto.KanbanTaskDTO;
import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KanbanService {

    private final TaskRepository taskRepository;

    public KanbanService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<KanbanTaskDTO> getBoard(Long projectId) {

        return taskRepository.findAll()
                .stream()
                .filter(task -> projectId.equals(task.getProjectId()))
                .map(task -> new KanbanTaskDTO(
                        task.getId(),
                        task.getTaskName(),      // ✅ Changed
                        task.getPriority(),
                        task.getAssignedTo(),
                        task.getStatus()
                ))
                .toList();
    }

    public Task updateTaskStatus(Long taskId, String status) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        return taskRepository.save(task);

    }
}