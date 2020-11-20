> ## **「生产计量 -- 列表行渲染」**

---

![rowProduction](assets/img/ProductionMana-objectService-rowProduction.png "rowProduction")

---

```JS
// 客户端为IE11浏览器时不支持ES6脚本
var table = scriptUtil.getRegisterReactDom('htDiv-kdgydsna0-292');
// 单元行可编辑：「editable: true」,
var columnHeader = [{
        customName: '侧线名称',
        originalName: 'name',
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
    {
        customName: '侧线进出',
        originalName: 'type',
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
    {
        customName: '计量仪表',
        originalName: 'tagName',
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
    {
        customName: '上班累计',
        originalName: 'preData',
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
    {
        customName: '本班累计',
        originalName: 'endData',
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
    {
        customName: '本班用量',
        originalName: 'confirmValue',
        editable: true,
        handleSave: (row) => {
            table.props.historyData.list[row.__index] = row;
            table.forceUpdate()
        }
    },
];
table.setColumnHeader(columnHeader);
```