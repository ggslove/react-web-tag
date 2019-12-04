import { inject, observer } from "mobx-react";
import React from "react";
import { Anchor, Icon } from 'antd';
import classNames from "classnames";
import { DefaultButton, PrimaryButton, Text } from 'office-ui-fabric-react';
import { System } from "src/store";
import TagSelector from './TagSelector';
import BasicInfo from './BasicInfo';
import TimerInfo from './TimerInfo';
import { tagTypes, timeRates } from "src/constants/commonConstants";

const { Link } = Anchor;

interface IProps {
  system: System,
}

interface IState {
  current: string,
  selectedTag: { code: string, text: string } | null,
  basicInfos: { name: string, description: string, type: string },
  timerInfo: { timeRate: timeRates | '', dayValue?: string, weekValue: string[], monthValue: string[] },
}

interface IStep {
  text: string;
  code: string;
}

const stepList: IStep[] = [
  { text: '标签选择', code: 'tag'},
  { text: '基本信息', code: 'basic'},
  { text: '定时配置', code: 'timer'},
];

@inject('system')
@observer
export default class TaskSubmitDom extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      current: 'tag',
      selectedTag: null,
      basicInfos: { name: '', description: '', type: tagTypes.people },
      timerInfo: { timeRate: timeRates.day, dayValue: undefined, monthValue: [], weekValue: [] },
    } ;
  }

  componentDidMount(): void {

  }

  _changeBasicInfo = (basicInfos: { name: string, description: string, type: string }) => {
    this.setState({ basicInfos });
  };

  _changeTimerInfo = (timerInfo: { timeRate: timeRates | '', dayValue?: string, weekValue: string[], monthValue: string[] }) => {
    this.setState({ timerInfo });
  };

  _changeSelectedTag = (selectedTag: { code: string, text: string } | null) => {
    this.setState({ selectedTag });
  };

  _clickStep = (link: {title: React.ReactNode, href: string}) => {
    let ins = 0;
    console.log(link);
    const missSteps = stepList.filter((step: IStep, index: number) => {
      // @ts-ignore
      if (step.text === link.title.props.children[0]) {
        ins = index
      }
      // @ts-ignore
      return  step.text === link.title.props.children[0];
    });
    if (missSteps.length > 0) {
      const code = missSteps[0].code;
      const ball: any = document.querySelector(".ant-anchor-ink-ball");
      if (ball) {
        ball.className = `ant-anchor-ink-ball ball${ins}`;
      }
      this._scrollToAnchor(code);
      this.setState({ current: code });
    }
  };

  _scrollToAnchor = (id: string) => {
    const idDom = document.getElementById(id);
    if (idDom) {
      idDom.scrollIntoView(false);
    }
  };

  _scrollBody = () => {
    const taskSubmit = document.querySelector('.task-submit');
    if (taskSubmit) {
      const wst = taskSubmit.scrollTop;
      stepList.forEach((step: IStep, ins: number) => {
        const stepDom = document.querySelector(`#${step.code}`);
        if (stepDom) {
          // @ts-ignore
          const offsetTop: number = stepDom.offsetTop;
          if (offsetTop <= wst + 250) {
            this.setState({ current: step.code });
            const ball: any = document.querySelector(".ant-anchor-ink-ball");
            if (ball) {
              ball.className = `ant-anchor-ink-ball ball${ins}`;
            }
          }
        }
      });
    }
  };

  getIsBasicFinished = (): boolean => {
    const { name, type } = this.state.basicInfos;
    return !!name && !!type;
  };

  getIsTimerFinished = (): boolean => {
    const { timeRate, weekValue, monthValue, dayValue } = this.state.timerInfo;
    if (timeRate === timeRates.day) {
      return !!dayValue;
    } else if (timeRate === timeRates.week) {
      return weekValue.length > 0 && !!dayValue;
    } else if (timeRate === timeRates.month) {
      return monthValue.length > 0 && !!dayValue;
    }
    return false;
  };

  render() {
    const { mainHeight } = this.props.system;
    const { current, selectedTag, basicInfos, timerInfo } = this.state;
    return (
      <div id='wy-scroll-layout' style={{ height: mainHeight }} className="task-submit" onScroll={this._scrollBody} >
        <Anchor affix={false} onClick={(e, f) => {this._clickStep(f)}} showInkInFixed={true} >
          <Link href="/#/taskSubmit" title={<span>标签选择<Icon type={selectedTag ? "check-circle" : "close-circle"} /></span>} className={classNames({ active: current === 'tag'  })} />
          <Link href="/#/taskSubmit" title={<span>基本信息<Icon type={this.getIsBasicFinished() ? "check-circle" : "close-circle"}/></span>} className={classNames({ active: current === 'basic'  })} />
          <Link href="/#/taskSubmit" title={<span>定时配置<Icon type={this.getIsTimerFinished() ? "check-circle" : "close-circle"}/></span>} className={classNames({ active: current === 'timer'  })} />
        </Anchor>
        <div className='center'>
          <Text variant='xLarge' className='font600 task-title'>任务提交</Text>
          <div id='tag'>
            <div className='step-title'>
              标签选择
              {selectedTag ? <span className='selected'>({selectedTag.text})</span> : <span className='not-selected'>(未选择标签)</span>}
            </div>
            <TagSelector selectedTag={selectedTag} changeSelectedTag={this._changeSelectedTag} />
          </div>
          <div id='basic'>
            <div className='step-title'>基本信息</div>
            <BasicInfo {...basicInfos} changeBasicInfo={this._changeBasicInfo} />
          </div>
          <div id='timer' style={{ height: 400 }}>
            <div className='step-title'>定时配置</div>
            <TimerInfo {...timerInfo} changeTimerInfo={this._changeTimerInfo} />
          </div>
          <div className='submit-button'>
            <PrimaryButton text='确认' disabled={!(selectedTag && this.getIsBasicFinished() && this.getIsTimerFinished())} />
            <DefaultButton text='取消' />
          </div>
        </div>
      </div>
    )
  }
}
