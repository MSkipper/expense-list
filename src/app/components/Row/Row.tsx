import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import ExpenseModel from "app/models/ExpenseModel";
import React, { Component } from "react";

interface IRowProps {
  expense: ExpenseModel;
  deleteAction: (expense: ExpenseModel) => void;
}

class Row extends Component<IRowProps> {

  public deleteRow = (): void => {
    this.props.deleteAction(this.props.expense);
  }

  public render() {
    const props = this.props;
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {props.expense.title}
        </TableCell>
        <TableCell align="right">{props.expense.amount.pln}</TableCell>
        <TableCell align="right">{props.expense.amount.eur}</TableCell>
        <TableCell align="right">
          <Button variant="contained" color="secondary" onClick={this.deleteRow}>Delete</Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default Row;
