// 获取到浏览器地址栏中的搜索关键字
var key = getUrlParams("key");
// 根据所搜关键字调用搜索接口 获取搜索结果
$.ajax({
    type: "get",
    url: "/posts/search/" + key,
    success: function(res) {
        var html = template("searchTpl", { data: res });
        $("#listBox").html(html);
    }
})