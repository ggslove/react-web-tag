import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { initializeIcons } from '@uifabric/icons';
import Head from 'src/components/head';
import './index.scss';
import Login from 'src/components/login';
import InJect from 'src/util/InJect';
import { System, User, App as AppStore } from './store';
import Home from 'src/components/home';
import OperationDom from 'src/components/operation';
import Back from 'src/components/back';
import BuildDom from 'src/components/build';
import SqlDom from 'src/components/sql';
import TaskDom from 'src/components/task';
import TaskSubmitDom from 'src/components/taskSubmit';
const browserHistory = createBrowserHistory();
const routerStore =  new RouterStore();
// 同步路由与mobx的数据状态
const history = syncHistoryWithStore(browserHistory, routerStore);
moment.locale('zh-cn');

interface IProps {
  system: System,
  user: User,
  app: AppStore,
}

@inject("system", "user", "app")
@observer
class Entry extends React.Component<IProps> {

  async componentWillMount(): Promise<void> {
    initializeIcons();
    this.props.user.checkLogin();
    window.onresize = () => this.props.system.resize();
    window.onhashchange = () => this.props.system.changeHashRouter();
  }

  render() {
    const { user, system } = this.props;
    const { height, width } = this.props.system;
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div style={{ height, width }}>
          <Head user={user} system={system} />
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/operation" component={OperationDom}/>
              <Route exact path="/back" component={Back}/>
              <Route exact path="/build" component={BuildDom}/>
              <Route exact path="/sql" component={SqlDom}/>
              <Route exact path="/task" component={TaskDom}/>
              <Route exact path="/taskSubmit" component={TaskSubmitDom}/>
            </Switch>
          </HashRouter>
        </div>
      );
    } else {
      return (
        <div style={{ height, width }}>
          <InJect Component={Login} />
        </div>
      );
    }
  }
}

@observer
class App extends  React.Component {
  render() {
    return  <ConfigProvider locale={zh_CN}><InJect Component={Entry} /></ConfigProvider>
  }
}

export default App;
