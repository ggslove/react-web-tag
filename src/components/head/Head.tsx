import React from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { CommandBarButton, IIconProps, Icon } from 'office-ui-fabric-react';
import { Badge } from 'antd';
import { panelKeys, urlParams } from 'src/constants/headConstants';
import UserPanel from './UserPanel';
import NoticePanel from './NoticePanel';
import MenuPanel from './MenuPanel';
import { User, System } from 'src/store';

const menuIcon: IIconProps = { iconName: 'WaffleOffice365' };
const userIcon: IIconProps = { iconName: 'Contact' };
const ringIcon: IIconProps = { iconName: 'Ringer' };

interface IProps {
  user: User;
  system: System;
}

interface IState {
  activePanel: panelKeys | undefined;
  unReadNum: number;
}
@inject('system', 'user')
@observer
export default class Head extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { activePanel: undefined, unReadNum: 5 };
  }

  dismissPanel = () => {
    this.setState({ activePanel: undefined });
  };

  private _readAll = () => {
    this.setState({ unReadNum: 0 });
  };

  private _backHistory = () => {
    window.history.back();
  };

  render() {
    const { user, system } = this.props;
    const { routerPath } = system;
    const path = routerPath.split('/')[1] || '';
    const params = urlParams[path];
    const { activePanel, unReadNum } = this.state;
    return (
      <div className={`head ${ params ? params.className : '' }`} >
        <div className="button-head-group">
          <CommandBarButton
            iconProps={menuIcon}
            className={classNames({ active: panelKeys.MENU === activePanel } )}
            title='菜单'
            onClick={() => this.setState({ activePanel: panelKeys.MENU })}
          />
          <span className='title'>{params ? params.text : '路径有误'}</span>
          <span className='reply-icon'>{ params && params.isReply ?  <Icon iconName='Reply' title='返回' onClick={this._backHistory}/> : null }</span>
          <div className="button-right-group">
            <Badge count={unReadNum}>
              <CommandBarButton
                iconProps={ringIcon}
                className={classNames({ active: panelKeys.NOTICE === activePanel } )}
                title='预警信息'
                onClick={() => this.setState({ activePanel: panelKeys.NOTICE })}
              />
            </Badge>
            <CommandBarButton
              iconProps={userIcon}
              className={classNames({ active: panelKeys.USER === activePanel } )}
              title='用户信息'
              onClick={() => this.setState({ activePanel: panelKeys.USER })}
            />
          </div>
        </div>
        <UserPanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user}/>
        <NoticePanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user} readAll={this._readAll} unReadNum={unReadNum} />
        <MenuPanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user}/>
      </div>
    )
  }
}

