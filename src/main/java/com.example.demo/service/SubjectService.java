package com.example.demo.service;

import com.example.demo.repository.SubjectRepository;
import com.example.demo.model.Subject;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository repo;

    public List<Subject> findAll() {
        return repo.findAll();
    }

    public Subject create(Subject subject) {
        return repo.save(subject);
    }
}
