import { IAmount } from "app/types/Amount";
import React, { Component, ReactNode } from "react";

interface ISumProps {
  sum: IAmount;
}

class Sum extends Component<ISumProps> {

  public render(): ReactNode {
    const sum = this.props.sum;
    return (
      <h2>Sum: {sum.pln} PLN ({sum.eur} EUR)</h2>
    );
  }
}

export default Sum;
