> ## **站内信接口调用**

---

> ### **请求说明**

---

```JS
//站内信发送方式
url: http://{ip}:{port}/api/notification/sendNotice
method:post
body:{
    "sender":"test",//发送人员：用户人员编号(即登录帐号)
    "source": "system",
    "type":"stationLetter",//发送类型：stationLetter：站内信
    "receivers":["用户1","用户2"], //接收方，填写接收用户编号(即登录帐号)
    "createTime": "1578472895079", //消息创建时间(0时区时间对应的时间戳，不填默认为notification接收消息的时间)
    "content":{
        "encoding":"UTF-8",
        "text":"<a href='https://baidu.com'>测试</a>",
        "voice": false, //是否为语音消息， true or false
        "type": "html" //站内信消息内容类型，text 纯文本、html 超文本标记语言
    }
}
```

---

> ### **示例**

---

在按钮交互事件脚本中调用，发送待办通知；

```JS
//发送待办信息给用户
function sendMsg(){
    var sendInfo = "您有一条设备检修工单待处理，工单编号为：{workOrderNo}，请前往处理！";
    sendInfo = sendInfo.replace(/{workOrderNo}/, workOrderNo);
    var htmlInfo = "<a href='/#/application-runtime/Page_61089c31bee449759c975aa3b1e913b2'>立即处理>></a>";
    sendInfo = sendInfo.concat(htmlInfo);

    scriptUtil.request('/api/notification/sendNotice',{
        method: 'POST',
        headers: {
            'X-Namespace': 'liye_fdms'
        },
        body: {
            "sender":"test",
            "source": "system",
            "type":"stationLetter",
            "receivers":["repair001"],
            "content":{
                "encoding":"UTF-8",
                "title":"待处理设备检修工单",
                "text":sendInfo,
                "voice": false, //是否为语音消息， true or false
                "type": "html" //站内信消息内容类型，text 纯文本、html 超文本标记语言
            }
        }
    }).then(function(res){
        console.log("result",res);
        if(res.code != "200"){
            scriptUtil.showMessage(res.getMessage(),'error');
        }
    });
}
```
