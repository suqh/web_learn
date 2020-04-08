// 获取地址栏中的categoryId参数
var categoryId = getUrlParams("categoryId");
// 根据分类id获取文章分类列表
$.ajax({
    type: "get",
    url: "/posts/category/" + categoryId,
    success: function(res) {
        var html = template("listTpl", { data: res });
        $("#listBox").html(html);
    }
});

// 根据分类id 获取分类信息
$.ajax({
    type: "get",
    url: "/categories/" + categoryId,
    success: function(res) {
        $("#categoryTitle").html(res.title);
    }
})