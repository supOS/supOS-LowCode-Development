> ## **「新增数据提交」**

---

![新增数据提交](assets/img/DeviceInfo-PageDesign-objectService-dataAdd.png "新增数据提交")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var parentScriptUtil = window.parent ? window.parent.scriptUtil : scriptUtil;
var table = parentScriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-128');
scriptUtil.request('/project/dam/supngin/api/dam/runtime/liye_fdms/template/DeviceAssets/service/liye_fdms/Create',{
    method: 'POST',
    headers: {
        'X-Namespace': 'liye_fdms'
    },
    body: {
        "deviceCode": scriptUtil.getFormData(["deviceCode"]).deviceCode,
        "deviceName": scriptUtil.getFormData(["deviceName"]).deviceName,
        "specModel": scriptUtil.getFormData(["specModel"]).specModel,
        "purchaseDate": scriptUtil.getFormData(["purchaseDate"]).purchaseDate,
        "deviceBrand": scriptUtil.getFormData(["deviceBrand"]).deviceBrand,
        "manufacturer": scriptUtil.getFormData(["manufacturer"]).manufacturer,
        "purchasePrice": scriptUtil.getFormData(["purchasePrice"]).purchasePrice,
        "productionTime": scriptUtil.getFormData(["productionTime"]).productionTime,
        "financialNumber": scriptUtil.getFormData(["financialNumber"]).financialNumber,
        "afterSalesContact": scriptUtil.getFormData(["afterSalesContact"]).afterSalesContact,
        "deviceStatus": scriptUtil.getFormData(["deviceStatus"]).deviceStatus
    }
}).then(function(res){
    if(res.code != "200"){
        scriptUtil.showMessage(res.getMessage(),'error');
    }else{
        scriptUtil.showMessage('新增成功','success');
        //重新加载列表数据
        table.reloadTableData();
        //关闭当前弹出窗
        parentScriptUtil.showModal({ modalVisible: false });
        parentScriptUtil.showMessage("新增成功", "success");
    }
});
```