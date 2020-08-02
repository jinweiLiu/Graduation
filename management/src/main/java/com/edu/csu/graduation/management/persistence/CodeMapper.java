package com.edu.csu.graduation.management.persistence;

import com.edu.csu.graduation.management.entity.Code;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CodeMapper {
    List<Code> getAllCode(@Param("start")Integer start,@Param("end") Integer end);
    Integer getCodeCount();
    boolean createCode(Code code);
    boolean deleteCode(@Param("id")String id);
}
