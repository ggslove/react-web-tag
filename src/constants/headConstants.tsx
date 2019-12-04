export enum panelKeys {
  USER, NOTICE, MENU
}

export const urlParams: {[key: string]: { backgroundColor: string, text: string, className: string } } = {
  "": { backgroundColor: '#2B579A', text: '标签中心', className: 'tag-head' },
  "operation": { backgroundColor: '#2B579A', text: '标签搭建', className: 'tag-head' },
  "back": { backgroundColor: '#217346', text: '模版中心', className: 'mould-head' },
  "build": { backgroundColor: '#217346', text: '模版搭建', className: 'mould-head' },
  "sql": { backgroundColor: '#217346', text: 'SQL搭建', className: 'mould-head' },
  "task": { backgroundColor: '#7719AA', text: '任务中心', className: 'task-head' },
  "taskSubmit": { backgroundColor: '#7719AA', text: '任务提交', className: 'task-head' },
};
