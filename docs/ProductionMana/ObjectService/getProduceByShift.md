> ## **「getProduceByShift」获取每个班组的产量**

---

![getProduceByShift](assets/img/ProductionMana-objectService-getProduceByShift.png "getProduceByShift")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var ArrayList = Java.type("java.util.ArrayList");
var array = new ArrayList();
var instance = {
    propNames: "yyshj_yyshj.",
    objName: 'sourceA',
    timeDiff: 8 * 60 * 60 * 1000,
    timeSecond: 60 * 60 * 1000,
    influxDb: {
        beginTime: "",
        endTime: ""
    }
}
var arr = [{
        description: '粗CTC_M1_M累计流量',
        type: '侧线进',
        tagName: 'FQ_M1_M',
    },
    {
        description: '粗CTC_M2_M累计流量',
        type: '侧线进',
        tagName: 'FQ_M2_M',
    },
    {
        description: 'CTC外售1_M3累计流量 ',
        type: '侧线出',
        tagName: 'FQ_M3_M',
    },
    {
        description: 'CTC外售1_M4累计流量 ',
        type: '侧线出',
        tagName: 'FQ_M4_M',
    }
]

function DateStrUTC(date) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var ms = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return y + "-" + m + "-" + d + "T" + h + ":" + ms + ":" + s + "Z";
}

function SetDateTime() {
    if (shift === '夜班') {
        instance.influxDb.beginTime = new Date(day + ' 00:00:00').getTime();
    } else if (shift === '白班') {
        instance.influxDb.beginTime = new Date(day + ' 08:00:00').getTime();
    } else if (shift === '中班') {
        instance.influxDb.beginTime = new Date(day + ' 16:00:00').getTime();
    }
    instance.influxDb.endTime = instance.influxDb.beginTime;
    instance.influxDb.beginTime = instance.influxDb.beginTime - instance.timeDiff;
}

function getValues(time, info, tag) {
    var param = {
        "propNames": [instance.propNames + info.tagName],
        "time": DateStrUTC(time),
        "strategy": "pre"
    };
    var input = {
        inputs: JSON.stringify(param)
    };
    var rtdbService = ObjectPool.get(instance.objName).executeService('getCertainHistory', input);
    return rtdbService.map;
}
var results = [];
if (day) {
    SetDateTime();
    for (var i = 0; i < arr.length; i++) {
        var beginVal = getValues(instance.influxDb.beginTime, arr[i], 'start');
        var endVal = getValues(instance.influxDb.endTime, arr[i], 'end');
        beginVal = beginVal['/yyshj_yyshj/GeneralService/source/yyshj_yyshj/' + arr[i].tagName];
        endVal = endVal['/yyshj_yyshj/GeneralService/source/yyshj_yyshj/' + arr[i].tagName]
        beginVal = beginVal + new Date().getTime() / 1000 % 100000 * (0.6 + Math.random() * 0.3) || 0;
        endVal = endVal + (new Date().getTime() + 8 * 60 * 1000 * 3.14) / 1000 % 100000 || 0,
            results.push({
                name: arr[i].description,
                type: arr[i].type,
                tagName: arr[i].tagName,
                "preData": beginVal,
                "endData": endVal,
                "confirmValue": Math.floor((endVal - beginVal) * 10000) / 10000,
            })
    }
}
results = {
    list: new ArrayList(results)
};
results
```