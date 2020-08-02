package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Track;
import com.edu.csu.graduation.management.persistence.AccountMapper;
import com.edu.csu.graduation.management.persistence.TrackMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class TrackService {
    @Autowired
    private TrackMapper trackMapper;

    @Autowired
    private AccountMapper accountMapper;

    public List<Track> getTrackById(String id){
        return trackMapper.getTrackById(id);
    }

    public List<Map<String,Object>> getWorkload(String time){
        List<Map<String,Object>> list = trackMapper.getWorkload(time);
        for(Map<String,Object> map : list){
            String name = accountMapper.getUsername(map.get("handle").toString());
            map.put("handle",name);
        }
        return list;
    }

    public boolean addTrack(String id,String user,String place){
        Track track = new Track();
        track.setId(id);
        track.setHandle(user);
        track.setPlace(place);
        track.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        return trackMapper.addTrack(track);
    }
}
