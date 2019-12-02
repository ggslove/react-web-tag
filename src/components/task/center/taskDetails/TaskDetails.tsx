import { observer } from "mobx-react";
import React from "react";
import { Text, PrimaryButton, Icon, Link } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as _ from 'lodash';
import { System, Task } from "src/store";
import TaskHistory from './TaskHistory';
import TaskRecord from './TaskRecord';
import TaskCog from './TaskCog';

interface IProps {
  system: System,
  task: Task,
}

interface IState {
  pivotItems: { code: string, text: string }[];
  selectedKey: string;
  isShowCog: boolean;
}

@observer
export default class TaskDetails extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      pivotItems: [],
      selectedKey: 'history',
      isShowCog: false,
    };
  }

  private _cancelPivot = (code: string) => {
    let { pivotItems } = _.cloneDeep(this.state);
    pivotItems = pivotItems.filter((item: { code: string, text: string }) => {
      return item.code !== code;
    });
    this.setState({ pivotItems, selectedKey: 'history' });
  };

  private _customRenderer = (link: any, defaultRenderer: any, item: { code: string, text: string }) => {
    return (
      <span title={item.text}>
        {defaultRenderer(link)}
        <Icon iconName="BoxMultiplySolid" style={{ color: 'red' }} title='关闭' onClick={() => this._cancelPivot(item.code)}/>
      </span>
    );
  };

  private _handleLinkClick = (item?: PivotItem): void => {
    if (item) {
      this.setState({
        selectedKey: item.props.itemKey || ''
      });
    }
  };

  private _pivotClick = (item: any) => {
    const { pivotItems } = _.cloneDeep(this.state);
    let isExist = false;
    pivotItems.forEach((pivotItem: { code: string, text: string }) => {
      if (pivotItem.code === `${item.key}`) {
        isExist = true;
      }
    });
    if (isExist) {
      this.setState({ selectedKey: item.key });
    } else {
      pivotItems.push({ code: item.key, text: item.name });
      this.setState({ pivotItems, selectedKey: item.key });
    }
  };



  render() {
    const { pivotItems, selectedKey, isShowCog } = this.state;
    return (
      <div className="task-details">
        <div className="task-top">
          <Text variant="xLarge" className="task-name">任务清单1</Text>
          <PrimaryButton text="启动" />
          <div>描述描述描述描述</div>
        </div>
        <div className='action-bar'>
          <Link onClick={() => this.setState({ isShowCog: !isShowCog })}>
            模型配置
            <Icon iconName={isShowCog ? 'ChevronUp' : 'ChevronDown'}/>
          </Link>
        </div>
        <TaskCog {...this.props} isShowCog={isShowCog}/>
        <Pivot className="task-center" selectedKey={selectedKey} onLinkClick={this._handleLinkClick}>
          <PivotItem headerText="任务记录" itemKey='history'>
            <TaskHistory {...this.props} pivotClick={this._pivotClick} />
          </PivotItem>
          {pivotItems.map((item: { code: string, text: string }) => {
            return (
              <PivotItem
                headerText={item.text}
                itemKey={item.code}
                key={`${item.code}-history`}
                title={item.text}
                onRenderItemLink={(link, defaultRenderer) => this._customRenderer(link, defaultRenderer, item)}
              >
                <TaskRecord {...this.props} />
              </PivotItem>
            )
          })}
        </Pivot>
      </div>
    );
  }
}
