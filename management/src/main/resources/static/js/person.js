var table = $("#person-table").DataTable({
    "serverSide": true,
    "bSort": false,
    "bLengthChange": false,
    "pageLength": 5,
    "bAutoWidth":true,
    "searching":false,
    "ajax":{
        url:'/personList',
        type:'post',
    },
    "columns":[
        {data:"accountid",title:"账号"},
        {data:"username",title:"用户姓名"},
        {data:"usergender",title:"性别"},
        {data:"role",title:"用户角色"},
        {
            data: "accountid",
            title:"操作",
            defaultContent: "",
            width: "10%",
            //js 中文传值问题
            render: function (data, type, row, meta) {
                return data ='<div class="form-button-action">'+
                    '<button type="button" class="btn btn-link btn-sm" onclick="updateRole(\''+data+'\')">'+
                    '<i class="fa fa-link"></i>'+
                    '升级</button>'+
                    "<button type='button' class='btn btn-link btn-danger btn-sm' onclick='deletePerson(\"" + data + "\")'>"+
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

function updateRole(e){
    $.ajax({
        url:"/updateRole",
        type:"post",
        data:{id:e},
        success:function (result) {
            if(result == true){
                layer.msg("升级成功",{time:1000})
                table.ajax.reload();
            }
        }
    })
}

function deletePerson(e) {
    swal({
        title: '是否要移除该用户?',
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
                url:"/deletePerson",
                type:"post",
                async: false,
                data:{'id':e},
                success:function (result) {
                    console.log(result);
                    table.ajax.reload();
                }
            })
            swal("成功删除用户"+e, {
                icon: "success",
                buttons : {
                    confirm : {
                        text:'关闭',
                        className: 'btn btn-success'
                    }
                }
            });
        }else{
            swal.close();
        }
    })
}

$("#addRowButton").click(function() {
    var newName = $("#addName").val();
    var newRole = $("#addRole").val();
    var newGender = $("#addGender").val();

    if(!isnull(newName)&&!isnull(newRole)&&!isnull(newGender)){
        $.ajax({
            type:"post",
            url:"/addPerson",
            async: false,
            data:{
                name:newName,
                gender:newGender,
                role:newRole,
            },
            success:function(result) {
                if(result == 'error'){
                    console.log("错误");
                }else {
                    swal("创建成功", "账号为："+result+"\n密码为：123456\n请妥善保管", {
                        buttons: {
                            confirm: {
                                className : 'btn btn-success'
                            }
                        },
                    });
                    table.ajax.reload();
                }
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