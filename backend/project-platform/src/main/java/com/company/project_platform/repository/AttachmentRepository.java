package com.company.project_platform.repository;

import com.company.project_platform.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository
        extends JpaRepository<Attachment, Long> {

    List<Attachment> findByTaskId(Long taskId);
}