import { observer } from "mobx-react";
import React from "react";
import { Icon, Text } from "office-ui-fabric-react";
import { Pagination } from 'antd';
import classNames from 'classnames';
import { System, Task } from "src/store";
import TaskItem from './TaskItem';
import { ITask } from "src/models/task";

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class TaskList extends  React.Component<IProps> {

  private _changeActiveId = (activeId: string) => {
    const { changeActiveId } = this.props.task;
    changeActiveId(activeId);
  };

  render() {
    const { system, task } = this.props;
    const { mainHeight } = system;
    const { activeId } = task;
    const { pagination, taskList } = task.leftData;
    return (
      <div style={{ height: mainHeight - 85 }} className="task-list">
        <div
          onClick={() => this._changeActiveId('ALL')}
          className={classNames("overall", { active: 'ALL' === activeId  })}
          title="总览"
        >
          <Icon iconName="TaskManager" />
          <Text variant="small" className="title-name">总览</Text>
        </div>
        <div style={{ minHeight: mainHeight - 145 }}>
          {taskList.map((taskItem: ITask, index: number) => {
            return <TaskItem  key={`task-${index}`} system={system} taskItem={taskItem} activeId={activeId} task={task}  />;
          })}
        </div>
        <Pagination {...pagination} size="small" simple />
      </div>
    );
  }
}
