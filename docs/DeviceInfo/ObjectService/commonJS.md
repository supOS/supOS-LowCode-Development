> ## **常用脚本服务**

---

> ### **表格脚本说明**

---

> #### **获取Table 元素**

---

```JS
var table = instance; 
或 
var table = window.supQuery.getInstanceById('table-1');//为控件id
```

---

> #### **设置Table 数据源**

---

```JS
var rows = {
  list: [
    {
      index: '1',
      id: 'H111',
      name:'集装箱',
      nickName: '物料名称',
      request: 1,
    },
    {
      index: '3',
      id: 'H112',
      name: '垃圾箱',
      nickName: '物料名称',
      request: 1,
    },
    {
      index: '2',
      id: 'H110',
      name: '集装箱',
      nickName: '物料名称',
      request: 1
    },
    {
      index: '4',
      id: 'H111',
      name: '工业箱',
      nickName: '物料名称',
      request: 1,
    },
  ],
  // 需要分页加分页信息，不需要就不加
  pagination:{
    current:1,
    pageSize:1,
    total:5
  }
};

table.setObjectSource(rows);
```

---

> #### **设置操作列Operation渲染**

---

- name 按钮的名字

- modalUrl 弹窗的pageId

   modalTitle  弹窗标题

   modalWidth  弹窗宽度

   modalHeight  弹窗  

   params  url带的入参，数据来源于当前数据

- click 点击事件  入参: row, index, tableData

- isRenderFn(row) 根据不同的情况，是否显示按钮 true: 显示； false： 不显示

- style 样式

```JS
var columnOperation = [
  {
    name:'编辑',
    modalUrl:'page_id',
    modalTitle:'编辑',
    modalWidth: 1000,
    modalHeight:700,
    params:['id']
  },
  {
    name:'删除',
    click:function(row, index, tableData){
      console.log('删除', row, index, tableData);
    },
    isRenderFn: function(row){
     return true;
    },
    style: {
      backgroundColor:'#eacd4a',
      color:'#fff'
    }
  }
];
table.setColumnOperation(columnOperation);
```

---

> #### **设置列单元格**

---

- 字段名 ：name
- 单元格样式 style 
- 弹窗的   modalUrl: pageId
          modalTitle  弹窗标题
          modalWidth  弹窗宽度
          modalHeight  弹窗 
- 新链接跳转   hrefUrl
- icon 内置图标
- onClick 点击事件 入参： row， tableData

name 代表key值，表格里的key ，对该单元格进行配置

```JS
var cellConfig={
 name: {
    modalUrl:'pageId',
    modalWidth:1000,
    style:{
      color:'#eacd4a'
    },
  },
 age: {
    style:{
      backgroundColor:'#eacd4a',
      color:'#fff'
    },
    hrefUrl:'http://www.baidu.com'
  }
};

table.setCellConfig(cellConfig);

```

---

> #### **脚本分页配置**

---

```JS
var onChange=function(pangation,filters,sorter){
  console.log(pangation,filters,sorter);
  // 通过页面获取数据 更新数据 pangation 分页更新 
  // pangation  {current: 1, pageSize: 1, total: 5}
  // filters 过滤
  // sorter 排序  {column:{},field:"request",order:"descend"}

  // todo
  table.setObjectSource(row);
}

table.setTableOnChange(onChange);
```

---

> #### **获取选择行数据 getSelectedRows**

---

```JS
var selects = table.getSelectedRows();
console.log('selects', selects);
```

---

> #### **获取当前行 getCurRow**

---

```JS
var curRow = table.getCurRow();
console.log('curRow', curRow);
```

---

> #### **获取当前table数据源**

---

```JS
var tableData = table.getObject();
console.log('tableData', tableData);
```

---

> #### **重新获取table数据**

---

```JS
var tableData = table.reloadTableData();

```

---

> ### **ScriptUtil 工具类**

---

> #### **Alert：弹窗；有确认和取消按钮**

---

```JS
   // message 是内容 回调方法为确定之后的回调
   scriptUtil.Alert('Message', function(){
     console.log('callback');
   })
```
> #### **showMessage：展示meaasge信息， 参数可以参考antd**

---

```JS
   // 参照antd message 可选类型： 'success' 'info' 'error' 'warning'
   scriptUtil.showMessage('Message', 'success');
```

---

> #### **timestampFormat：时间转换, 时间戳转格式**

---

``` JS
   scriptUtil.timestampFormat(1587109353040, 'YYYY-MM-DD HH:mm:ss');
```

---

> #### **timestampAntiFormat：时间转换, 时间转时间戳**

---

```JS
    scriptUtil.timestampAntiFormat('2019-01-01 01:00:00');
```

---

> #### **regRexGroup：正则表达式列表**

---

```JS
    // type类型 ： 'none' , 'mobilePhone',  'telephone', 'zipCode', 'idCard', 'number', 'email',  'ip' 返回不用的校验规则 
    var type = 'none';
    scriptUtil.regRexGroup('mobilePhone');

    // 自定义规则
    var type = '/\S/';
    scriptUtil.regRexGroup('mobilePhone');
```

---

> #### **isVaild：用于表单提交时的校验**

---

```
    scriptUtil.isVaild(['ctrlId']);
```

---

> #### **JSONToExcelConvertor：用于数据的导出（表格等）**

---

```JS
// data 数据源 是一个数组
// dataTitle 表头文本
// dataKey 表格数据对应的字段， 顺序dataTitle对应
// fileName 文件名
// extension 扩展名， csv或者xls
scriptUtil.JSONToExcelConvertor({
  data: [
    {name: '小王' , age: '12', sex: '女'}
  ],
  dataTitle: ['姓名', '年纪', '性别'],
  dataKey: ['name', 'age', 'sex'],
  fileName: '文件',
  extension: 'xls'
})
```

---

> ### **ScriptUtil 窗口操作**

---

| Api              | 描述         | 入参                 | 出参          | 自由布局 | 网格布局 |
| ---------------- | ------------ | -------------------- | ------------- | -------- | -------- |
| closeCurrentPage | 关闭当前窗口 | component, props     | 无            | 自由布局 | 网格布局 |
| openPage         | 打开新的页面 | url，method, feature | 无            | 自由布局 | 网格布局 |
| openParentPage   | 打开父页面   | componentId          | component所有 | 自由布局 | 网格布局 |
| showModal        | 显示弹窗     | object               |               | 自由布局 |          |
| closeModal       | 关闭弹窗     | object               |               | 自由布局 |          |
| showLoading      | 展示loading  | object               |               | 自由布局 |          |
| closeLoading     | 关闭loading  | object               |               | 自由布局 |          |

---

> #### **openPage：打开新的页面**

---

```JS
    // 空页面
    scriptUtil.openPage('url', '_black');

    // 替换当前页面
    scriptUtil.openPage('url', '_self');

    //宽高配置的空页面
    scriptUtil.openPage('url', '_black'， true, {
      height: 400,
      width: 400
    });
```

---

> #### **showModal：显示弹窗**

---

```JS
    var pageId = 'XXX';
    scriptUtil.showModal({
      modalVisible,
      modalWidth,
      modalHeight,
      modalTitle,
      isIframe: true,
      pageId: pageId
    });

```

---

> #### **showLoading：展示loading**

---

```JS
    scriptUtil.showLoading({
      spinTip: '加载中...'
    });
```

---

> ### **ScriptUtil 封装接口调用**

---

| Api                 | 描述              | 入参        | 出参 | 自由布局 | 网格布局 |
| ------------------- | ----------------- | ----------- | ---- | -------- | -------- |
| request             | 请求方法          | url, object | 出参 | 自由布局 | 网格布局 |

---

> #### **自定义请求 - request**

---

```JS
    scriptUtil.request('url', {
      method: 'POST', // 'GET', 'PUT', 'DELETE',
      headers: {
          'X-Namespace': ''//命名空间，对象模板所在的命名空间
      },
      body: {
        // 入参
      }
    }).then(function(res){
     console.log('res', res);
    });
```