package com.edu.csu.graduation.management.entity;

import lombok.Data;

@Data
public class Message{
    private String id;
    private String date;
    private String title;
    private String content;
    private String state;
    private String type;
    private String send;
}
