package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.CodeService;
import com.edu.csu.graduation.management.Service.TrackService;
import com.edu.csu.graduation.management.entity.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class TrackController {
    @Autowired
    private TrackService trackService;

    @Autowired
    private CodeService codeService;

    @RequestMapping("/tracking")
    public String getTracking(){
        return "tracking";
    }

    @RequestMapping("/code")
    public String getCode(){
        return "code";
    }

    @RequestMapping("/newCode")
    @ResponseBody
    public boolean getNewCode(String code, String source, String machineid, String name){
        if(code.equals("")||source.equals("")){
            return false;
        }else {
            Code c = new Code();
            c.setId(code);
            c.setMachine(machineid);
            c.setSource(source);
            c.setPerson(name);
            return codeService.createCode(c);
        }
    }

    @RequestMapping("/codeList")
    @ResponseBody
    public Map<String,Object> getMachineTable(Integer draw, Integer start, Integer length){
        return codeService.getAllCode(draw,start,length);
    }

    @RequestMapping("/deleteCode")
    @ResponseBody
    public boolean deleteCode(String id){
        return codeService.deleteCode(id);
    }
}
