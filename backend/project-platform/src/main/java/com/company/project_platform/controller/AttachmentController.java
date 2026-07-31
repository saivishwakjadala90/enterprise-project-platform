package com.company.project_platform.controller;

import com.company.project_platform.entity.Attachment;
import com.company.project_platform.service.AttachmentService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/attachments")
@CrossOrigin(origins = "*")
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @PostMapping("/upload/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public Attachment uploadFile(
            @PathVariable Long taskId,
            @RequestParam("file") MultipartFile file,
            @RequestParam String uploadedBy
    ) throws IOException {

        return attachmentService.uploadFile(
                taskId,
                file,
                uploadedBy
        );
    }

    @GetMapping("/task/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<Attachment> getAttachments(
            @PathVariable Long taskId
    ) {

        return attachmentService.getAttachments(taskId);
    }

    @GetMapping("/download/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id
    ) throws IOException {

        Resource resource =
                attachmentService.downloadFile(id);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                resource.getFilename() + "\""
                )
                .body(resource);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public String deleteAttachment(
            @PathVariable Long id
    ) throws IOException {

        attachmentService.deleteAttachment(id);

        return "Attachment deleted successfully.";
    }
}