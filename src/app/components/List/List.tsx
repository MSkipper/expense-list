import styled from "@emotion/styled";
import Icon from "@material-ui/core/Icon/Icon";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import ExpenseModel from "app/models/ExpenseModel";
import React, { Component } from "react";
import Row from "../Row/Row";

const H1 = styled("h1")`text-align:center`;

interface IListProps {
  list: ReadonlyArray<ExpenseModel>;
  removeExpense: (expense: ExpenseModel) => void;
}

class List extends Component<IListProps> {

  public render() {
    const list = this.props.list;

    return (
      <Paper>{list.length > 0 ? (<Table><TableHead>
        <TableRow>
        <TableCell align="right"><Icon>arrow_drop_down</Icon>Title</TableCell>
          <TableCell align="right"><Icon>arrow_drop_down</Icon>Amount(PLN)</TableCell>
        <TableCell align="right"><Icon>arrow_drop_down</Icon>Amount(EUR)</TableCell>
          <TableCell align="right"><Icon>arrow_drop_down</Icon>Options</TableCell></TableRow>
      </TableHead><TableBody>
        {list.map((value, index) => (
          <Row expense={value} key={index} deleteAction={this.props.removeExpense}/>
        ))}
      </TableBody></Table>) : <H1>Nothing to show. Please add some items.</H1>}</Paper>

    );
  }
}

export default List;
