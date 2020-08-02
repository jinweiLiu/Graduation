$(function() {
    $(".nav-line li").each(function() {
        var index = $(this).index();            // 初始化
        $(".nav-line li a").eq(0).addClass("active");
        $(this).click(function() {                // 点击某个元素时，给这个元素添加active类，其余兄弟元素的active类都取消
            $(this).find("a").addClass("active");
            $(this).siblings().find("a").removeClass("active");
            $(".card-body>div").eq(index).stop(true).show().siblings().stop(true).hide();
        })
    });
})

function colleagueLoad(e) {
    var url = "/colleague?page="+e;
    $("#colleagues").load(url);
}

function viewInfo(e) {
    var obj = JSON.parse(e);
    if(obj.userimage == ''){
        obj.userimage = '/img/user.jpg';
    }
    var info ='<div class="card card-profile card-secondary">\n' +
        '<div class="card-header">\n' +
         '<div class="profile-picture">\n' +
          '<div class="avatar avatar-xl">\n' +
           '<img src="'+obj.userimage+'" alt="..." class="avatar-img rounded-circle">\n' +
          '</div>\n' +
         '</div>\n' +
        '</div>\n' +
        '<div class="card-body">\n' +
         '<div class="user-profile text-center">\n' +
          '<div class="name">'+obj.username+'</div>\n' +
          '<div class="job">性别：'+obj.usergender+'</div>\n' +
          '<div class="job">邮箱：'+obj.useremail+'</div>\n' +
          '<div class="job">联系电话：'+obj.userphone+'</div>\n' +
         '</div>\n' +
        '</div>\n' +
        '</div>';
    layer.open({
        type: 1,
        area: ['400px', '330px'],
        title:false,
        skin: 'layui-layer-rim',
        closeBtn:1,
        content: info,
    });
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

function MarkRead(id,state) {
        $.ajax({
            type:"post",
            url:"/message/update",
            data:{
                messageId:id,
                messageState:state,
            },
            success:function(result) {
                if(result){
                    window.location.reload();
                }
            }
        })
    }

function Display(e) {
    var display_content = "<div style='padding: 10px'>" +
        "<h4 style='display:block;font-size:16px;text-align:center;'>"+e.title+"</h4>" +
        "<span style='display:block;font-size:16px;text-align:center;'>"+e.date+"</span>" +
        "<p>"+e.content+"</p>" +
        "</div>";
    layer.open({
        type: 1,
        area: ['600px', '360px'],
        title:false,
        skin: 'layui-layer-rim',
        closeBtn:1,
        content: display_content,
        cancel:function() {
            MarkRead(e.id,e.state);
        }
    });
}

function DeleteMessage(id) {
    $.ajax({
        type:"post",
        url:"/message/delete",
        data:{
            messageId:id,
        },
        success:function(result) {
            if(result){
                window.location.reload();
            }
        }
    })
}


function sendMessage(receive,title,content) {
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else {
        var msg = '{"receive":"'+receive+'","title":"'+title+'","content":"'+content+'"}';
        console.log(msg);
        socket.send(msg);
    }
}

function sendMsg(receive,send) {
    //openSocket(send);
    layer.open({
        type: 2,
        area: ['800px', '500px'],
        fixed: false, //不固定
        title:"发消息",
        maxmin: true,
        content: '/edit',
        btn :['提交','取消'],
        btn1:function (index,layero) {
            var body = layer.getChildFrame('body',index);
            var title = body.find("#input_title").val();
            var text = body.find("#input_text").val();
            /*$.ajax({
                url:"/sendMsg",
                type:"post",
                data:{
                    send:send,
                    receive:receive,
                    title:title,
                    text:text
                },
                success:function () {
                    console.log("success")
                    layer.close(index);
                }
            });*/
            sendMessage(receive,title,text);
            layer.close(index);
        },
        btn2:function (index,layero) {
            layer.close(index);//关闭弹出层
        }
    });
}
