import { inject, observer } from "mobx-react";
import React from "react";
import { Anchor } from 'antd';
import classNames from "classnames";
import { Text, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { System } from "src/store";
import TagSelector from './TagSelector';
import BasicInfo from './BasicInfo';
import { tagTypes } from "../../constants/commonConstants";

const { Link } = Anchor;

interface IProps {
  system: System,
}

interface IState {
  current: string,
  selectedTag: { code: string, text: string } | null,
  basicInfos: { name: string, description: string, type: string },
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
    this.state = { current: 'tag', selectedTag: null, basicInfos: { name: '', description: '', type: tagTypes.people } } ;
  }

  componentDidMount(): void {

  }

  _changeBasicInfo = (basicInfos: { name: string, description: string, type: string }) => {
    this.setState({ basicInfos });
  };

  _changeSelectedTag = (selectedTag: { code: string, text: string } | null) => {
    this.setState({ selectedTag });
  };

  _clickStep = (link: {title: React.ReactNode, href: string}) => {
    let ins = 0;
    const missSteps = stepList.filter((step: IStep, index: number) => {
      if (step.text === link.title) {
        ins = index
      }
      return  step.text === link.title;
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

  _scrollBody = (e: any) => {
    const taskSubmit = document.querySelector('.task-submit');
    if (taskSubmit) {
      var wst = taskSubmit.scrollTop;
      stepList.forEach((step: IStep, ins: number) => {
        const stepDom = document.querySelector(`#${step.code}`);
        if (stepDom) {
          // @ts-ignore
          const offsetTop: number = stepDom.offsetTop;
          if (offsetTop <= wst + 160) {
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

  render() {
    const { mainHeight } = this.props.system;
    const { current, selectedTag, basicInfos } = this.state;
    return (
      <div id='wy-scroll-layout' style={{ height: mainHeight }} className="task-submit" onScroll={this._scrollBody} >
        <Anchor affix={false} onClick={(e, f) => {this._clickStep(f)}} showInkInFixed={true} >
          {stepList.map((step: IStep) => {
            return (
              <Link
                href="/#/taskSubmit"
                title={step.text}
                className={classNames({ active: current === step.code  })}
                key={step.code}
              />);
          })}
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
          <div id='timer' style={{ height: 500 }}>
            <div className='step-title'>定时配置</div>
          </div>
          <div className='submit-button'>
            <PrimaryButton text='确认' />
            <DefaultButton text='取消' />
          </div>
        </div>
      </div>
    )
  }
}
