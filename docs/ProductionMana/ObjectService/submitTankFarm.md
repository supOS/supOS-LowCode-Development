> ## **「罐区计量 -- 列表行编辑数据保存」**

---

![submitTankFarm](assets/img/ProductionMana-objectService-submitTankFarm.png "submitTankFarm")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var param = scriptUtil.getFormData(['proDate','shift']);
if (!param.proDate || !param.shift) return;

addData();

function addData() {
    scriptUtil.request("/project/dam/supngin/api/dam/runtime/yyshj_yyshj/template/tankTable/service/yyshj_yyshj/AddDataTableEntries",{
        method:"POST",
        headers:{
            "X-Namespace":'yyshj_yyshj'
        },
        body:{
            params:JSON.stringify({list:getTableData().map(item=>({
                preTank:item.preTank,
                into:item.into,
                out:item.out,
                theory:item.theory,
                actual:item.actual,
                balance:item.balance,
                name:item.name,
                tagName:item.tagName,
            }))})
        }
    }).then(res=>{
         scriptUtil.showMessage('确认成功', 'success')
    })
}

function getTableData() {
    var table = scriptUtil.getRegisterReactDom('htDiv-kdgydsna0-71');
    var data = table.props.historyData.list;
    for (var i = 0; i< data.length; i++) {
        data[i] = {
            ...data[i],
            ...param,
        }
    }
    return data;
}
```