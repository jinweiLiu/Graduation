package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.MessageService;
import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Message;
import com.edu.csu.graduation.management.entity.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping("/message")
    public String getMessage(@RequestParam(name = "page", defaultValue = "1") Integer page,
                             @RequestParam(name = "size", defaultValue = "6") Integer size,Model model,HttpSession session){
        if(session.getAttribute("account")!=null){
            String id = ((Account)session.getAttribute("account")).getAccountid();
            Pagination colleagues = messageService.getColleaguePages(page,size,id);
            model.addAttribute("colleagues",colleagues);
            model.addAttribute("selfId",id);
            Pagination messages = messageService.getMessagePages(page,size,id);
            model.addAttribute("pagination",messages);
            return "message";
        }else{
            model.addAttribute("msg","请先登录");
            return "login";
        }
    }

    @RequestMapping("/colleague")
    public String getTest(@RequestParam(name = "page", defaultValue = "1") Integer page,
                          @RequestParam(name = "size", defaultValue = "6") Integer size,Model model,HttpSession session){
        String id = ((Account)session.getAttribute("account")).getAccountid();
        Pagination colleagues = messageService.getColleaguePages(page,size,id);
        model.addAttribute("colleagues",colleagues);
        model.addAttribute("selfId",id);
        return "message::colleagues";
    }

    @RequestMapping("/message/update")
    @ResponseBody
    public boolean updateMessageState(String messageId, String messageState, HttpSession session){
        if(messageState.equals("已读")){
            return false;
        }else{
            boolean flag = messageService.updateMessageState(messageId);
            String total = session.getAttribute("total").toString();
            if(total!=null&&Integer.parseInt(total)>0){
                session.setAttribute("total",Integer.parseInt(session.getAttribute("total").toString())-1);
                List<Message> messages = messageService.getUnReadMessageList(((Account)session.getAttribute("account")).getAccountid());
                if(messages.size()>3){
                    messages = messages.subList(0,3);
                }
                session.setAttribute("messages",messages);
            }
            return flag;
        }
    }

    @RequestMapping("/message/delete")
    @ResponseBody
    public boolean deleteMessage(String messageId){
        return messageService.deleteMessage(messageId);
    }
    //此处还需要更改，删除未读也要更新total

    @RequestMapping("/edit")
    public String getEdit(){
        return "edit";
    }

    @RequestMapping("/sendMsg")
    @ResponseBody
    public boolean addMsg(String send,String receive,String title,String text){
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setTitle(title);
        message.setContent(text);
        message.setType("1");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        message.setDate(df.format(new Date()));
        message.setSend(send);
        message.setState("0");
        return messageService.addMessage(message,receive);
    }
}
