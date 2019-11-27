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
}

const options: IDropdownOption[] = [
  { key: 'ALL', text: '全部' },
  { key: 'RUNNING', text: '运行中' },
  { key: 'STOP', text: '已停止' },
];

@observer
export default class OverAll extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { pagination: { current: 0, total: 0, pageSize: 10 }};
  }

  render() {
    const { pagination } = this.state;
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
              <TextField />
              <span className="label">状态</span>
              <Dropdown options={options} />
              <PrimaryButton text="查询" className="search" />
              <PrimaryButton text="启动" />
              <DefaultButton text="停止" />
            </div>
          </div>
          <TaskTable {...this.props} pagination={pagination} />
        </div>
      </div>
    );
  }
}
