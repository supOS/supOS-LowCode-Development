> ## **「getTankBalance」罐区计量-获取每个班组的产量**

---

![getTankBalance](assets/img/ProductionMana-objectService-getTankBalance.png "getTankBalance")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
function DateStrUTC(date) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var ms = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return y + "-" + m + "-" + d + "T" + h + ":" + ms + ":" + s + "Z";
}
var instance = {
    timeDiff: 8 * 60 * 60 * 1000,
    influxDb: {
        beginTime: "",
        endTime: ""
    }
};
function SetDateTime() {
    if (shift === '夜班') {
        instance.influxDb.beginTime = new Date(day + ' 00:00:00').getTime();
    } else if (shift === '白班') {
        instance.influxDb.beginTime = new Date(day + ' 08:00:00').getTime();
    } else if (shift === '中班') {
        instance.influxDb.beginTime = new Date(day + ' 16:00:00').getTime();
    }
    instance.influxDb.endTime = instance.influxDb.beginTime;
    instance.influxDb.beginTime = instance.influxDb.beginTime - instance.timeDiff;
}
function getValues(time,tag) {
    var param = {
        "propNames": ['yyshj_yyshj.LT_313V'],
        "time": '2020-10-29T14:00:00Z',
        "strategy": "pre"
    };
    var input = {
        inputs: JSON.stringify(param)
    };
    var rtdbService = ObjectPool.get('sourceA').executeService('getCertainHistory', input);
    return rtdbService.map;
}
var ArrayList = Java.type("java.util.ArrayList");
var array = new ArrayList();
if (day) {
    run();
    result = {
        list: array
    };
}

function run() {
   var  input = {
        shift: shift,
        day: day
    };
    //var list = {"list":[{"name":"粗CTC_M1累计流量","type":"侧线进","tagName":"FQ_M1","preData":255703.78,"endData":258557.33,"confirmValue":2853.5499},{"name":"粗CTC_M2累计流量","type":"侧线进","tagName":"FQ_M2","preData":255792.36,"endData":258681.34,"confirmValue":2888.98},{"name":"CTC外售1_M4累计流量","type":"侧线出","tagName":"FQ_M4","preData":255966.3,"endData":258822.77,"confirmValue":2856.47},{"name":"CTC外售2_M5累计流量","type":"侧线出","tagName":"FQ_M5","preData":256030.73,"endData":258883.52,"confirmValue":2852.7899}]}.list
    var list = ObjectPool.get('sourceA').executeService('yyshj_yyshj.getProduceByShift', input).list;
    var into = 0;
    var out = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].type === '侧线出')
            out += list[i].confirmValue;
        else
            into += list[i].confirmValue;
    }
    SetDateTime();
    var preTank = getValues(instance.beginTime)['/yyshj_yyshj/GeneralService/source/yyshj_yyshj/LT_313V']||23422.43;
    var lastTank = getValues(instance.endTime)['/yyshj_yyshj/GeneralService/source/yyshj_yyshj/LT_313V']||26425.420;
    if (preTank !== null&& lastTank!==null) {
        array.add({
            "name": "V307粗CTC储槽",
            "tagName": "LT_313V",
            "preTank": preTank,
            "into": Math.floor(into * 10000) / 10000,
            "out": Math.floor(out * 10000) / 10000,
            "theory": Math.floor((preTank + into - out) * 10000) / 10000,
            "actual": lastTank,
            "balance": Math.floor((lastTank / (preTank + into - out)) * 10000) / 10000*100
        });
    }
}
```