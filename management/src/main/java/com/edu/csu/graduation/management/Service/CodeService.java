package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Code;
import com.edu.csu.graduation.management.entity.Machine;
import com.edu.csu.graduation.management.persistence.AccountMapper;
import com.edu.csu.graduation.management.persistence.CodeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CodeService {

    @Autowired
    private CodeMapper codeMapper;

    @Autowired
    private AccountMapper accountMapper;

    public boolean createCode(Code code){
        return codeMapper.createCode(code);
    }

    public Map<String,Object> getAllCode(Integer draw,Integer start,Integer length){
        Map<String,Object> map = new HashMap<>();
        List<Code> list = codeMapper.getAllCode(start,start+length);
        for(Code c:list){
            c.setPerson(accountMapper.getUsername(c.getPerson()));
        }
        int total = codeMapper.getCodeCount();
        map.put("data", list);
        map.put("recordsTotal", total);
        map.put("draw", draw);
        map.put("recordsFiltered", total);
        return map;
    }

    public boolean deleteCode(String id){
        return codeMapper.deleteCode(id);
    }
}
