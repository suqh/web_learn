// 当管理员选择文件的时候
$("#file").on("change", function() {
    // 用户选择到的文件
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append("image", file);
    // 向服务器端发送请求 实现图片上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            $("#image").val(res[0].image);
        }
    })
});

// 当轮播图表单发生提交行为时
$("#slidesForm").on("submit", function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求  添加轮播图数据
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function() {
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});

// 向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function(res) {
        console.log(res);
        var html = template("slidesTpl", { data: res });
        console.log(html);
        $("#slidesBox").html(html);
    }
});

$("#slidesBox").on("click", ".delete", function() {
    if (confirm("您真的要进行删除操作吗?")) {
        // 获取管理员要删除的轮播图数据id
        var id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function() {
                location.reload();
            }
        })
    }
})