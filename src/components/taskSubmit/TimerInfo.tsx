import { observer } from "mobx-react";
import React from "react";
import { ChoiceGroup, Label } from 'office-ui-fabric-react';
import moment from 'moment';
import { Select, TimePicker } from 'antd';
import { timeRates, weekDays } from "src/constants/commonConstants";

const { Option } = Select;
const timeFormat = 'HH:mm:ss';

interface IProps {
  timeRate: timeRates | '',
  dayValue?: string,
  weekValue: string[],
  monthValue: string[],
  changeTimerInfo: (timerInfo: { timeRate: timeRates | '', dayValue?: string, weekValue: string[], monthValue: string[] }) => void,
}

@observer
export default class TimerInfo extends  React.Component<IProps> {

  render() {
    const { timeRate, dayValue, weekValue, monthValue, changeTimerInfo } = this.props;
    const monthDays: { text: string, code: string }[] = [];
    for(let i = 1; i < 32; i++ ) {
      monthDays.push({ text: `${i}日`, code: `${i}` });
    }
    return (
      <div className='timer-info'>
        <ChoiceGroup
          label="频次"
          required
          selectedKey={timeRate}
          onChange={(e, option) => changeTimerInfo({ dayValue, weekValue, monthValue, timeRate: option ? option.key as timeRates : '' })}
          options={[
            {
              key: timeRates.day,
              iconProps: { iconName: 'CalendarDay' },
              text: '每天'
            },
            {
              key: timeRates.week,
              iconProps: { iconName: 'CalendarWeek' },
              text: '每周'
            },
            {
              key: timeRates.month,
              iconProps: { iconName: 'Calendar' },
              text: '每月',
            }
          ]}
        />
        <Label required>定时配置</Label>
        <Select
          mode="multiple"
          placeholder="周选择,可多选"
          value={weekValue}
          style={{ display: timeRate === timeRates.week ? 'block' : 'none' }}
          onChange={(value: string[]) => changeTimerInfo({ timeRate, dayValue, monthValue, weekValue: value }) }
        >
          {weekDays.map((item: { text: string, code: string }) => {
            return (<Option key={item.code}>{item.text}</Option>);
          })}
        </Select>
        <Select
          mode="multiple"
          placeholder="日期选择,可多选"
          value={monthValue}
          style={{ display: timeRate === timeRates.month ? 'block' : 'none' }}
          onChange={(value: string[]) => changeTimerInfo({ timeRate, dayValue, weekValue, monthValue: value }) }
        >
          {monthDays.map((item: { text: string, code: string }) => {
            return (<Option key={item.code}>{item.text}</Option>);
          })}
        </Select>
        <TimePicker
          size='default'
          value={dayValue ? moment(dayValue, timeFormat) : undefined}
          onChange={(time: moment.Moment, timeString: string) => changeTimerInfo({ timeRate, weekValue, monthValue, dayValue: timeString }) }
        />
      </div>
    )
  }
}
