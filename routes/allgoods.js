var express = require('express');
var router = express.Router();
var fs = require('fs');

//变主题
router.post("/api/change/theme", (req, res) => { //向数据库添加皮肤数据或者修改皮肤数据
    var params = req.body;
    fs.readFile("./data/theme.json", function (err, data) {//读取json，读出来的是二进制
        if (err) {
            return console.error(err);
        }
        var dataString = data.toString();  //二进制的数据转换为字符串
        var dataJson = JSON.parse(dataString); //字符串转化为json对象
        if(dataJson.theme.length>0){    
            dataJson.theme[0].theme=params.theme    
        }else{
            dataJson.theme.push(params); //将传来的对象push进json文件
        }
        var str = JSON.stringify(dataJson);
        //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile("./data/theme.json", str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log("购物车添加成功");
            res.json(require("../data/theme"));
        });

    })
});
router.get("/api/theme", (req, res) => { //获取皮肤的数据
    res.json(require("../data/theme"));
});
module.exports = router;