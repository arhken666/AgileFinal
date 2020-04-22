package com.todolist.demo.repository;
import com.todolist.demo.entity.Todoevent;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class EventRepositoryTest {
    @Autowired
    private EventRepository eventRepository;
    @Test
    void findAll(){
        System.out.println(eventRepository.findAll());
    }

    
}