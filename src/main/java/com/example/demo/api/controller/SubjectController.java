package com.example.demo.api.controller;

import com.example.demo.api.dto.SubjectDto;
import com.example.demo.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService service;

    // GET /api/subjects — вернуть весь список
    @GetMapping
    public List<SubjectDto> getAll() {
        return service.findAll();
    }

    // POST /api/subjects — добавить новый Subject
    @PostMapping
    public ResponseEntity<SubjectDto> create(@RequestBody SubjectDto subject) {
        SubjectDto saved = service.create(subject);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
    @DeleteMapping("/{name}")
    public ResponseEntity<Void> delete(@PathVariable String name) {
        service.deleteByName(name);
        return ResponseEntity.noContent().build();
    }
}