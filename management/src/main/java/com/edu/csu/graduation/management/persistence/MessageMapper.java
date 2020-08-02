package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Message;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MessageMapper {
    List<Message> getAllMessage(@Param("state") String state,@Param("receive")String receive);
    Integer getMessageCount(@Param("state") String state,@Param("receive")String receive);
    boolean updateMessageState(@Param("id") String id);
    boolean deleteMessage(@Param("id") String id);
    boolean addMessage(Message message);
    boolean addLetter(@Param("receive")String receive,@Param("message") String message);
}
