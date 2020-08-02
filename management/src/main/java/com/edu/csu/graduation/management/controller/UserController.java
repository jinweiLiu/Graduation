package com.edu.csu.graduation.management.controller;

import com.edu.csu.graduation.management.Service.AccountService;
import com.edu.csu.graduation.management.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Random;

@Controller
public class UserController {

    @Autowired
    private AccountService accountService;

    @RequestMapping("/user")
    public String getUser(HttpSession session, Model model){
        Account account = (Account)session.getAttribute("account");
        if(account != null){
            model.addAttribute("detail",account);
            return "user";
        }
        return "login";
    }

    @RequestMapping("/person")
    public String getPerson(HttpSession session, Model model){
        Account account = (Account)session.getAttribute("account");
        if(account != null){
            return "person";
        }
        return "login";
    }

    @RequestMapping("/PasswordContent") //thymeleaf局部刷新的实现
    public String getPwdContent(){
        return "user::PasswordContent";
    }

    @RequestMapping("/InfoContent") //thymeleaf局部刷新的实现
    public String getInfoContent(){
        return "user::InfoContent";
    }

    @RequestMapping(value = "/updatePassword")
    @ResponseBody
    public boolean updatePassword(String oldPwd,String newPwd, HttpSession session){
        Account account = (Account)session.getAttribute("account");
        if(account!=null && oldPwd.equals(account.getPassword())){
            return accountService.updatePassword(newPwd,account.getAccountid());
        }else {
            return false;
        }
    }

    @RequestMapping(value = "/updateProfile")
    @ResponseBody
    public boolean updateProfile(String name,String email,String birth,String gender,String phone,String address, HttpSession session){
        Account account = (Account)session.getAttribute("account");
        if(account!=null){
            Account a = new Account();
            a.setAccountid(account.getAccountid());
            a.setPassword(account.getPassword());
            a.setUseraddress(address);
            a.setUserbirth(birth);
            a.setUseremail(email);
            a.setUsergender(gender);
            a.setUsername(name);
            a.setUserphone(phone);
            return accountService.updateAccount(a);
        }else{
            return false;
        }
    }

    @RequestMapping("/personList")
    @ResponseBody
    public Map<String,Object> getPersonTable(Integer draw, Integer start, Integer length){
        return accountService.getPerson(draw,start,length);
    }

    @RequestMapping("/updateRole")
    @ResponseBody
    public boolean updateRole(String id){
        return accountService.updateRole(id);
    }

    @RequestMapping("/deletePerson")
    @ResponseBody
    public boolean deletePerson(String id){
        return accountService.deletePerson(id);
    }

    @RequestMapping("/addPerson")
    @ResponseBody
    public String addPerson(String name,String gender,String role){
        String id = String.valueOf(new Random().nextInt(999999));
        while(accountService.getUsername(id)!=null){
            id = String.valueOf(new Random().nextInt(999999));
        }
        if(accountService.addUser(id,name,gender,role)){
            return id;
        }else {
            return "error";
        }
    }

}
