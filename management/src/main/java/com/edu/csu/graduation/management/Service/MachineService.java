package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Machine;
import com.edu.csu.graduation.management.persistence.MachineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MachineService {
    @Autowired
    private MachineMapper machineMapper;

    public Map<String,Object> getList(Integer draw,Integer start,Integer length,String state){
        Map<String,Object> map = new HashMap<>();
        map.put("start", start);
        map.put("end", length);
        Map<String, Object> result = new HashMap<>();
        if(state==null||state=="") {
            List<Machine> list = machineMapper.getMachineList(map);
            int total = machineMapper.getCount();
            result.put("data", list);
            result.put("recordsTotal", total);
            result.put("draw", draw);
            result.put("recordsFiltered", total);
        }else{
            map.put("state",state);
            List<Machine> list = machineMapper.getMachineListByState(map);
            int total = machineMapper.getCount();
            int filteredCount = machineMapper.getCountByState(state);
            result.put("data", list);
            result.put("recordsTotal", total);
            result.put("draw", draw);
            result.put("recordsFiltered", filteredCount);
        }
        return  result;
    }

    public Integer getCountByState(String state){
        return machineMapper.getCountByState(state);
    }

    public Integer getCount(){
        return machineMapper.getCount();
    }

    public boolean deleteMachine(String id){
        return machineMapper.deleteMachine(id);
    }

    public boolean deleteDetail(String id){
        return machineMapper.deleteDetail(id);
    }

    public Machine getMachineById(String id){
        return machineMapper.getMachineById(id);
    }

    public boolean addMachine(Machine machine){
        return machineMapper.addMachine(machine);
    }

    public boolean addDetail(Machine machine){
        return machineMapper.addDetail(machine);
    }
}
