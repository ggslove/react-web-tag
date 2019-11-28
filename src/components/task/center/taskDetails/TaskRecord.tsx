import { observer } from "mobx-react";
import React from "react";
import { DetailsListLayoutMode, IColumn, SelectionMode, Link } from "office-ui-fabric-react";
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { IPage } from "../../../../models/task";
import { System, Task } from "../../../../store";
import { Pagination } from "@uifabric/experiments";

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  runTime: string;
  costTime: string;
  status: boolean;
  resultNum: number;
}

interface IProps {
  system: System,
  task: Task,
}

interface IState {
  isShow: boolean;
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
  pagination: IPage;
  columns: IColumn[];
}
const columns: IColumn[] = [
  { key: 'column1', name: '任务名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: '执行时间', fieldName: 'runTime', minWidth: 100, maxWidth: 200, isResizable: true, isSorted: true, isSortedDescending: true  },
  { key: 'column3', name: '耗时', fieldName: 'costTime', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column4', name: '状态', fieldName: 'status', minWidth: 100, maxWidth: 140, isResizable: true },
  { key: 'column5', name: '结果数量', fieldName: 'resultNum', minWidth: 100, maxWidth: 200, isResizable: true }
];

@observer
export default class TaskRecord extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const _allItems = [];
    for (let i = 0; i < 10; i++) {
      _allItems.push({
        key: i,
        name: 'Item ' + i,
        runTime: '2019-11-27 12:00:00',
        costTime: `${i * 10}s`,
        status: true,
        resultNum: i * 100,
      });
    }
    this.state = { columns, isShow: true,items: _allItems, selectionDetails: {}, pagination: { current: 0, total: 0, pageSize: 10 } };
  }

  _pivotClick = (item: IDetailsListBasicExampleItem) => {
    console.log(item);
  };

  private _onColumnClick = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn): void => {
    if (column) {
      const { columns } = this.state;
      let isSortedDescending = column.isSortedDescending;
      console.log(column, isSortedDescending);
      if (column.isSorted) {
        isSortedDescending = !isSortedDescending;
      }
      this.setState({
        columns: columns.map(col => {
          col.isSorted = col.key === column.key;
          if (col.isSorted) {
            col.isSortedDescending = isSortedDescending;
          }
          return col;
        })
      });
    }
  };

  render() {
    const { mainHeight } = this.props.system;
    const { items, pagination, columns } = this.state;
    return (
      <div className="task-history" style={{ height: mainHeight - 200 }}>
        <ShimmeredDetailsList
          items={items}
          columns={columns}
          setKey="set"
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          enableShimmer={false}
          selectionPreservedOnEmptyClick={true}
          onColumnHeaderClick={this._onColumnClick}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
        />
        <Pagination
          pageCount={Math.ceil(pagination.total / pagination.pageSize)}
          itemsPerPage={pagination.pageSize}
          totalItemCount={pagination.total}
        />
      </div>
    )
  }
}
