// 从地址栏中获取文章id
var postId = getUrlParams("id");
// 向服务器端发送请求 根据文章id 获取文章详细信息
$.ajax({
    type: "get",
    url: "/posts/" + postId,
    success: function(res) {
        var html = template("postTpl", res);
        $("#article").html(html);
    }
});

// 当点赞按钮发生点击事件时
$("#article").on("click", "#like", function() {
    // 向服务器端发送请求 执行点赞操作
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + postId,
        success: function() {
            alert("点赞成功，感谢您的支持！");
        }
    })
});

// 获取网站的配置信息
$.ajax({
    type: "get",
    url: "/settings",
    success: function(res) {
        // 判断管理员是否开启了评论功能
        if (res.comment) {
            // 管理员开启了评论功能 渲染评论模板
            var html = template("commentTpl");
            // 渲染评论模板
            $("#comment").html(html);
        }
    }
});

// 当评论表单发生提交行为的时候
$("#comment").on("submit", "form", function() {
    // 获取用户输入的评论内容
    var content = $(this).find("textarea").val();
    var author = JSON.parse(localStorage.getItem("user"))._id;
    // 向服务器端发送请求 执行添加评论操作
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            content: content,
            post: postId,
            author: author
        },
        success: function() {
            alert("评论成功");
            location.reload();
        },
        error: function() {
            alert("评论失败");
        }
    });
    // 组织表单默认提交行为
    return false;
})