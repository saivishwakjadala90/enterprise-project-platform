package com.company.project_platform.controller;

import com.company.project_platform.entity.Notification;
import com.company.project_platform.repository.NotificationRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Notification createNotification(@RequestBody Notification notification) {

        notification.setCreatedAt(LocalDateTime.now());

        if (notification.getStatus() == null) {
            notification.setStatus("UNREAD");
        }

        return notificationRepository.save(notification);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    @GetMapping("/user/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<Notification> getNotificationsByUser(@PathVariable String email) {
        return notificationRepository.findByUserEmail(email);
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Notification markAsRead(@PathVariable Long id) {

        return notificationRepository.findById(id).map(notification -> {

            notification.setStatus("READ");

            return notificationRepository.save(notification);

        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public String deleteNotification(@PathVariable Long id) {

        notificationRepository.deleteById(id);

        return "Notification deleted successfully";
    }
}