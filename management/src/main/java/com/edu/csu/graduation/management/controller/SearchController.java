package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.WasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Controller
public class SearchController {
    @Autowired
    private WasteService wasteService;

    @RequestMapping("/search")
    public String getSearch(){
        return "search";
    }

    @RequestMapping("/count")
    public String getCount(){
        return "count";
    }

    @RequestMapping("/wasteList/search")
    @ResponseBody
    public Map<String,Object> getMulFilteredList(Integer draw, Integer start, Integer length,String startTime,String endTime,String variety,String source){
        return wasteService.getMulFiltered(draw, start, length, startTime, endTime, variety, source);
    }

    @RequestMapping("/count/day")
    @ResponseBody
    public List<Double> getTodayCount(String time){
        List<Double> list = new LinkedList<>();
        list.add(wasteService.getToday("","",time));
        list.add(wasteService.getToday("损伤性废物","",time));
        list.add(wasteService.getToday("感染性废物","",time));
        list.add(wasteService.getToday("输液塑料瓶","",time));
        list.add(wasteService.getToday("","I",time));
        list.add(wasteService.getToday("","O",time));
        return list;
    }

    @RequestMapping("/source/data")
    @ResponseBody
    public List<Map<String,Object>> getSourceData(String time){
        List<Map<String,Object>> listA = wasteService.getSourceData("感染性废物",time);
        List<Map<String,Object>> listB = wasteService.getSourceData("损伤性废物",time);
        List<Map<String,Object>> listC = wasteService.getSourceData("输液塑料瓶",time);
        for(int i=0;i<12;++i){
            StringBuilder temp = new StringBuilder(listA.get(i).get("value")+","+listB.get(i).get("value")+","+listC.get(i).get("value"));
            listA.get(i).put("value",temp);
        }
        return listA;
    }
}
