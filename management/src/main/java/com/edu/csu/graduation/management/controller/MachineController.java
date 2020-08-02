package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.MachineService;
import com.edu.csu.graduation.management.entity.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class MachineController {
    @Autowired
    private MachineService machineService;

    @RequestMapping("/machine")
    public String getMachine(Model model){
        model.addAttribute("total",machineService.getCount());
        model.addAttribute("running",machineService.getCountByState("运行中"));
        model.addAttribute("waiting",machineService.getCountByState("待机中"));
        model.addAttribute("breaking",machineService.getCountByState("故障中"));
        return "machine";
    }

    @RequestMapping("/machineList")
    @ResponseBody
    public Map<String,Object> getMachineTable(Integer draw, Integer start, Integer length,String state){
        return machineService.getList(draw,start,length,state);
    }

    @RequestMapping("/deleteMachine")
    @ResponseBody
    public void deleteMachine(@RequestParam("id") String id){
        //System.out.println(id);
        machineService.deleteMachine(id);
        machineService.deleteDetail(id);
        //return "machine";
    }

    @RequestMapping("/machine/id")
    @ResponseBody
    public Machine getMachine(@RequestParam("id") String id){
        return machineService.getMachineById(id);
    }

    @RequestMapping("addMachine")
    @ResponseBody
    public void addMachine(String id,String place,String date){
        Machine ma = machineService.getMachineById(id);
        if(ma==null){
            Machine machine = new Machine();
            machine.setId(id);
            machine.setDate(date);
            machine.setLocation(place);
            machine.setState("待机中");
            machine.setBag(1);
            machine.setWater(50);
            machineService.addMachine(machine);
            machineService.addDetail(machine);
        }
        //可以返回成功与否的信息
    }
}
