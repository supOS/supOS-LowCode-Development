> ## **「点检工单--查询重置」**

---

![查询重置](assets/img/DeviceMaintenance-objectService-btnReset.png "查询重置")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
// 批量设置数据值 key 为组件名称，value 为值
scriptUtil.setFormData({
    "workOrderNo":"",
    "deviceCode":"",
    "deviceName":"",
    "repairType":"",
    "repairDept":"",
    "repairCharger":"",
    "dealStatus":"",
});

//日期控件清空属性值
var submitDate = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-167');
submitDate.clearValue();

var table = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-129');

//组装查询条件
var filters = {};
filters.page = 1;
filters.per_page = 50;
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