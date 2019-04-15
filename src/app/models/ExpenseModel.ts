import { IAmount } from "app/types/Amount";

export class ExpenseModel {
  public title: string;
  public amount: IAmount;

  constructor(title: string, pln: number, eur: number) {
    this.title = title;
    this.amount = {
      eur,
      pln,
    };
  }

}

export default ExpenseModel;
