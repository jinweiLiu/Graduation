package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Machine;
import com.edu.csu.graduation.management.entity.Waste;
import com.edu.csu.graduation.management.persistence.WasteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WasteService {
    @Autowired
    private WasteMapper wasteMapper;

    /*public Map<String,Object> getWasteList(Integer draw,Integer start,Integer length){
        Map<String,Object> map = new HashMap<>();
        map.put("start", start);
        map.put("end", length);
        Map<String, Object> result = new HashMap<>();
        List<Waste> list = wasteMapper.getWasteList(map);
        int total = wasteMapper.getCount("I") + wasteMapper.getCount("O");
        result.put("data",list);
        result.put("recordsTotal",total);
        result.put("draw",draw);
        result.put("recordsFiltered",total);
        return result;
    }

    /*public Integer getCount(String state){
        return wasteMapper.getCount(state);
    }*/

    //根据状态获取列表
    public Map<String,Object> getList(Integer draw,Integer start,Integer length,String state,String keyword){
        Map<String,Object> map = new HashMap<>();
        map.put("state",state);
        map.put("start", start);
        map.put("end", length);
        Map<String, Object> result = new HashMap<>();
        if(keyword == ""||keyword == null){
            List<Waste> list = wasteMapper.getWasteListByState(map);
            int total = wasteMapper.getCount(state);
            result.put("data",list);
            result.put("recordsTotal",total);
            result.put("draw",draw);
            result.put("recordsFiltered",total);
        }else{
            map.put("keyword","%"+keyword+"%");
            List<Waste> list = wasteMapper.getWasteListByKeyword(map);
            int filteredCount = wasteMapper.getFilteredCount("%"+keyword+"%");
            result.put("data",list);
            int total = wasteMapper.getCount(state);
            result.put("recordsTotal",total);
            result.put("draw",draw);
            result.put("recordsFiltered",filteredCount);
        }

        return result;
    }

    //近七天数据
    public List<Map<String,Object>> getRecentlyTotal(String state){
        List<Map<String,Object>> list = wasteMapper.getRecentlyTotal(state);
        int length = list.size();
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        List<Map<String,Object>> new_list = new ArrayList<>();
        if(length==7){
            return list;
        }else{
            for(int i=0;i<7;i++){
                    Map<String,Object> new_map = new HashMap<>();
                    new_map.put("formatdate",df.format(date.getTime()-(6-i)*24*60*60*1000));
                    new_map.put("total",0);
                    new_list.add(new_map);
            }
            for(Map<String,Object> map:list){
                try{
                    long index = (date.getTime()-df.parse((String)map.get("formatdate")).getTime())/(24*60*60*1000);
                    if((6-(int)index)>0){
                        new_list.set((6-(int)index),map);
                    }
                }catch (ParseException e){
                    e.printStackTrace();
                }
            }
            return new_list;
        }
    }

    //废物查询
    public Map<String,Object> getMulFiltered(Integer draw, Integer start, Integer length,String startTime,String endTime,String variety,String source){
        Map<String,Object> map = new HashMap<>();
        map.put("start", start);
        map.put("end", length);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        map.put("variety",variety);
        map.put("source",source);
        List<Waste> list = wasteMapper.getMulFiltered(map);
        for(Waste w :list){
            if(w.getState().equals("I")){
                w.setState("未运出");
            }else if(w.getState().equals("O")){
                w.setState("已运出");
            }
        }
        Map<String, Object> result = new HashMap<>();
        int total = wasteMapper.getCount("I") + wasteMapper.getCount("O");
        result.put("data",list);
        result.put("recordsTotal",total);
        result.put("draw",draw);
        result.put("recordsFiltered",wasteMapper.getMulFilteredCount(map));
        return result;
    }

    public Double getToday(String variety,String state,String time){  //获取（今日、本周、本月）收集量
        return wasteMapper.getToday(variety,state,time)==null ? 0 :wasteMapper.getToday(variety,state,time);
    }

    public List<Map<String,Object>> getSourceData(String variety,String time){  //科室收集直方图
        List<Map<String,Object>> list = wasteMapper.getSourceData(variety,time);
        List<Map<String,Object>> result = new ArrayList<>();
        int length = list.size();
        String []labels = {"内科", "外科", "儿科", "妇产科", "男科", "传染病科", "皮肤病科", "精神科", "中医科", "肿瘤科", "骨科", "麻醉科"};
        if(length == 12){
            return list;
        }else{
            for(int i=0;i<12;++i){
                Map<String,Object> item = new HashMap<>();
                item.put("source",labels[i]);
                boolean flag = true;
                for(Map<String,Object> map:list){
                    if(map.get("source").equals(labels[i])){
                        item.put("value",map.get("value"));
                        flag = false;
                    }
                }
                if(flag) item.put("value",0);
                result.add(item);
            }
            return result;
        }
    }

    public List<Map<String,Object>> getThreeTotal(){
        return wasteMapper.getThreeTotal();
    }

    public Map<String,Object> getReadyList(Integer draw, Integer start, Integer length, Integer count){
        Map<String, Object> result = new HashMap<>();
        List<Waste> list = wasteMapper.getReadyList(start,length,count);
        int total = wasteMapper.getReadyListCount(count);
        result.put("data",list);
        result.put("recordsTotal",total);
        result.put("draw",draw);
        result.put("recordsFiltered",total);
        return result;
    }

    public boolean updateState(String id){
        return wasteMapper.updateState(id);
    }
}
