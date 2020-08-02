$(function() {
    $(".nav-pills li").each(function() {
        var index = $(this).index();            // 初始化
        $(".nav-pills li a").eq(0).addClass("active");
        $(this).click(function() {                // 点击某个元素时，给这个元素添加active类，其余兄弟元素的active类都取消
            $(this).find("a").addClass("active");
            $(this).siblings().find("a").removeClass("active");
            $(".card-table>div").eq(index).stop(true).show().siblings().stop(true).hide();
        })
    });
});

/*function out() {
    $.ajax({
        url:"/logOut",
        type:"post",
        success:function() {
            console.log("test")
            window.location.reload();
        }
    })
}*/

$(document).ready(function () {
    $("#in_basic").DataTable({
        "lengthChange" : false,
        "searching" : false,
        "serverSide": true,
        "bInfo": false,
        "bSort": false,
        "pageLength": 5,
        "bAutoWidth":false,
        "ajax":{
            url:'/wasteList/In',
            type:'post',
        },
        "columns":[
            {data:"id"},
            {data:"source"},
            {data:"weigh"},
            {data:"date"},
            {data:"variety"}
        ],
        language: {
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
        }
    });
    $("#out_basic").DataTable({
        "lengthChange" : false,
        "searching" : false,
        "serverSide": true,
        "bInfo": false,
        "bSort": false,
        "pageLength": 5,
        "bAutoWidth":false,
        "ajax":{
            url:'/wasteList/Out',
            type:'post',
        },
        "columns":[
            {data:"id",title:"标识"},
            {data:"source",title:"来源科室"},
            {data:"weigh",title:"重量(单位kg)"},
            {data:"date",title:"时间"},
            {data:"variety",title:"种类"}

        ],
        language: {
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
        }
    });
});


var lineChart = document.getElementById('lineChart').getContext('2d'),
    barChart = document.getElementById('barChart').getContext('2d'),
    doughnutChart = document.getElementById('doughnutChart').getContext('2d');

var line_labels = [], line_result = [],
    pie_labels = [], pie_result = [],
    three_labels = [], three_result = [];

function getChartData(A,B,request_url) {
    $.ajax({
        async: false,
        type:"GET",
        url:request_url,
        success:function (results) {
            for (var item in results) {
                A.push(results[item].formatdate.substr(5,9));
                B.push(results[item].total);
            }
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    })
}

getChartData(line_labels,line_result,"/lineData");
var myLineChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: line_labels,
        datasets: [{
            label: "收集量",
            borderColor: "#1d7af3",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#1d7af3",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            backgroundColor: 'transparent',
            fill: true,
            borderWidth: 2,
            data: line_result,
        }]
    },
    options : {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels : {
                padding: 10,
                fontColor: '#1d7af3',
            }
        },
        tooltips: {
            bodySpacing: 4,
            mode:"nearest",
            intersect: 0,
            position:"nearest",
            xPadding:10,
            yPadding:10,
            caretPadding:10
        },
        layout:{
            padding:{left:15,right:15,top:15,bottom:15}
        }
    }
});

getChartData(pie_labels,pie_result,"/pieData");
var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: pie_labels,
        datasets : [{
            label: "出库量",
            backgroundColor: 'rgb(23, 125, 255)',
            borderColor: 'rgb(23, 125, 255)',
            data: pie_result,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
    }
});

$.ajax({
    async: false,
    type:"GET",
    url:"/threeData",
    success:function (results) {
        for (var item in results) {
            three_labels.push(results[item].variety);
            three_result.push(results[item].total);
        }
    },
    error:function()
    {
        alert("获取数据出错!");
    },
});

var myDoughnutChart = new Chart(doughnutChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: three_result,
            backgroundColor: ['#f3545d','#fdaf4b','#1d7af3']
        }],

        labels: three_labels
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend : {
            position: 'bottom'
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    }
});