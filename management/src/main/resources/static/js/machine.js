var table = $("#machine-table").DataTable({
    "serverSide": true,
    "bSort": false,
    "bLengthChange": false,
    "pageLength": 5,
    "bAutoWidth":true,
    "searching":false,
    "ajax":{
        url:'/machineList',
        type:'post',
        data:{
            state:""
        }
    },
    "columns":[
        {data:"id",title:"设备编号"},
        {data:"location",title:"设备位置"},
        {data:"date",title:"交付日期"},
        {data:"state",title:"状态"},
        {
            data: "id",
            title:"操作",
            defaultContent: "",
            width: "10%",
            //js 中文传值问题
            render: function (data, type, row, meta) {
                return data ='<div class="form-button-action">'+
                    '<button type="button" class="btn btn-link" onclick="view(\''+data+'\')">'+
                    '<i class="fa fa-link"></i>'+
                    '详情</button>'+
                    "<button type='button' class='btn btn-link btn-danger' onclick='deleteMachine(\"" + data + "\")'>"+
                    '<i class="fa fa-times"></i>'+
                    '移除</button>'+
                    '</div>';
            }
        }

    ],

    language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "",
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

function change(e) { //DataTable ajax动态传参
    var param = {
        state:e
    };
    table.settings()[0].ajax.data = param;
    table.ajax.reload()
}

function view(e) {
    var content ="<div class=\"card card-pricing\">\n"+
        "<div class=\"card-header\">\n";
    $.ajax({
        type:"post",
        url:"/machine/id",
        data:{id:e},
        success:function (result) {
            content = content + "<h4 class=\"card-title\">设备编号</h4>\n"+
                "<div class=\"card-price\">\n"+
                "<span class=\"price\">"+result.id+"</span>\n"+
                "</div>\n"+
                "</div>\n"+
                "<div class=\"card-body\">\n"+
                "<ul class=\"specification-list\">"+
                "<li>\n"+
                "<span class=\"name-specification\">设备位置</span>\n"+
                "<span class=\"status-specification\">"+result.location+"</span>\n"+
                "</li>"+
                "<li>\n"+
                "<span class=\"name-specification\">设备交付日期</span>\n"+
                "<span class=\"status-specification\">"+result.date+"</span>\n"+
                "</li>"+
                "<li>\n"+
                "<span class=\"name-specification\">设备状态</span>\n"+
                "<span class=\"status-specification\">"+result.state+"</span>\n"+
                "</li>"+
                "<li>\n"+
                "<span class=\"name-specification\">消毒水剩余量</span>\n"+
                "<span class=\"status-specification\">"+result.water+" L</span>\n"+
                "</li>"+
                "<li>\n"+
                "<span class=\"name-specification\">是否安装袋子</span>\n"+
                "<span class=\"status-specification\">"+result.bag+"</span>\n"+
                "</li>";
            content = content + "</ul>\n"+
                "</div>\n"+
                "</div>\n";
            layer.open({
                type: 1,
                area: ['360px', '560px'],
                title:['设备信息','display:block;font-size:16px;text-align:center;'],
                shadeClose: true, //点击遮罩关闭
                skin: 'layui-layer-rim',
                closeBtn: 0,
                scrollbar: false,
                content: content
            });
        },
        error:function()
        {
            alert("获取数据出错!");
        },
    });
}

function deleteMachine(e) {
    swal({
        title: '是否要移除该设备?',
        text: "删除操作不可撤销!",
        type: 'warning',
        buttons:{
            cancel: {
                visible: true,
                text : '取消',
                className: 'btn btn-danger'
            },
            confirm: {
                text : '确定',
                className : 'btn btn-success',
            }
        }
    }).then(function(willDelete){
        if (willDelete) {
            $.ajax({
                url:'/deleteMachine',
                type:'post',
                async: false,
                data:{'id':e},
                success:function(){
                    window.location.reload()
                }
            });
            swal("成功移除一台设备", {
                icon: "success",
                buttons : {
                    confirm : {
                        text:'关闭',
                        className: 'btn btn-success'
                    }
                }
            });
            //table.ajax.reload();
        }else{
            swal.close();
        }
    })
}
$("#addRowButton").click(function() {
    var newId = $("#addName").val();
    var newPlace = $("#addPlace").val();
    var newDate = $("#addDate").val();
    /*if(isnull(newId)){
        $("#addName").css("color","red");
    }
    if(isnull(newPlace)){
        $("#addPlace").css("color","red");
    }
    if(isnull(newDate)){
        $("#addDate").css("color","red");
    }*/
    if(!isnull(newId)&&!isnull(newPlace)&&!isnull(newDate)){
        $.ajax({
            type:"post",
            url:"/addMachine",
            async: false,
            data:{
                id:newId,
                place:newPlace,
                date:newDate
            },
            success:function() {
                window.location.reload();
            }
        });
        $("#addRowModal").modal("hide")
    }
})

function isnull(val) {
    var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
}

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