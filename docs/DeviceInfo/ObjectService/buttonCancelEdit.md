> ## **「取消编辑数据提交」**

---

![取消编辑数据提交](assets/img/DeviceInfo-PageDesign-objectService-dataCancelEdit.png "取消编辑数据提交")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var parentScriptUtil = window.parent ? window.parent.scriptUtil : scriptUtil;
parentScriptUtil.showModal({ modalVisible: false });
```