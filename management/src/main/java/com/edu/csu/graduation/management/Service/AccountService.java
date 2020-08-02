package com.edu.csu.graduation.management.Service;

import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Person;
import com.edu.csu.graduation.management.persistence.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AccountService {
    @Autowired
    private AccountMapper accountMapper;

    public Account getAccountByAccountId(String accountid,String password){
        return accountMapper.getAccountByAccount(accountid,password);
    }

    public boolean updatePassword(String password,String accountid){
        return accountMapper.updatePassword(password,accountid);
    }

    public List<Account> getColleagues(String id){
        return accountMapper.getColleagues(id);
    }

    public boolean updateAccount(Account account){
        return accountMapper.updateAccount(account);
    }

    public Map<String,Object> getPerson(Integer draw,Integer start,Integer length){
        Map<String,Object> result = new HashMap<>();
        List<Person> list = accountMapper.getPerson(start,length);
        for(Person person:list){
            person.setRole("收集人员");
        }
        int total = accountMapper.getPersonCount();
        result.put("data", list);
        result.put("recordsTotal", total);
        result.put("draw", draw);
        result.put("recordsFiltered", total);
        return result;
    }

    public boolean deletePerson(String id){
        return accountMapper.deletePersonAccount(id) && accountMapper.deletePersonProfile(id);
    }

    public boolean updateRole(String id){
        return accountMapper.updateRole(id);
    }

    public boolean addUser(String id,String name,String gender,String role){
        Account account = new Account();
        account.setAccountid(id);
        account.setPassword("123456");
        account.setUsername(name);
        account.setUsergender(gender);
        account.setRole(role);
        return accountMapper.addAccount(account) && accountMapper.addProfile(account);
    }

    public String getUsername(String id){
        return accountMapper.getUsername(id);
    }
}
