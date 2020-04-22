package com.todolist.demo.repository;

import com.todolist.demo.entity.Todoevent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Todoevent,Integer> {
}
