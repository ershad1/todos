package com.example.demo.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
    @Autowired
    private TodoService todoService;

    @PostMapping("/todoSave")
    public Todo save(@RequestBody Todo todo) {
        return todoService.save(todo);
    }


}
