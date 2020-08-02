package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.AccountService;
import com.edu.csu.graduation.management.Service.MessageService;
import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class LoginController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private MessageService messageService;

    @RequestMapping("/loginIn")
    public String getLogin(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session){
        Account account = accountService.getAccountByAccountId(username,password);
        if(account!=null){
            List<Message> messages = messageService.getUnReadMessageList(account.getAccountid());
            int total = messages.size();
            if(messages.size()>3){
                messages = messages.subList(0,3);
            }
            session.setAttribute("account",account);
            session.setAttribute("messages",messages);
            session.setAttribute("total",total);
            return "index";
        }else{
            return "login";
        }
    }
    @RequestMapping("/logOut")
    //@ResponseBody
    public String getLogout(HttpSession session){
        session.setAttribute("account",null);
        return "login";
    }
}
