/*var table = $("#all_data").DataTable({
    "serverSide": true,
    "bSort": false,
    "pageLength": 4,
    "bLengthChange":false,
    "bAutoWidth":true,
    "searching":false,
    "ajax":{
        url:'/wasteList/search',
        type:'post',
        data:function(d) {
            var param = {};
            param.draw = d.draw;
            param.start = d.start;
            param.length = d.length;
            param.startTime = $("#start_time").val();
            param.endTime = $("#end_time").val();
            param.variety = $("#variety").val(),
            param.source = $("#source").val();
            return param;
        }
    },
    "columns":[
        {data:"id",title:"标识"},
        {data:"source",title:"来源科室"},
        {data:"weigh",title:"重量(单位kg)"},
        {data:"date",title:"时间"},
        {data:"variety",title:"种类"},
        {data:"state",title:"状态"}
    ],
    language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    }
});
$("#search").click(function() {
    table.ajax.reload();
})

function out() {
    $.ajax({
        url:"/logOut",
        type:"post",
        success:function() {
            console.log("test")
            window.location.reload();
        }
    })
}*/

function display(e){
    $.ajax({
        url:"/count/day",
        type:"post",
        data:{
            time:e
        },
        success:function(result) {
            document.getElementById("text-total").innerText = result[0]+" kg";
            document.getElementById("text-first").innerText = result[1]+" kg";
            document.getElementById("text-second").innerText = result[2]+" kg";
            document.getElementById("text-third").innerText = result[3]+" kg";
            document.getElementById("text-in").innerText = result[4]+" kg";
            document.getElementById("text-out").innerText = result[5]+" kg";
        }
    })
}

function chartSet(dataA,dataB,dataC,e){
    $.ajax({
        async: false,
        type:"GET",
        url:"/source/data",
        data:{
            time:e
        },
        success:function (results) {
            for (var item in results) {
                var all = results[item].value.split(",");
                dataA.push(all[0]);
                dataB.push(all[1])
                dataC.push(all[2]);
            }
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    });
}
var multipleBarChart = document.getElementById('multipleBarChart').getContext('2d'),
    pieChart = document.getElementById('pieChart').getContext('2d');
var dataA = [], dataB = [], dataC = [];
chartSet(dataA,dataB,dataC,"day");
var chartData = {
    labels: ["内科", "外科", "儿科", "妇产科", "男科", "传染病科", "皮肤病科", "精神科", "中医科", "肿瘤科", "骨科", "麻醉科"],
    datasets : [{
        label: "感染性废物",
        backgroundColor: '#59d05d',
        borderColor: '#59d05d',
        data: dataA,
    },{
        label: "损伤性废物",
        backgroundColor: '#fdaf4b',
        borderColor: '#fdaf4b',
        data: dataB,
    }, {
        label: "输液塑料瓶",
        backgroundColor: '#177dff',
        borderColor: '#177dff',
        data: dataC,
    }],
};
var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position : 'bottom'
    },
    tooltips: {
        mode: 'index',
        intersect: false
    },
    responsive: true,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
};
var myMultipleBarChart = new Chart(multipleBarChart, {
    type: 'bar',
    data: chartData,
    options: chartOptions
});

$("#select-time").on("change",function() {
    var select = $("#select-time").val();
    var A = [], B = [], C = [];
    chartSet(A,B,C,select);
    myMultipleBarChart.destroy();
    var newChartData = {
        labels: ["内科", "外科", "儿科", "妇产科", "男科", "传染病科", "皮肤病科", "精神科", "中医科", "肿瘤科", "骨科", "麻醉科"],
        datasets : [{
            label: "感染性废物",
            backgroundColor: '#59d05d',
            borderColor: '#59d05d',
            data: A,
        },{
            label: "损伤性废物",
            backgroundColor: '#fdaf4b',
            borderColor: '#fdaf4b',
            data: B,
        }, {
            label: "输液塑料瓶",
            backgroundColor: '#177dff',
            borderColor: '#177dff',
            data: C,
        }],
    };
    myMultipleBarChart = new Chart(multipleBarChart, {
        type: 'bar',
        data: newChartData,
        options: chartOptions
    });
})

var pieData = [],pieLabel = [],pieColor = [];
$.ajax({
    async: false,
    type:"GET",
    url:"/workload",
    data:{
        time:"month"
    },
    success:function (results) {
        for (var item in results) {
            pieData.push(results[item].workload);
            pieLabel.push(results[item].handle)
            pieColor.push("#"+Math.random().toString(16).slice(2,8));
        }
    },
    error:function()
    {
        alert("获取数据出错!");
    },
})

var myPieChart = new Chart(pieChart, {
    type: 'pie',
    data: {
        datasets: [{
            data: pieData,
            backgroundColor :pieColor,
            borderWidth: 0
        }],
        labels: pieLabel,
    },
    options : {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position : 'bottom',
            labels : {
                fontColor: 'rgb(154, 154, 154)',
                fontSize: 11,
                usePointStyle : true,
                padding: 20
            }
        },
        pieceLabel: {
            render: 'percentage',
            fontColor: 'white',
            fontSize: 14,
        },
        tooltips: false,
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    }
})

$(document).ready(function(){
    display("day");
});