import { observer } from "mobx-react";
import React from "react";
import { ChoiceGroup, TextField } from 'office-ui-fabric-react';
import { tagTypeList, tagTypes } from "../../constants/commonConstants";

interface IProps {
  name: string,
  description: string,
  type: string,
  changeBasicInfo: (basicInfos: { name: string, description: string, type: string }) => void,
}

@observer
export default class BasicInfo extends  React.Component<IProps> {
  render() {
    const { name, description, type, changeBasicInfo } = this.props;
    return (
      <div className='basic-info'>
        <TextField label='任务名' required value={name} onChange={(e, newValue) => changeBasicInfo({ description, type, name: newValue || '' })} errorMessage={name ? '' : "任务名不可为空"} />
        <TextField label='描述' rows={6} multiline value={description} onChange={(e, newValue) => changeBasicInfo({ name, type, description: newValue || '' })} />
        <ChoiceGroup
          required
          label="类型"
          selectedKey={type}
          options={tagTypeList.map(({code, text}: { code: tagTypes, text: string }) => (
            {
              key: code,
              imageSrc: `/img/${code}.png`,
              selectedImageSrc: `/img/${code}.png`,
              imageSize: { width: 32, height: 32 },
              text: text,
            }
          ))}
          onChange={(e, option) => changeBasicInfo({ name, description, type: option ? option.key as string : '' })}
        />
      </div>
    )
  }
}
