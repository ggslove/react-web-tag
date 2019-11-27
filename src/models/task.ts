export interface ITask {
  name: string;
  description: string;
  id: string;
}

export interface ILeftData {
  name: string;
  pagination: IPage;
  taskList: ITask[];
}

export interface IPage {
  current: number;
  total: number;
  pageSize: number;
}
