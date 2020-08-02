var table = $("#all_data").DataTable({
    "serverSide": true,
    "bSort": false,
    "pageLength": 6,
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
        {data:"state",title:"状态"},
        {
            data: "id",
            title:"操作",
            defaultContent: "",
            width: "10%",
            render: function (data, type, row, meta) {
                return data = '<button class="btn btn-link btn-sm" onclick="track('+ data +')"><span class="btn-label"><i class="fa fa-link"></i></span>追溯</button>';
            }
        }
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


