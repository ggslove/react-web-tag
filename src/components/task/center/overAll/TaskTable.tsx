import { observer } from "mobx-react";
import React from "react";
import { DetailsListLayoutMode, IColumn, Selection, Icon } from "office-ui-fabric-react";
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { IPage } from "../../../../models/task";
import { System, Task } from "../../../../store";

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  runTime: string;
  createTime: string;
  status: boolean;
  action: string;
}

interface IProps {
  pagination: IPage;
  system: System,
  task: Task,
}

interface IState {
  isShow: boolean;
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
}

@observer
export default class TaskTable extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const _allItems = [];
    for (let i = 0; i < 10; i++) {
      _allItems.push({
        key: i,
        name: 'Item ' + i,
        runTime: '2019-11-27 12:00:00',
        createTime: '2019-11-27 12:00:00',
        status: true,
        action: '',
      });
    }
    this.state = { isShow: true,items: _allItems, selectionDetails: {} }
  }


  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  _selection = new Selection({
    onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
  });

  _renderColStatus = (item: IDetailsListBasicExampleItem) => {
    if(item.status) {
      return (<div className="running">已开启</div>);
    }
    return (<div className="stop">已停止</div>);
  };

  _columns: IColumn[] = [
    { key: 'column1', name: '任务名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: '最近执行时间', fieldName: 'runTime', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: '创建时间', fieldName: 'createTime', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '状态', fieldName: 'status', minWidth: 100, maxWidth: 140, isResizable: true },
    { key: 'column5', name: '操作', fieldName: 'action', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  _renderItemColumn = (item?: IDetailsListBasicExampleItem, index?: number, column?: IColumn) => {
    if (item && column) {
      const fieldContent = item[column.fieldName as keyof IDetailsListBasicExampleItem] as string;
      switch (column.fieldName) {
        case 'action':
          if(item.status) {
            return (
              <Icon
                data-selection-disabled={true}
                iconName='CircleStopSolid'
                className='action-col stop'
                title='停止'
                onClick={e => {e.stopPropagation();e.preventDefault();}}
              />);
          }
          return (
            <Icon
              data-selection-disabled={true}
              iconName='Play'
              className='action-col running'
              title='启动'
            />);
        case 'status':
          if(item.status) {
            return (<div className="running">已开启</div>);
          }
          return (<div className="stop">已停止</div>);
        default:
          return <span>{fieldContent}</span>;
      }
    }
  };

  render() {
    const { items } = this.state;
    return (
      <div className="task-table">
        <MarqueeSelection selection={this._selection}>
          <ShimmeredDetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            onRenderItemColumn={this._renderItemColumn}
            layoutMode={DetailsListLayoutMode.justified}
            enableShimmer={false}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
          />
        </MarqueeSelection>
      </div>

    )
  }
}
