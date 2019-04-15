import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { convertToEUR, transformAmountToNumber } from "app/helpers/amount";
import ExpenseModel from "app/models/ExpenseModel";
import React, { ChangeEvent, Component, FormEvent, ReactNode } from "react";

const Container = styled("div")`width: 100%`;

const P = styled("p")`
  color: red;`;

const btnWrapper = css`
  margin: 0 0 0 24px;`;

const FormWrapper = styled("div")`
    display: flex;
    align-items: flex-end;`;

interface IAddExpenseFormProps {
  conversionRate: number;
  addExpense: (expense: ExpenseModel) => void;
}

interface IAddExpenseFormState {
  title: string;
  amount: string;
  isSubmitted: boolean;
}

interface IErrors {
  amount: boolean;
  title: boolean;
}

class AddExpenseForm extends Component<IAddExpenseFormProps, IAddExpenseFormState> {

  private readonly minTitleLength = 5;
  private errors: IErrors = {
    amount: false,
    title: false,
  };

  constructor(props: IAddExpenseFormProps) {
    super(props);
    this.state = {
      amount: "",
      isSubmitted: false,
      title: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  public handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target;
    const value = target.value;

    if (target.name === "amount" && this.checkIsAmountCorrect(value)) {
      this.errors.amount = false;
      this.setState({
        amount: value,
      });
    } else if (target.name === "title" && this.checkIsTileCorrect(value)) {
      this.errors.title = false;
      this.setState({
        title: value,
      });
    }
  }

  public addExpense(event: FormEvent<HTMLFormElement>): void {
    this.setState({isSubmitted: true});
    if (this.errors.amount && this.errors.title) {
      const numberAmount = transformAmountToNumber(this.state.amount);
      this.props.addExpense(new ExpenseModel(this.state.title, numberAmount, convertToEUR(numberAmount,
        this.props.conversionRate)));
      this.clearForm();
    }
    event.preventDefault();
  }

  public render(): ReactNode {
    this.errors = this.validateForm(this.state.title, this.state.amount);
    const amountValidation = this.errors.amount || !this.state.isSubmitted ? { display: "none" } : {};
    const titleValidation = this.errors.title || !this.state.isSubmitted ? { display: "none" } : {};

    return (
      <form onSubmit={this.addExpense} noValidate={true}>
        <FormWrapper>
          <Container>
            <TextField fullWidth name="title" label="Title of transaction"
              value={this.state.title} onChange={this.handleInputChange}/>
            <TextField fullWidth name="amount" label="Amount"
              value={this.state.amount} onChange={this.handleInputChange}/>
          </Container>
          <div css={btnWrapper}>
            <Button type="submit" variant="contained" color="primary">Add</Button>
          </div>
        </FormWrapper>
        <P style={titleValidation}>Title should have at least 5 characters.</P>
        <P style={amountValidation}>Amount is required.</P>
      </form>

    );
  }

  private checkIsAmountCorrect = (amount: string): boolean => {
    const amountRegex = RegExp("^\\d{0,}((\\.|\\,)\\d{0,2})?$");

    return amountRegex.test(amount);
  }

  private checkIsTileCorrect = (title: string): boolean => {
    const titleRegex = RegExp("^((?!\\s{2}).)*$");

    return titleRegex.test(title);
  }

  private validateForm = (title: string, amount: string): IErrors => {
    return {
      amount: amount.length > 0,
      title: title.length >= this.minTitleLength,
    };
  }

  private clearForm(): void {
    this.setState({
      amount: "",
      isSubmitted: false,
      title: "",
    });
  }
}

export default AddExpenseForm;
