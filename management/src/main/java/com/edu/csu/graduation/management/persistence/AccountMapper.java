package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Account;
import com.edu.csu.graduation.management.entity.Person;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AccountMapper {
    Account  getAccountByAccount(@Param("accountid") String accountid, @Param("password") String password);
    boolean updatePassword(@Param("password") String password,@Param("accountid") String accountid);
    List<Account> getColleagues(@Param("accountid") String accountid);
    boolean updateAccount(Account account);
    String getUsername(@Param("accountid")String accountid);
    List<Person> getPerson(@Param("start")Integer start,@Param("end")Integer end);
    Integer getPersonCount();
    boolean deletePersonAccount(@Param("accountid")String accountid);
    boolean deletePersonProfile(@Param("accountid")String accountid);
    boolean updateRole(@Param("accountid")String accountid);
    boolean addAccount(Account account);
    boolean addProfile(Account account);
}
