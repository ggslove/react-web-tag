import { observable, action } from 'mobx';
import { ILeftData, ITask } from 'src/models/task';

// 任务
class Task {
  @observable leftWidth: number;
  @observable leftData: ILeftData;
  @observable activeId: string;

  constructor () {
    this.leftWidth = 270;
    this.leftData = {
      name: '',
      pagination: { current: 0, total: 0, pageSize: 10 },
      taskList: [
        {
          name: '任务清单1',
          description: '描述1',
          id: '1',
        },
        {
          name: '任务清单2',
          description: '描述2',
          id: '2',
        }
      ],
    };
    this.activeId = 'ALL';
  }

  @action changeLeftName = (name: string) => {
    this.leftData.name = name;
  };

  @action changeActiveId = (activeId: string) => {
    this.activeId = activeId;
  };

  @action changeLeftTask = (task: ITask) => {
    const taskList = this.leftData.taskList;
    this.leftData.taskList = taskList.map((item: ITask) => {
      if (item.id === task.id) {
        return task;
      }
      return item;
    });
  };
}

export default Task;
