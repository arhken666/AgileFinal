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

    @Test
    void save(){
        Todoevent todoevent = new Todoevent();
        todoevent.setName("Spring Boot");
        todoevent.setComplete(0);
        Todoevent to1 = eventRepository.save(todoevent);
        System.out.println(to1);
    }
    @Test
    void findById(){
        Todoevent todoevent = eventRepository.findById(6).get();
        System.out.println(todoevent);
    }
    
    @Test
    void update(){
        Todoevent todoevent = eventRepository.findById(2).get();
        todoevent.setName("测试修改");
        eventRepository.save(todoevent);
    }
    @Test
    void deleteById(){
        eventRepository.deleteById(1);
    }
}