package com.company.project_platform.service;

import com.company.project_platform.entity.Comment;
import com.company.project_platform.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment addComment(Comment comment) {

        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public List<Comment> getComments(Long taskId) {

        return commentRepository.findByTaskId(taskId);
    }

    public void deleteComment(Long id) {

        commentRepository.deleteById(id);
    }
}