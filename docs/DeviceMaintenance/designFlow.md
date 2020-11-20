> ## **APP设计思路**

---

> ### **设计流程**

---

![设计流程](assets/img/DeviceMaintenance-designFlow.png "设计流程")

---

> ### **页面需求分析**

---

- **工单页面**需要如下主要功能：
  - 搜索「**条件查询**」；
  - 搜索「**条件重置**」；
  - 列表「**数据初始化**」：分页展示；
  - 操作列渲染：「**编辑**」和「**删除**」；
  - 「**创建工单**」按钮；
  - 「**受理工单**」按钮；
  - 「**维修记录**」按钮；
  - 「**关闭工单**」按钮；

---

- **创建工单页面**需要如下主要功能：
  - 「**确认**」按钮事件，点击创建工单记录数据；
  - 「**工单待办通知发送**」点击创建工单，发送工单待办信息；
  - 「**取消**」按钮事件，点击关闭当前模态窗口；
  - 「**选择设备**」单击事件；
  - 「**内容校验**」必填性校验与数据格式校验；

---

- **编辑工单页面**需要如下主要功能：
  - 编辑行记录「**数据初始化**」；
  - 「**确认**」按钮事件，点击修改工单记录数据；
  - 「**内容校验**」必填性校验与数据格式校验；
  - 「**数据只读属性设置**」非创建状态下进入编辑页面，需要对页面某些属性设置为只读属性，不可编辑修改；

---

- **维修记录**需要如下主要功能：
  - 「**确认**」新增/编辑维修记录；
  - 「**内容校验**」必填性校验与数据格式校验；
  - 「**数据只读属性设置**」工单编号以及设备标号等唯一标识信息，设置为只读，只用于读取展示；
  - 数据列表记录「**初始化**」：加载已有的维修记录列表，分页展示；
  - 数据列表操作列渲染：「**编辑**」和「**删除**」；
  - 编辑行记录「**数据初始化**」；

---

- **消息通知**需要如下主要功能：
  - 「**站内信配置**」配置接收消息展示形式：警铃信息气泡展示、页面跳转；

---

> ### **表设计**

---

> #### **设备点检工单**

当前案例中，设备点检工单信息设定主要包含以下属性字段

|名称|字段别名|类型|字段说明|
|:---|:---|:---|:---|
|工单编号|workOrderNo|STRING|**设备点检维修**外键|
|资产编号|deviceCode|STRING|关联**设备资产信息**主显示字段|
|设备名称|deviceName|STRING||
|规格型号|specModel|STRING||
|所在位置|position|STRING||
|设备负责人|deviceCharger|STRING||
|报修类型|repairType|STRING||
|检修内容|repairContent|STRING||
|检修时间|maintenanceDate|DATETIME||
|处理状态|dealStatus|STRING||
|维修部门|repairDept|STRING||
|维修负责人|repairCharger|STRING||
|实际维修情况|dealInfo|STRING||
|备注|remark|STRING||
|报修日期 |submitDate|DATE||
|计划开始时间 |plannedStartTime|DATETIME||
|计划结束时间 |plannedEndTime|DATETIME||

---

> #### **设备点检维修**

当前案例中，设备维修信息设定主要包含以下属性字段

|名称|别名|类型|字段说明|
|:---|:---|:---|:---|
|检修工单|workOrderNo|STRING|关联**设备点检工单**主显示字段|
|资产编号|deviceCode|STRING|关联**设备资产信息**主显示字段|
|维修人员|repairUser|STRING||
|维修部门|repairDept|STRING||
|检修开始时间|repairStartTime|DATETIME||
|检修结束时间|repairEndTime|DATETIME||
|检修报告内容|repairInfo|STRING||

---

> ### **基础操作参考**

---

- 参考：[**用户角色管理**](/docs/UserRole/)
- 参考：[**站内信配置**](/docs/Notification/)
- 参考：[**新建APP**](/docs/BasicOperation/createNewApp)
- 参考：[**APP设计器**](/docs/BasicOperation/DesignerMenu/)
- 参考：[**对象建模**](/docs/Summary/conceptIntro)
- 参考：[**界面设计**](/docs/BasicOperation/PageDesign/)