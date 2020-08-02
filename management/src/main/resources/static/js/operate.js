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

//$(document).ready(function () {
    var tableIn =$("#inside").DataTable({
        "lengthChange" : false,
        "searching" : false,
        "serverSide": true,
        "bInfo": false,
        "bSort": false,
        "pageLength": 5,
        "bAutoWidth":false,
        "ajax":{
            url:'/wasteList/readyIn',
            type:'post',
            data:function(d) {
                var param = {};
                param.draw = d.draw;
                param.start = d.start;
                param.length = d.length;
                return param;
            }
        },
        "columns":[
            {data:"id",title:"标识"},
            {data:"source",title:"来源科室"},
            {data:"weigh",title:"重量(单位kg)"},
            {data:"date",title:"时间"},
            {data:"variety",title:"种类"},
            {
                data: "id",
                title:"操作",
                defaultContent: "",
                width: "10%",
                render: function (data, type, row, meta) {
                    //return data = '<button class="btn btn-link btn-sm" onclick="test('+ data +')"><span class="btn-label"><i class="fa fa-link"></i></span>详情</button>';
                    return data ='<div class="form-button-action">'+
                        '<button type="button" class="btn btn-link btn-sm" onclick="track(\''+data+'\')">'+
                        '<i class="fa fa-link"></i>'+
                        '跟踪</button>'+
                        "<button type='button' class='btn btn-link btn-success btn-sm' onclick='confirmIn(\"" + data + "\")'>"+
                        '<i class="fa fa-check"></i>'+
                        '入库</button>'+
                        '</div>';
                }
            }
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
    var tableOut = $("#outside").DataTable({
        "lengthChange" : false,
        "searching" : false,
        "serverSide": true,
        "bInfo": false,
        "bSort": false,
        "pageLength": 5,
        "bAutoWidth":false,
        "ajax":{
            url:'/wasteList/readyOut',
            type:'post',
            data:function(d) {
                var param = {};
                param.draw = d.draw;
                param.start = d.start;
                param.length = d.length;
                return param;
            }
        },
        "columns":[
            {data:"id",title:"标识"},
            {data:"source",title:"来源科室"},
            {data:"weigh",title:"重量(单位kg)"},
            {data:"date",title:"时间"},
            {data:"variety",title:"种类"},
            {
                data: "id",
                title:"操作",
                defaultContent: "",
                width: "10%",
                render: function (data, type, row, meta) {
                   // return data = '<button class="btn btn-link btn-sm" onclick="test('+ data +')"><span class="btn-label"><i class="fa fa-link"></i></span>详情</button>';
                    return data ='<div class="form-button-action">'+
                        '<button type="button" class="btn btn-link btn-sm" onclick="track(\''+data+'\')">'+
                        '<i class="fa fa-link"></i>'+
                        '跟踪</button>'+
                        "<button type='button' class='btn btn-link btn-success btn-sm' onclick='confirmOut(\"" + data + "\")'>"+
                        '<i class="fa fa-check"></i>'+
                        '出库</button>'+
                        '</div>';
                }
            }
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
//});

function track(e) {
    var content = "<div><ol class=\"activity-feed\">";
    $.ajax({
        type:"post",
        url:"/tracking/id",
        data:{id:e},
        success:function (results) {
            for (var item in results) {
                content = content + "<li class=\"feed-item feed-item-secondary\">\n"+
                    "<time class=\"date\">"+
                    results[item].date+"</time>\n"+
                    "<span class=\"text\">位置:&nbsp;"+
                    results[item].place+"</span></br>" +
                    "<span class=\"text\">设备或人员:&nbsp;"+
                    results[item].handle+"</span>"+
                    "</li>";
            }
            content = content + "</ol><div>";
            layer.open({
                type: 1,
                area: ['600px', '360px'],
                title:['位置跟踪','display:block;font-size:16px;text-align:center;'],
                shadeClose: true, //点击遮罩关闭
                skin: 'layui-layer-rim',
                closeBtn: 0,
                content: content
            });
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    });
};

function confirmIn(e) {
    $.ajax({
        type:"post",
        url:"/confirmIn",
        data:{id:e},
        success:function (result) {
            if(result == true){
                tableIn.ajax.reload();
            }
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    });
};

function confirmOut(e) {
    $.ajax({
        type:"post",
        url:"/confirmOut",
        data:{id:e},
        success:function (result) {
            if(result == true){
                tableOut.ajax.reload();
            }
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    });
};