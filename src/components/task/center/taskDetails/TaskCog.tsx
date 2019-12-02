import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { System, Task } from "src/store";
import { rightTypes } from "../../../../constants/operationConstants";

interface IProps {
  system: System,
  task: Task,
  isShowCog: boolean,
}

@observer
export default class TaskCog extends  React.Component<IProps> {

  render() {
    const { isShowCog } = this.props;
    return (
      <div className={classNames("task-cog", { hide: !isShowCog })}>
        <div className="task-content">
          12312
        </div>
      </div>
    );
  }
}
