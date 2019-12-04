import { observable, action, computed } from 'mobx';
// 系统状态
class System {
  @observable width: number;
  @observable height: number;
  @observable headHeight: number;
  @observable routerPath: string;

  constructor () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.headHeight = 48;
    // eslint-disable-next-line no-restricted-globals
    this.routerPath = location.hash;
  }

  @action resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @action changeHashRouter = () => {
    // eslint-disable-next-line no-restricted-globals
    this.routerPath = location.hash;
  };

  @computed
  get mainHeight(): number {
    return this.height - this.headHeight;
  }
}

export default System;
