> ## **「条件查询」**

---

![条件查询](assets/img/DeviceInfo-PageDesign-objectService-btnSearch.png "条件查询")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var deviceCode = scriptUtil.getFormData(['deviceCode']);
var deviceName = scriptUtil.getFormData(['deviceName']);
var purchaseDate = scriptUtil.getFormData(['purchaseDate']);
var deviceStatus = scriptUtil.getFormData(['deviceStatus']);

var table = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-128');

//组装查询条件
var filters = {};
filters.page = 1;
filters.per_page = 50;
if(deviceCode.deviceCode){
    filters["liye_fdms.deviceCode"] = deviceCode.deviceCode;
}
if(deviceName.deviceName){
    filters["liye_fdms.deviceName"] = deviceName.deviceName;
}
if(purchaseDate.purchaseDate){
    filters["liye_fdms.purchaseDate"] = purchaseDate.purchaseDate;
}
if(deviceStatus.deviceStatus){
    filters["liye_fdms.deviceStatus"] = deviceStatus.deviceStatus;
}
var jsonData = JSON.stringify(filters);

scriptUtil.request("/api/compose/manage/v3/objectselector/objectdata/query",{
    method:"POST",
    headers:{
        "X-Namespace":'liye_fdms'//命名空间
    },
    body:{
        "dataSource":"liye_fdms:DeviceAssets",//表格数据源：命名空间.表单模板别名
        "type":"template.data",
        "filters":filters
    }
}).then(function(res){
    table.setObjectSource({
        pagination:res.pagination,
        list:res.list.map(item=>({
            "system_id":item.system_id,
            "liye_fdms.deviceCode":item.liye_fdms_devicecode,
            "liye_fdms.deviceName":item.liye_fdms_devicename,
            "liye_fdms.specModel":item.liye_fdms_specmodel,
            "liye_fdms.purchaseDate":item.liye_fdms_purchasedate,
            "liye_fdms.deviceBrand":item.liye_fdms_devicebrand,
            "liye_fdms.manufacturer":item.liye_fdms_manufacturer,
            "liye_fdms.purchasePrice":item.liye_fdms_purchaseprice,
            "liye_fdms.productionTime":item.liye_fdms_productiontime,
            "liye_fdms.financialNumber":item.liye_fdms_financialnumber,
            "liye_fdms.afterSalesContact":item.liye_fdms_aftersalescontact,
            "liye_fdms.deviceStatus":item.liye_fdms_devicestatus
        }))
    });
});
```