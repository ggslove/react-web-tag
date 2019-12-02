import { inject, observer } from "mobx-react";
import React from "react";
import {
  TextField,
  Label,
  Text,
  PrimaryButton,
  DetailsListLayoutMode,
  DetailsList,
  IColumn,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react';
import { Pagination } from "antd";

interface IProps {
  changeSelectedTag: (selectedTag: { code: string, text: string } | null) => void;
  selectedTag: { code: string, text: string } | null
}

interface IState {
  items: IDetailsListBasicExampleItem[];
  name: string;
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

@observer
export default class TagSelector extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const _allItems = [];
    for (let i = 0; i < 10; i++) {
      _allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i
      });
    }
    this.state = { items: _allItems, name: '' };
  }

  _columns: IColumn[] = [
    { key: 'key', name: '标签名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'name', name: '创建时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'value', name: '证件字段', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  _selection = new Selection({
    onSelectionChanged: () => {
      const { changeSelectedTag } = this.props;
      changeSelectedTag(this._getSelectionDetails());
    }
  });

  private _getSelectionDetails(): { code: string, text: string } | null {
    const selections: any = this._selection.getSelection();
    if (selections.length > 0) {
      return { code: selections[0].key as string, text: selections[0].name };
    }
    return null;
  }


  render() {
    const { items, name } = this.state;
    return (
      <div className="tag-selector">
        <Label>
          <Text className='tag-name'>标签名:</Text>
          <TextField value={name} onChange={(e, newValue) => this.setState({ name: newValue || '' })} />
          <PrimaryButton text='搜索' />
        </Label>
        <DetailsList
          items={items}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.single}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
        />
        <Pagination size="small" className="page" total={100}/>
      </div>
    );
  }
}
