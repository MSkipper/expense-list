import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { transformAmountToNumber } from "app/helpers/amount";
import React, { ChangeEvent, Component, FormEvent, ReactNode } from "react";

const centerText = css`text-align: center;`;

const Form = styled("form")`
    display: flex;
    align-items: center;`;

const btnWrapper = css`margin: 0 0 0 24px;`;

interface IConversionRateProps {
  updateConversationRate: (conversationRate: number) => void;
  conversionRate: number;
}

interface IConversionRateState {
  conversionRate: string;
}

class ConversionRate extends Component<IConversionRateProps, IConversionRateState> {
  constructor(props: IConversionRateProps) {
    super(props);
    this.state = {
      conversionRate: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateConversionRate = this.updateConversionRate.bind(this);
  }

  public handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    if (this.checkIsRateCorrect(event.target.value)) {
      this.setState({
        conversionRate: event.target.value,
      });
    }
  }

  public updateConversionRate(event: FormEvent<HTMLFormElement>): void {
    const transformedConversationRate = transformAmountToNumber(this.state.conversionRate);
    if (transformedConversationRate > 0) {
      this.props.updateConversationRate(transformedConversationRate);
      this.clearForm();
    }

    event.preventDefault();
  }

  public render(): ReactNode {
    const conversionRate = this.props.conversionRate;
    return (
      <div css={centerText}>
        <h3>1EUR = {conversionRate}</h3>
        <Form onSubmit={this.updateConversionRate}>
          <TextField id="conversionRate" label="Conversion Rate"
            value={this.state.conversionRate} onChange={this.handleInputChange} margin="normal"/>
          <div css={btnWrapper}>
            <Button type="submit" variant="contained" color="primary">Update</Button>
          </div>
        </Form>
      </div>
    );
  }

  private checkIsRateCorrect = (rate: string): boolean => {
    const amountRegex = RegExp("^\\d{0,}((\\.|\\,)\\d{0,})?$");

    return amountRegex.test(rate);
  }

  private clearForm = (): void => {
    this.setState({
      conversionRate: "",
    });
  }
}

export default ConversionRate;
