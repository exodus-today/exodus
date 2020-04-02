import * as React from 'react';
import { PaymentAccountType, CreditCardType } from '../../enums';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';

interface Props {
    paymentAccount: PaymentAccountStore,
}

interface State {
    
}

export class PaymentAccountNameComponent extends React.Component<Props, State> {
    render() {
        const { props: { paymentAccount } } = this;
        const { Card } = paymentAccount;

        if (paymentAccount.AccountType === PaymentAccountType.Bitcoin) {
            return `Bitcoin: ${paymentAccount.AccountDetails}`;
        }

        if (paymentAccount.AccountType === PaymentAccountType.PayPal) {
            return `PayPal: ${paymentAccount.AccountDetails}`;
        }

        if (paymentAccount.AccountType === PaymentAccountType.WebMoney) {
            return `WebMoney: ${paymentAccount.AccountDetails}`;
        }

        if (paymentAccount.AccountType === PaymentAccountType.BankAccount) {
            return `Bank Account`;
        }


        if (paymentAccount.AccountType === PaymentAccountType.BankCard)
        {
            if (Card.TypeID === CreditCardType.Visa) {
                return `Visa: ${Card.CardNumber}`;
            }

            if (Card.TypeID === CreditCardType.MasterCard) {
                return `Master Card: ${Card.CardNumber}`;
            }

            if (Card.TypeID === CreditCardType.Discover) {
                return `Discover: ${Card.CardNumber}`;
            }

            if (Card.TypeID === CreditCardType.Maestro) {
                return `Maestro: ${Card.CardNumber}`;
            }

            if (Card.TypeID === CreditCardType.AmericanExpress) {
                return `American Express: ${Card.CardNumber}`;
            }
        }
        return null;
    }
}