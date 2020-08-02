package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Machine;

import java.util.List;
import java.util.Map;

public interface MachineMapper {
    List<Machine> getMachineList(Map<String,Object> map);
    Integer getCount();
    List<Machine> getMachineListByState(Map<String,Object> map);
    Integer getCountByState(String state);
    boolean deleteMachine(String id);
    boolean deleteDetail(String id);
    Machine getMachineById(String id);
    boolean addMachine(Machine machine);
    boolean addDetail(Machine machine);
}
