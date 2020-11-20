> ## **「罐区计量 -- 列表行渲染」**

---

![rowTankFarm](assets/img/ProductionMana-objectService-rowTankFarm.png "rowTankFarm")

---

```JS
var table = scriptUtil.getRegisterReactDom('htDiv-kdgydsna0-71');
// 单元行可编辑
var columnHeader = [
  {
    customName: '储罐名称',
    originalName: 'name',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
  {
    customName: '液位计',
    originalName: 'tagName',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
  {
    customName: '期初罐存',
    originalName: 'preTank',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
   {
    customName: '上班累计',
    originalName: 'into',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
    {
    customName: '本班累计',
    originalName: 'out',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
    {
    customName: '理论值(交班罐存)',
    originalName: 'theory',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  },
  {
    customName: '实际值',
    originalName: 'actual',
    editable: true,
    handleSave: (row) => {
        row.balance = Math.floor(row.actual/(row.preTank+row.into-row.out)*100*100)/100;
        table.props.historyData.list[row.__index] = row;
        // table.props.historyData.list[row.__index].balance = 12121;
        table.forceUpdate()
    }
  },
  {
    customName: '平衡率%',
    originalName: 'balance',
    handleSave: (row) => {
        table.props.historyData.list[row.__index] = row;
        table.forceUpdate()
    }
  }
];
table.setColumnHeader(columnHeader);
```