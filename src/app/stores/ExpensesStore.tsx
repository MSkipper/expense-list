import { DEFAULT_CONVERSATION_RATE } from "app/constants";
import ExpenseModel from "app/models/ExpenseModel";
import { action, computed, observable } from "mobx";
import { roundAmount } from "../helpers/amount";

export class ExpensesStore {
  @observable public expenses: ReadonlyArray<ExpenseModel> = [];
  @observable public conversionRate: number = DEFAULT_CONVERSATION_RATE;
  @observable public expensesSumAmount = {
    eur: 0,
    pln: 0,
  };

  constructor(expenses?: ReadonlyArray<ExpenseModel>) {
    if (typeof expenses !== "undefined") {
      this.expenses = [...this.expenses, ...expenses];
      this.expensesSumAmount = this.recalculateSum();
    }
  }

  @computed get list() {
    return this.expenses;
  }

  @computed get sum() {
    return this.expensesSumAmount;
  }

  @action
  public addExpense = (expense: ExpenseModel) => {
    this.expenses = [...this.expenses, expense];
    this.expensesSumAmount = this.recalculateSum();
  }

  @action
  public removeExpense = (expense: ExpenseModel) => {
    this.expenses = this.expenses.filter((value) => value !== expense);
    this.expensesSumAmount = this.recalculateSum();
  }

  @action
  public updateConversationRate = (conversionRate: number): void => {
    this.conversionRate = conversionRate;
  }

  private recalculateSum = () => (
    {
      eur: roundAmount((this.expenses.reduce((previousValue, currentValue): number => {
        return previousValue + currentValue.amount.eur;
      }, 0))),
      pln: roundAmount(this.expenses.reduce((previousValue, currentValue): number => {
        return previousValue + currentValue.amount.pln;
      }, 0)),
  })

}
