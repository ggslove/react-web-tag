import { action, observable } from 'mobx';
import { IBasicInfo, ISelectCol } from "src/models/sql";
import { getWhereCols } from "src/util/sql";
import { IPage } from "src/models/operation";

const { Parser } = require('node-sql-parser');
const parser = new Parser();
const opt = {
  database: 'MySQL'
};

// SQL编辑
class Sql {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable sqlList: string[];
  @observable basicInfo: IBasicInfo;
  @observable activeSqlId: string;
  @observable sqlValue: string;
  @observable selectCols: ISelectCol[];
  @observable whereCols: string[];
  @observable pagination: IPage;
  @observable name: string;

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.name = '';
    this.basicInfo = { name: '新建SQL', personCol: '', carCol1: '', carCol2: '', caseCol: '', unitCol: '', areaCol: '' };
    this.sqlList = ['常口1','常口2','常口3','常口4','常口5','常口6','常口7','常口8','常口9','常口10','常口11','常口12','常口13',];
    this.activeSqlId = '';
    this.sqlValue = '';
    this.selectCols = [];
    this.whereCols = [];
    this.pagination = { current: 0, total: 0, pageSize: 10 };
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action checkTag = (sqlId: string) => {
    this.activeSqlId = sqlId;
  };

  @action changeName = (name: string) => {
    this.name = name;
  };

  @action changeSqlValue = (sqlValue: string) => {
    try {
      let sqlPar = sqlValue.indexOf(';') === sqlValue.length - 1 ? sqlValue : `${sqlValue};`;
      const ast = parser.astify(sqlPar, opt);
      const whereCols = getWhereCols(ast);
      // const sql = parser.sqlify(ast, opt);
      // console.log(sql);
      if (ast.length > 0 && ast[0] && ast[0].type === 'select') {
        const { columns } = ast[0];
        if (columns instanceof Array) {
          this.selectCols = columns.map((column: any) => {
            return { columnName: column.expr.column, columnAlias: column.as };
          });
        } else {
          this.selectCols = [];
        }
        this.whereCols = whereCols;
      } else {
        this.whereCols = [];
        this.selectCols = [];
      }
    }catch (e) {
      this.whereCols = [];
      this.selectCols = [];
    }
    this.sqlValue = sqlValue;
    this.basicInfo = { ...this.basicInfo, personCol: '' };
  };

}

export default Sql;
