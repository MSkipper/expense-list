import { DEFAULT_CONVERSATION_RATE } from "app/constants";
import ExpenseModel from "app/models/ExpenseModel";
import { IAmount } from "app/types/Amount";
import { action, computed, observable } from "mobx";
import { convertToEUR, roundAmount } from "../helpers/amount";

export class ExpensesStore {
  @observable public expenses: ReadonlyArray<ExpenseModel> = [];
  @observable public conversionRate: number = DEFAULT_CONVERSATION_RATE;
  @observable public expensesSumAmount: IAmount = {
    eur: 0,
    pln: 0,
  };

  constructor(expenses?: ReadonlyArray<ExpenseModel>) {
    if (typeof expenses !== "undefined") {
      this.expenses = [...this.expenses, ...expenses];
      this.expensesSumAmount = this.recalculateSum();
    }
  }

  @computed get list(): ReadonlyArray<ExpenseModel> {
    return this.expenses;
  }

  @computed get sum(): IAmount {
    return this.expensesSumAmount;
  }

  @action
  public addExpense = (expense: ExpenseModel): void => {
    this.expenses = [...this.expenses, expense];
    this.expensesSumAmount = this.recalculateSum();
  }

  @action
  public removeExpense = (expense: ExpenseModel): void => {
    this.expenses = this.expenses.filter((value) => value !== expense);
    this.expensesSumAmount = this.recalculateSum();
  }

  @action
  public updateConversationRate = (conversionRate: number): void => {
    this.conversionRate = conversionRate;
    this.expenses = this.expenses.map((expense) => ({
      ...expense,
      amount: {
        ...expense.amount,
        eur: convertToEUR(expense.amount.pln, conversionRate),
      },
    }));
    this.expensesSumAmount = this.recalculateSum();
  }

  private recalculateSum = (): IAmount => (
    {
      eur: roundAmount((this.expenses.reduce((previousValue, currentValue): number => {
        return previousValue + currentValue.amount.eur;
      }, 0))),
      pln: roundAmount(this.expenses.reduce((previousValue, currentValue): number => {
        return previousValue + currentValue.amount.pln;
      }, 0)),
  })

}
