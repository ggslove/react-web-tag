import { observer } from "mobx-react";
import React from "react";
import { Icon, Text } from "office-ui-fabric-react";
import classNames from 'classnames';
import { Popover } from "antd";
import TaskEditDialog from "./TaskEditDialog";
import { System, Task } from "src/store";
import { ITask } from "src/models/task";

interface IProps {
  system: System,
  taskItem: ITask,
  activeId: string,
  task: Task,
}

interface IState {
  isShow: boolean,
}

@observer
export default class TaskItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isShow: false };
  }

  private _changeActiveId = (activeId: string) => {
    const { changeActiveId } = this.props.task;
    changeActiveId(activeId);
  };

  private _closeDialog = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { taskItem, activeId, task } = this.props;
    const { isShow } = this.state;
    return (
      <div>
        <Popover
          content={
            <ul className="name-desc">
              <li>名称:&nbsp;&nbsp;&nbsp;&nbsp;{taskItem.name}</li>
              <li>时间:&nbsp;&nbsp;&nbsp;&nbsp;2019-11-27 10:42:00</li>
            </ul>
          }
          trigger="hover"
          placement="right"
        >
          <div
            onClick={() => this._changeActiveId(taskItem.id)}
            className={classNames("task-item", { active: taskItem.id === activeId  })}
            title={taskItem.name}
          >
            <Icon iconName="DateTime" />
            <Text variant="small" className="title-name">{taskItem.name}</Text>
            <Icon
              iconName="EditSolid12"
              className="edit-icon"
              title="修改"
              onClick={e => {this.setState({ isShow: true }); e.stopPropagation();}}
            />
          </div>
        </Popover>
        { isShow ? <TaskEditDialog taskItem={taskItem} closeDialog={this._closeDialog} task={task} /> : null}
      </div>
    );
  }
}
