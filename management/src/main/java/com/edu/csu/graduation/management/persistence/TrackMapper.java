package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Track;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TrackMapper {
    List<Track> getTrackById(String id);
    List<Map<String,Object>> getWorkload(@Param("time") String time);
    boolean addTrack(Track track);
}
