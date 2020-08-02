package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Message;
import com.edu.csu.graduation.management.entity.Pagination;
import com.edu.csu.graduation.management.persistence.AccountMapper;
import com.edu.csu.graduation.management.persistence.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private AccountMapper accountMapper;

    public List<Message> getUnReadMessageList(String receive){
        return messageMapper.getAllMessage("0",receive);
        //0 表示未读 1表示已读 2表示删除
    }

    public Pagination getMessagePages(int page,int size,String receive){
        Pagination pagination = new Pagination();
        int totalMessage = messageMapper.getMessageCount("",receive);
        int totalPage;
        if(totalMessage/size == 0){
            totalPage = 1;
        }else{
            totalPage = totalMessage / size + 1;
        }
        if (page < 1) {
            page = 1;
        }
        if (page > totalPage) {
            page = totalPage;
        }
        pagination.setPagination(totalPage,page);
        int offset = page < 1 ? 0 : size * (page - 1);
        List<Message> list = messageMapper.getAllMessage("0",receive);
        List<Message> Readed = messageMapper.getAllMessage("1",receive);
        list.addAll(Readed);
        for(Message message:list){
            if(message.getState().equals("0")){
                message.setState("未读");
            }else{
                message.setState("已读");
            }
            if(message.getType().equals("0")){
                message.setType("提醒");
                message.setContent("编号为"+message.getId()+"废物"+message.getContent());
            }else if(message.getType().equals("1")){
                message.setType("消息");
            }else if(message.getType().equals("2")){
                message.setType("公告");
            }
            if(message.getSend()!="system"){
                message.setSend(accountMapper.getUsername(message.getSend()));
            }
        }
        if(size>list.size()-offset){
            size = list.size()-offset;
        }
        List<Message> messageList = list.subList(offset,offset+size);
        pagination.setData(messageList);
        return pagination;
    }

    public Pagination getColleaguePages(int page,int size,String id){
        Pagination pagination = new Pagination();
        int totalColleague = accountMapper.getColleagues(id).size();
        int totalPage;
        if(totalColleague/size == 0){
            totalPage = 1;
        }else{
            totalPage = totalColleague / size + 1;
        }
        if (page < 1) {
            page = 1;
        }
        if (page > totalPage) {
            page = totalPage;
        }
        pagination.setPagination(totalPage,page);
        int offset = page < 1 ? 0 : size * (page - 1);
        List<Account> list = accountMapper.getColleagues(id);
        if(size>list.size()-offset){
            size = list.size()-offset;
        }
        List<Account> colleagueList = list.subList(offset,offset+size);
        pagination.setData(colleagueList);
        return pagination;
    }

    public boolean updateMessageState(String id){
        return messageMapper.updateMessageState(id);
    }

    public boolean deleteMessage(String id){
        return messageMapper.deleteMessage(id);
    }

    public boolean addMessage(Message message,String receive){
        return messageMapper.addMessage(message)&&messageMapper.addLetter(receive,message.getId());
    }
}
