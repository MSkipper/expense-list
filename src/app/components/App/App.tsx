import { css } from "@emotion/core";
import styled from "@emotion/styled";
import ConversionRate from "app/components/ConversionRate/ConversionRate";
import { STORE_EXPENSES } from "app/constants";
import { ExpensesStore } from "app/stores";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import List from "../List/List";
import Sum from "../Sum/Sum";

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;`;

const container = css`
    margin: 48px 64px;`;

const Section = styled("section")`
  margin: 32px 0;
`;

interface IAppProps {
  [key: string]: ExpensesStore;
}

@inject(STORE_EXPENSES)
@observer
class App extends Component<IAppProps> {
  public render() {
    const expensesStore = this.props[STORE_EXPENSES];

    return (
      <div css={container}>
        <header css={header}>
          <h1> List of expense </h1>
          <ConversionRate updateConversationRate={expensesStore.updateConversationRate}
            conversionRate={expensesStore.conversionRate}/>
        </header>
        <Section> <AddExpenseForm addExpense={expensesStore.addExpense} conversionRate={expensesStore.conversionRate}/>
        </Section> <Section> <List removeExpense={expensesStore.removeExpense} list={expensesStore.list}/> </Section>
        <Section> <Sum sum={expensesStore.sum}/> </Section>
      </div>
    );
  }
}

export default App;
