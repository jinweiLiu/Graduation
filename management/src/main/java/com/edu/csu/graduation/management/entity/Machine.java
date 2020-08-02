package com.edu.csu.graduation.management.entity;

import lombok.Data;

@Data
public class Machine {
    private String id;
    private String date;
    private String location;
    private String state;
    private float water;
    private int bag;
}
