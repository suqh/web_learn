// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function(res) {
        var html = template("postsTpl", res);
        $("#postsBox").html(html);
        var pageHtml = template("pageTpl", res);
        $("#page").html(pageHtml);
    }
});

// 分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function(res) {
            var html = template("postsTpl", res);
            $("#postsBox").html(html);
            var pageHtml = template("pageTpl", res);
            $("#page").html(pageHtml);
        }
    });
}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(res) {
        var html = template("categoryTpl", { data: res });
        $("#categoryBox").html(html);
    }
});

// 当用户进行文章列表筛选的时候
$("#filterForm").on("submit", function() {
    // 获取到管理员选择的过滤条件
    var formateData = $(this).serialize();
    // 向服务器端发送请求 根据添加索要文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: formateData,
        success: function(res) {
            var html = template("postsTpl", res);
            $("#postsBox").html(html);
            var pageHtml = template("pageTpl", res);
            $("#page").html(pageHtml);
        }
    });
    // 组织表单默认提交行为
    return false;
});

// 当删除按钮被点击的时候
$("#postsBox").on("click", ".delete", function() {
    // 弹出删除确认框 和 管理员确认是否真的要进行删除操作
    if (confirm("您真的要进行删除操作吗?")) {
        // 获取到管理员要删除的文章的id
        var id = $(this).attr("data-id");
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function() {
                location.reload();
            }
        })
    }
});

// 发布评论功能
var pId;
$("#postsBox").on("click", ".sendCom", function() {
    // 1、显示对话框
    $("#myModal").modal("show");
    // 获取当前点击行的文章id
    pId = $(this).data("id");
    console.log(pId);

});

$(".sendBtn").on("click", function() {
    // 第二个参数 获取文本框中的数据
    var content = $("#message-text").val();
    console.log(content);
    // 第三个参数 
    var author = JSON.parse(localStorage.getItem("user"))._id;
    console.log(author);

    /*
        1、获取三个参数
        author content post
        2、发送ajax请求并且传入三个参数
        3、成功后==实现页面跳转至评论页面
    */

    $.ajax({
        url: "/comments",
        type: "post",
        data: {
            author: author,
            content: content,
            post: pId
        },
        success: function() {
            location.href = "comments.html";
        }
    })
})