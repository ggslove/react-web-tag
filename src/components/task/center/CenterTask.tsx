import { observer } from "mobx-react";
import React from "react";
import { Image } from 'office-ui-fabric-react';
import { System, Task } from "src/store";
import OverAll from './overAll/OverAll';
import TaskDetails from './taskDetails/TaskDetails';

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class CenterTask extends  React.Component<IProps> {
  render() {
    const { task, system } = this.props;
    const { activeId } = task;
    const { width } = system;
    if (activeId) {
      if (activeId === 'ALL') {
        return (
          <div className="center-task">
            <OverAll {...this.props} />
          </div>
        );
      }
      return (
        <div className="center-task"  style={{ overflowY: 'auto' }}>
          <TaskDetails {...this.props} />
        </div>
      )
    }
    return (
      <div className="no-data" style={{ width: width - 291, marginLeft: 291 }} >
        <Image src='/img/no-data1.png'/>
      </div>
    );
  }
}
