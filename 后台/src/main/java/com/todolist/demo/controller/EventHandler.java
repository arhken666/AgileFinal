package com.todolist.demo.controller;
import java.util.*;
import com.todolist.demo.entity.Todoevent;
import com.todolist.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventHandler {
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/findAll")//使用GetMapping进行RESTful风格的事件查询
    public List<Todoevent> findAll(){
        return eventRepository.findAll();
    }

    @PostMapping("/save")//使用PostMapping进行RESTful风格的事件保存
    public String save(@RequestBody Todoevent todoevent){
        Todoevent result = eventRepository.save(todoevent);
        if(result != null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/delete/{id}")//使用DeleteMapping进行RESTful风格的事件删除
    public void del(@PathVariable("id") Integer id){
        eventRepository.deleteById(id);
    }

    @PutMapping ("/update/{id}")//使用PutMapping进行RESTful风格的状态修改
    public String update(@PathVariable("id") Integer id){
        Todoevent todoevent = eventRepository.findById(id).get();
        System.out.println(todoevent);
        todoevent.setComplete(todoevent.getComplete() == 1 ? 0 : 1);
        Todoevent result = eventRepository.save(todoevent);
        if(result != null){
            return "success";
        }else{
            return "error";
        }
    }
}
