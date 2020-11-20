> ## **「点检工单--数据加载/操作列」渲染**

---

![操作列](assets/img/DeviceMaintenance-objectService-btnOperation.png "操作列")

---

```JS
var table = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-129');

//添加操作列
var columnOperation = [
  {
      name:'编辑',
      modalUrl:'Page_2afc0464b7384ef99c0b5232c6edc4d3',
      modalTilte: '编辑工单信息',
      modalWidth:1200, 
      modalHeight:700,
      params:['id','workOrderNo','deviceCode','deviceName','specModel','position','deviceCharger','repairType','repairContent','maintenanceDate','dealStatus','repairDept','repairCharger','dealInfo','remark','submitDate','plannedStartTime','plannedEndTime']
  },
  {
      name:'删除',
      modalUrl:'url',
      click:function(data) {
          var condition = new Object();
          condition.id = data['system.id'];
          var jsonData = JSON.stringify(condition);
          scriptUtil.request('/project/dam/supngin/api/dam/runtime/liye_fdms/template/deviceSpotCheck/service/system/DeleteDataTableEntries',{
            method: 'POST',
            headers: {
                'X-Namespace': 'liye_fdms'
            },
            body: {
                "condition":jsonData
            }
        }).then(function(res){
          table.reloadTableData();
        });
      }
  }
];
table.setColumnOperation(columnOperation);
```