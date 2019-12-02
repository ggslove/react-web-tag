import { observer } from "mobx-react";
import React from "react";
import { Card } from '@uifabric/react-cards';
import { Text, PrimaryButton, DefaultButton, TextField, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { System, Task } from "src/store";
import TaskTable from './TaskTable';
import { IPage } from "../../../../models/task";

interface IProps {
  system: System,
  task: Task,
}

interface IState {
  pagination: IPage;
  name: string;
  status: string;
  selectedKeys: string[];
}

const options: IDropdownOption[] = [
  { key: 'ALL', text: '全部' },
  { key: 'RUNNING', text: '已运行' },
  { key: 'STOP', text: '已停止' },
];

@observer
export default class OverAll extends  React.Component<IProps, IState> {

  private taskTableRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      pagination: { current: 0, total: 0, pageSize: 10 },
      name: '', status: 'ALL', selectedKeys: [],
    };
  }

  private _onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    if (option) {
      this.setState({ status: option.key as string });
    }
  };

  private _changeSelectedKeys = (selectedKeys: string[]) => {
    console.log(selectedKeys);
    this.setState({ selectedKeys });
  };

  render() {
    const { pagination, name, status, selectedKeys } = this.state;
    return (
      <div className="over-all">
        <div className="center-top">
          <Grid fluid>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">任务总量</Text>
                    <div><span className="card-num">3个</span></div>
                  </Card.Item>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">已运行任务</Text>
                    <div><span className="card-num run">0个</span></div>
                  </Card.Item>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">已停止任务</Text>
                    <div><span className="card-num stop">0个</span></div>
                  </Card.Item>
                </Card>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="center-board">
          <div className="bar-action">
            <Text className="table-desc">任务列表</Text>
            <Text>(共计10)</Text>
            <div className="right-button-group">
              <span className="label">任务名</span>
              <TextField value={name} onChange={(e, newValue) => this.setState({ name: newValue || '' })} />
              <span className="label">状态</span>
              <Dropdown options={options} selectedKey={status} onChange={this._onChange}/>
              <PrimaryButton text="查询" className="search" />
              <PrimaryButton text="启动" disabled={selectedKeys.length === 0} />
              <DefaultButton text="停止" className="stop-button" disabled={selectedKeys.length === 0} />
            </div>
          </div>
          <TaskTable {...this.props} pagination={pagination} ref={e => this.taskTableRef = e} changeSelectedKeys={this._changeSelectedKeys}  />
        </div>
      </div>
    );
  }
}
