import { observer } from "mobx-react";
import React from "react";
import { Text, PrimaryButton } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { System, Task } from "src/store";
import TaskHistory from './TaskHistory';

interface IProps {
  system: System,
  task: Task,
}

interface IState {
  pivotItems: { code: string, text: string }[];
}

@observer
export default class TaskDetails extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      pivotItems: [
        { code: '', text: '' },
      ]
    };
  }

  render() {
    const { pivotItems } = this.state;
    return (
      <div className="task-details">
        <div className="task-top">
          <Text variant="xLarge" className="task-name">任务清单1</Text>
          <PrimaryButton text="启动" />
          <div>描述描述描述描述</div>
        </div>
        <Pivot className="task-center">
          <PivotItem headerText="任务记录">
            <TaskHistory {...this.props} />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
