import { STORE_EXPENSES } from "app/constants";
import { ExpenseModel } from "app/models";
import { ExpensesStore } from "app/stores/ExpensesStore";

export function createStores(defaultData?: ReadonlyArray<ExpenseModel>) {
  const expensesStore = new ExpensesStore(defaultData);
  return {
    [STORE_EXPENSES]: expensesStore,
  };
}
