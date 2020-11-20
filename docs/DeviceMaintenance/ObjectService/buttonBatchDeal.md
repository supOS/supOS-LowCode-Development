> ## **「点检工单--批量受理工单」**

---

![批量受理工单](assets/img/DeviceMaintenance-ObjectService-buttonBatchDeal.png "批量受理工单")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var table = scriptUtil.getRegisterReactDom('htDiv-kgk3quvu0-129');//根据组件id获取dataTable对象
var selects = table.getSelectedRows();//获取当前dataTable中选中的行记录数据
var openFlag = selects.length > 0 ? true : false;
if(openFlag){
    var handlingCount = 0;
    selects.forEach( function(item){
        var dealStatus = item["liye_fdms.dealStatus"];
        if(dealStatus != "已创建"){
            handlingCount++;
        }
    });
    if(handlingCount > 0){
        scriptUtil.showMessage("请同时选择【已创建】状态下的工单进行批量处理！",'error');
    }else{
        selects.forEach( function(item){
            var propValJson = {
                where:{
                    "id":item['system.id'] + ''
                },
                update:{
                    "dealStatus": "正在处理"
                }
            };
            scriptUtil.request("/project/dam/supngin/api/dam/runtime/liye_fdms/template/deviceSpotCheck/service/system/UpdateDataTableEntry",{
                method:"POST",
                headers:{
                    'X-Namespace': 'liye_fdms'
                },
                body:{
                    updateData:JSON.stringify(propValJson)
                }
            }).then(function(res){
                if(res.code != "200" && res.code != "201"){
                    scriptUtil.showMessage(res.getMessage(),'error');
                }
            });
        });
        scriptUtil.showMessage('受理成功','success');
        //重新加载列表数据
        table.reloadTableData();
        window.location.reload();
    }
}else{
    scriptUtil.showMessage("请至少选择一条工单记录进行处理！",'error');
}
```