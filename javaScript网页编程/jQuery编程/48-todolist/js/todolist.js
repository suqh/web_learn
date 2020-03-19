$(function() {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式 var todolist = [{titile: "xxx",done:false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您的待办事项");
            } else {
                // 先读取本地存储原来的数据
                var local = getData();
                // 把 local 数组进行更新数据 把最新的数据追加给 local 数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组 local 存储给本地存储
                saveData(local);
                // 2. todolist 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    // 3. todolist 删除操作
    $("ol,ul").on("click", "a", function() {
        // alert(11);
        // (1) 先获取本地存储
        var data = getData();

        // (2) 修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        // (3) 保存到本地存储
        saveData(data);
        // (4) 重新渲染页面
        load();
    });
    // 4. todolist 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
        // alert(11);
        // (1) 先获取本地存储
        var data = getData();
        // (2) 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // (3) 保存到本地存储
        saveData(data);
        // (4) 重新渲染页面
        load();
    });

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 读取本地存储的数据
        var data = getData();
        // 遍历之前要先清空ol里面的元素内容
        $("ol,ul").empty();
        // 遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})