import App from "app/components/App/App";
import ExpenseModel from "app/models/ExpenseModel";
import { createStores } from "app/stores";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";

const defaultExpenses = [
  new ExpenseModel("New book about Rust", 100, 22.82),
  new ExpenseModel("Snack for a football match", 20, 4.56),
  new ExpenseModel("Bus ticket", 2.55, 0.58),
];

const rootStore = createStores(defaultExpenses);
ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
