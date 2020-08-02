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

function saveLoad() {
    var url = "/InfoContent";
    $("#InfoContent").load(url);
}

function saveChange() {
    $.ajax({
        url:"/updateProfile",
        type:"post",
        data:{
            name:$("#name").val(),
            email:$("#email").val(),
            birth:$("#datepicker").val(),
            gender:$("#gender").val(),
            phone:$("#phone").val(),
            address:$("#address").val()
        },
        success:function(result) {
            if(result==true){
                layer.msg("修改成功");
            }
        }
    })
}

function reload() {
    var url = "/PasswordContent";
    $("#PasswordContent").load(url);
}

$('#confirmPassword').on('input propertychange',function(){
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();
    if(newPassword!=confirmPassword){
        $("#new_warn").text("两次输入不一致");
    }else{
        $("#new_warn").text("");
    }
})

$('#newPassword').on('input propertychange',function(){
    var newPassword = $("#newPassword").val();
    var oldPassword = $("#oldPassword").val();
    if(newPassword==oldPassword){
        $("#old_warn").text("新密码不能和原密码一致");
    }else{
        $("#old_warn").text("");
    }
})

function submit() {
    var oldPwd = $("#oldPassword").val(),
        newPwd = $("#newPassword").val(),
        confirmPwd = $("#confirmPassword").val();
    if(newPwd==confirmPwd){
        $.ajax({
            url:"/updatePassword",
            ty1:"POST",
            data:{
                oldPwd:oldPwd,
                newPwd:newPwd,
            },
            success:function(result) {
                if(result == true){
                    reload();
                    layer.msg("修改成功");
                }else{
                    layer.msg("原密码输入错误")
                }
            }
        })
    }

}

/*function out() {
    $.ajax({
        url:"/logOut",
        type:"post",
        success:function() {
            window.location.reload();
        }
    })
}*/