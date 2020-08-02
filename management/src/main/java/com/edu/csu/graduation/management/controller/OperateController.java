package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.TrackService;
import com.edu.csu.graduation.management.Service.WasteService;
import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class OperateController {

    @Autowired
    private WasteService wasteService;

    @Autowired
    private TrackService trackService;

    @RequestMapping("/operate")
    public String getOperation(){
        return "operation";
    }

    @RequestMapping("/tracking/id")
    @ResponseBody
    public List<Track> getTrackbyId(@RequestParam("id") String id){
        List<Track> list = trackService.getTrackById(id);
        return list;
    }

    @RequestMapping("/workload")
    @ResponseBody
    public List<Map<String,Object>> getWorkload(String time){
        return trackService.getWorkload(time);
    }

    @RequestMapping("/wasteList/readyIn")
    @ResponseBody
    public Map<String, Object> getReadyIn(Integer draw, Integer start, Integer length){
        return wasteService.getReadyList(draw,start,length,1);
    }

    @RequestMapping("/wasteList/readyOut")
    @ResponseBody
    public Map<String, Object> getReadyOut(Integer draw, Integer start, Integer length){
        return wasteService.getReadyList(draw,start,length,2);
    }

    @RequestMapping("/confirmIn")
    @ResponseBody
    public boolean confirmIn(String id, HttpSession session){
        String user = ((Account)session.getAttribute("account")).getAccountid();
        if(user.equals("")||user==null){
            return false;
        }else{
            return trackService.addTrack(id,user,"暂存地");
        }
    }

    @RequestMapping("/confirmOut")
    @ResponseBody
    public boolean confirmOut(String id, HttpSession session){
        String user = ((Account)session.getAttribute("account")).getAccountid();
        if(user.equals("")||user==null){
            return false;
        }else{
            return trackService.addTrack(id,user,"装车运出") && wasteService.updateState(id);
        }
    }

}
