import { observer } from "mobx-react";
import React from "react";
import { Card } from '@uifabric/react-cards';
import { Text, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { System, Task } from "src/store";
import TaskTable from './TaskTable';

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class OverAll extends  React.Component<IProps> {
  render() {
    return (
      <div className="over-all">
        <div className="center-top">
          <Grid fluid>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">任务总量</Text>
                    <div><span className="card-num">0个</span></div>
                  </Card.Item>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">已开启任务</Text>
                    <div><span className="card-num run">0个</span></div>
                  </Card.Item>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Item>
                    <Text className="card-title">已暂停任务</Text>
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
              <PrimaryButton text="启动" />
              <DefaultButton text="停止" />
            </div>
          </div>
          <TaskTable {...this.props} />
        </div>
      </div>
    );
  }
}
