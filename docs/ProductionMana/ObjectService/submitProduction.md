> ## **「生产计量 -- 列表行编辑数据保存」**

---

![submitProduction](assets/img/ProductionMana-objectService-submitProduction.png "submitProduction")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var param = scriptUtil.getFormData(['proDate','shift']);
console.log(param)
if (!param.proDate || !param.shift) return;

addData();

function addData() {
    scriptUtil.request("/project/dam/supngin/api/dam/runtime/yyshj_yyshj/template/produceTable/service/system/AddDataTableEntries",{
        method:"POST",
        headers:{
            "X-Namespace":'yyshj_yyshj'
        },
        body:{
            params:JSON.stringify({list:getTableData().map(item=>({
                type:item.type,
                confirmValue:item.confirmValue,
                endData:item.endData,
                preData:item.preData,
                name:item.name,
                tagName:item.tagName
            }))})
        }
    }).then(res=>{
         scriptUtil.showMessage('确认成功', 'success')
    })
}

function getTableData() {
    var table = scriptUtil.getRegisterReactDom('htDiv-kdgydsna0-292');
    var data = table.props.historyData.list;
    for (var i = 0; i< data.length; i++) {
        data[i] = {
            ...data[i],
            ...param,
        }
    }
    return data;
}
```