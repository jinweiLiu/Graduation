package com.edu.csu.graduation.management.entity;

import lombok.Data;

@Data
public class Waste {
    private String id;
    private float weigh;
    private String date;
    private String variety;
    private String source;
    private String state;
}
