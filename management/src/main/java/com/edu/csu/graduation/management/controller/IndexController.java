package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.WasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class IndexController {

    @Autowired
    private WasteService wasteService;

    @RequestMapping("/index")
    public String getIndex(){
        return "index";
    }

    @RequestMapping("/")
    public String getLogin(){
        return "login";
    }

    @RequestMapping("/lineData")
    @ResponseBody
    public List<Map<String,Object>> getLineRecent(){
        return wasteService.getRecentlyTotal("");
    }

    @RequestMapping("/pieData")
    @ResponseBody
    public List<Map<String,Object>> getPieRecent(){
        return wasteService.getRecentlyTotal("O");
    }

    @RequestMapping("/threeData")
    @ResponseBody
    public List<Map<String,Object>> getRecentThree(){
        return wasteService.getThreeTotal();
    }

    @RequestMapping("/wasteList/In")
    @ResponseBody
    public Map<String,Object> getList(Integer draw, Integer start, Integer length, String keyword){
        return wasteService.getList(draw,start,length,"I",keyword);
    }

    @RequestMapping("/wasteList/Out")
    @ResponseBody
    public Map<String,Object> getListOut(Integer draw,Integer start,Integer length){
        return wasteService.getList(draw,start,length,"O","");
    }

}
