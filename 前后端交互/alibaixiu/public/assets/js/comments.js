// 向服务器端发送请求  获取评论列表数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function(res) {
        var html = template("commentsTpl", res);
        console.log(res);
        $("#commentsBox").html(html);
        var pageHtml = template("pageTpl", res);
        console.log(pageHtml);
        $("#pageBox").html(pageHtml);
    }
});

// 实现分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: { page: page },
        success: function(res) {
            var html = template("commentsTpl", res);
            console.log(res);
            $("#commentsBox").html(html);
            var pageHtml = template("pageTpl", res);
            console.log(pageHtml);
            $("#pageBox").html(pageHtml);
        }
    });
}

// 当审核按钮被点击的时候
$("#commentsBox").on("click", ".status", function() {
    // 获取当前评论的状态
    var state = $(this).attr("data-state");
    // 获取当前要修改的评论id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: { state: state == 0 ? 1 : 0 },
        success: function() {
            location.reload();
        }
    })
});

// 当删除按钮被点击时
$("#commentsBox").on("click", ".delete", function() {
    if (confirm("您真的要执行删除操作吗?")) {
        // 获取当前要删除的评论id
        var id = $(this).attr("data-id");
        // 向服务器端发送请求 执行删除操作
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function() {
                location.reload();
            }
        })
    }
})