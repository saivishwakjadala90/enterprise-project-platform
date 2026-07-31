package com.company.project_platform.service;

import com.company.project_platform.entity.Attachment;
import com.company.project_platform.repository.AttachmentRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;

    private final Path uploadPath =
            Paths.get("uploads");

    public AttachmentService(AttachmentRepository attachmentRepository)
            throws IOException {

        this.attachmentRepository = attachmentRepository;

        Files.createDirectories(uploadPath);
    }

    public Attachment uploadFile(Long taskId,
                                 MultipartFile file,
                                 String uploadedBy)
            throws IOException {

        String uniqueFileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path filePath =
                uploadPath.resolve(uniqueFileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        Attachment attachment = new Attachment();

        attachment.setTaskId(taskId);
        attachment.setFileName(file.getOriginalFilename());
        attachment.setFileType(file.getContentType());
        attachment.setFilePath(filePath.toString());
        attachment.setUploadedBy(uploadedBy);
        attachment.setUploadedAt(LocalDateTime.now());

        return attachmentRepository.save(attachment);
    }

    public List<Attachment> getAttachments(Long taskId) {
        return attachmentRepository.findByTaskId(taskId);
    }

    public Resource downloadFile(Long id)
            throws IOException {

        Attachment attachment =
                attachmentRepository.findById(id)
                        .orElseThrow();

        Path path =
                Paths.get(attachment.getFilePath());

        return new UrlResource(path.toUri());
    }

    public void deleteAttachment(Long id)
            throws IOException {

        Attachment attachment =
                attachmentRepository.findById(id)
                        .orElseThrow();

        Files.deleteIfExists(
                Paths.get(attachment.getFilePath())
        );

        attachmentRepository.delete(attachment);
    }
}