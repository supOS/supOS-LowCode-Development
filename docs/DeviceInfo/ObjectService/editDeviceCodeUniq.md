> ## **「编辑_deviceCode唯一性校验」**

---

![编辑_deviceCode唯一性校验](assets/img/DeviceInfo-PageDesign-objectService-deviceCodeUniq.png "编辑_deviceCode唯一性校验")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本

//资产编号唯一性校验，编辑时获取 行id
//查询是否已存在：deviceCode
var parentScriptUtil = window.parent ? window.parent.scriptUtil : scriptUtil;
var editrow = parentScriptUtil.getEditRow(["htDiv-kgk3quvu0-128"]);//获取当期编辑行数据
var rowId = editrow['system.id'];//获取行记录id
var _deviceCode = editrow['liye_fdms.deviceCode'];//获取编辑前deviceCode

//获取输入框数据
var inputs = {};
inputs.deviceCode = scriptUtil.getFormData(["deviceCode"]).deviceCode;//获取当前输入框内deviceCode的值

scriptUtil.request('/project/dam/supngin/api/dam/runtime/liye_fdms/template/DeviceAssets/service/system/getDataTableScript',{
    method: 'POST',
    headers: {
        'X-Namespace': 'liye_fdms'
    },
    body: {
        'inputs': JSON.stringify(inputs)
    }
}).then(function(res){
    if(res.code != "200" && res.code != "201"){
        scriptUtil.showMessage(res.getMessage(),'error');
    }else{
        var dataList = res.data.result.list;
        if(dataList != null && dataList.length > 0){
            var itemCount = 0;
            dataList.forEach(function(item){
                var _id = item['system.id'];
                if(_id != rowId){
                    itemCount++;
                }
            });
            if(itemCount > 0){
                scriptUtil.showMessage("已存在当前设备资产编号数据，请重新输入资产编号的值",'error');
                //重置为初始化数据
                scriptUtil.setFormData({
                    "deviceCode":_deviceCode
                });
            }
        }
    }
});
```