import { observer } from "mobx-react";
import React from "react";
import { Card } from '@uifabric/react-cards';
import { Text, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { System, Task } from "src/store";
import OverAll from './overAll/OverAll';

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class CenterTask extends  React.Component<IProps> {
  render() {
    return (
      <div className="center-task">
        <OverAll {...this.props} />
      </div>
    );
  }
}
