package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Waste;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface WasteMapper {
    List<Waste> getWasteListByState(Map<String,Object> map);
    Integer getCount(String state);
    List<Map<String,Object>> getRecentlyTotal(@Param("state") String state);
    List<Waste> getWasteListByKeyword(Map<String,Object> map);
    Integer getFilteredCount(String keyword);
    //List<Waste> getWasteList(Map<String,Object> map);
    List<Waste> getMulFiltered(Map<String,Object> map);
    Integer getMulFilteredCount(Map<String,Object> map);
    Double getToday(@Param("variety") String variety,@Param("state") String state,@Param("time") String time);
    List<Map<String,Object>> getSourceData(@Param("variety") String variety,@Param("time") String time);
    List<Map<String,Object>> getThreeTotal();
    List<Waste> getReadyList(@Param("start") Integer start,@Param("end") Integer end,@Param("count") Integer count);
    Integer getReadyListCount(@Param("count") Integer count);
    boolean updateState(@Param("id") String id);
}
