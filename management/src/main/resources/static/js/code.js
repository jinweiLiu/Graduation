var table = $("#codeTable").DataTable({
    "serverSide": true,
    "bSort": false,
    "pageLength": 4,
    "bLengthChange":false,
    "bAutoWidth":true,
    "searching":false,
    "ajax":{
        url:'/codeList',
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
        {data:"source",title:"关联科室"},
        {data:"person",title:"经办人"},
        {
            data: "id",
            title:"操作",
            render: function (data, type, row, meta) {
                return data = "<button type='button' class='btn btn-link btn-danger' onclick='deleteCode(\"" + data + "\")'>删除</button>";
                //js函数传入参数为字符串问题解决思路 转义字符
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

function generate() {
    $("#code").val(uuid());
}

function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function submit() {
    var code = $("#code").val();
    var source = $("#source").val();
    var machineid = $("#machineid").val();
    $.ajax({
        type:"post",
        url:"/newCode",
        data:{
            code:code,
            source:source,
            machineid:machineid,
            name:[[${session.account.accountid}]],
        },
        success:function() {
            table.ajax.reload();
            $("#code").val("");
            $("#source").val("");
            $("#machineid").val("");
        }
    })
}

function deleteCode(e) {
    $.ajax({
        url:'/deleteCode',
        type:'post',
        data:{'id':e},
        success:function(){
            table.ajax.reload();
        }
    });
}
