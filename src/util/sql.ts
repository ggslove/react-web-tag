import { AST } from "node-sql-parser";

// 根据AST JSON解析出条件字段
export const getWhereCols = (asts: AST[] | AST): any[] => {
  const whereCols: any[] = [];
  if (asts instanceof Array) {
    asts.forEach((ast: AST) => {
      const cols: any[] = getWhereColByAst(ast);
      cols.forEach((col: any) => {
        whereCols.push(col);
      });
    })
  } else {
    const cols: any[] = getWhereColByAst(asts);
    cols.forEach((col: any) => {
      whereCols.push(col);
    });
  }
  return whereCols;
};

export const getWhereColByAst = (ast: AST): any[] => {
  const whereCols: any[] = [];
  console.log(ast);
  const getWhereCol = (where: any) => {
    if (where) {
      let { left, right, type, value, aggName } = where;
      if (aggName) {
        value = value.map((item: any) => {
          item.aggName = aggName;
          return item;
        });
      }
      switch (type) {
        case 'binary_expr':
          {
            getWhereCol(left);
            getWhereCol(right);
            break;
          }
        case 'column_ref':
          whereCols.push(where);
          break;
        case 'expr_list':
          const cols: any[] = getWhereCols(value);
          cols.forEach((col: any) => {
            whereCols.push(col);
          });
          break;
        case 'function':
          getWhereCol({ ...where.args, aggName: where.count });
          break;
        case 'aggr_func':
          whereCols.push({ column: where.name });
          break;
        default:
          return null;
      }
    }
  };
  if (ast.type === 'select') {
    const { where, having } = ast;
    if (where) {
      getWhereCol(where);
    }
    if (having) {
      getWhereCol(having);
    }
  }
  return whereCols;
};
