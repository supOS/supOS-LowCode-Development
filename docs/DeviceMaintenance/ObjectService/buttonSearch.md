> ## **「工单列表--条件查询」**

---

![条件查询](assets/img/DeviceMaintenance-objectService-btnSearch.png "条件查询")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var workOrderNo = scriptUtil.getFormData(['workOrderNo']);
var deviceCode = scriptUtil.getFormData(['deviceCode']);
var deviceName = scriptUtil.getFormData(['deviceName']);
var repairType = scriptUtil.getFormData(['repairType']);
var submitDate = scriptUtil.getFormData(['submitDate']);
var repairDept = scriptUtil.getFormData(['repairDept']);
var repairCharger = scriptUtil.getFormData(['repairCharger']);
var dealStatus = scriptUtil.getFormData(['dealStatus']);

var table = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-129');//获取dataTable控件

//组装查询条件
var filters = {};
filters.page = 1;
filters.per_page = 50;//当前分页大小，需要与绑定表格属性时，设置的分页大小一致；
if(workOrderNo.workOrderNo){
    filters["liye_fdms.workOrderNo"] = workOrderNo.workOrderNo;
}
if(deviceCode.deviceCode){
    filters["liye_fdms.deviceCode"] = deviceCode.deviceCode;
}
if(deviceName.deviceName){
    filters["liye_fdms.deviceName"] = deviceName.deviceName;
}
if(repairType.repairType){
    filters["liye_fdms.repairType"] = repairType.repairType;
}
if(submitDate.submitDate){
    filters["liye_fdms.submitDate"] = submitDate.submitDate;
}
if(repairDept.repairDept){
    filters["liye_fdms.repairDept"] = repairDept.repairDept;
}
if(repairCharger.repairCharger){
    filters["liye_fdms.repairCharger"] = repairCharger.repairCharger;
}
if(dealStatus.dealStatus){
    filters["liye_fdms.dealStatus"] = dealStatus.dealStatus;
}
var jsonData = JSON.stringify(filters);

scriptUtil.request("/api/compose/manage/v3/objectselector/objectdata/query",{
    method:"POST",
    headers:{
        "X-Namespace":'liye_fdms'
    },
    body:{
        "dataSource":"liye_fdms:deviceSpotCheck",
        "type":"template.data",
        "filters":filters
    }
}).then(function(res){
    table.setObjectSource({
        pagination:res.pagination,
        list:res.list.map(item=>({
            "system_id":item.system_id,
            "liye_fdms.workOrderNo":item.liye_fdms_workorderno,
            "liye_fdms.deviceCode":item.liye_fdms_devicecode,
            "liye_fdms.deviceName":item.liye_fdms_devicename,
            "liye_fdms.specModel":item.liye_fdms_specmodel,
            "liye_fdms.position":item.liye_fdms_position,
            "liye_fdms.deviceCharger":item.liye_fdms_devicecharger,
            "liye_fdms.repairContent":item.liye_fdms_repairtype,
            "liye_fdms.maintenanceDate":item.liye_fdms_repaircontent,
            "liye_fdms.dealStatus":item.liye_fdms_dealstatus,
            "liye_fdms.repairType":item.liye_fdms_repairtype,
            "liye_fdms.repairDept":item.liye_fdms_repairdept,
            "liye_fdms.repairCharger":item.liye_fdms_repaircharger,
            "liye_fdms.dealInfo":item.liye_fdms_dealinfo,
            "liye_fdms.submitDate":item.liye_fdms_submitdate,
            "liye_fdms.remark":item.liye_fdms_remark
        }))
    });
});
```