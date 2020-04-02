import * as React from 'react';
import { UserActions as UserActionsView } from '../../components/H20/UserActions';
import { UserStore } from '../../stores/UserStore';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
import { Application } from '../../enums';
import { getApiKey } from '../../global';

interface Props {
    UserID: string;
    TagID: string;
}

interface State {
    user: UserStore;
    paymentAccountList: PaymentAccountStore[]   
}

export class UserActions extends React.Component<Props, State> {
    componentWillMount() {
        //fetch(`/PaymentAccount/PaymentAccountList_JS?UserID=${this.props.UserID}`, {credentials: 'include'})
        fetch('/api/PaymentAccount/Get_List?UserID='+this.props.UserID, {credentials: 'include'}) 
            .then(response=>response.json())
            .then(json=>
                {
                this.setState({
                user: new UserStore(json.Data.User),
                paymentAccountList: json.Data.PaymentAccounts.map((item: any)=>{return new PaymentAccountStore(item)}),                
                })
                //console.log(json.PaymentAccounts)                
                }
            )
            //.then(_=>console.log(this.state.paymentAccountList));
    }
    render() {
        if (this.state === null) return '';
        //if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" style={{marginLeft:'50%'}}/></div>
        const {
            props: { TagID },
            state: { user, paymentAccountList }
        } = this;

        return <UserActionsView
            user={user}
            paymentAccountList={paymentAccountList}
            ApplicationID={Application.H2O}
            TagID={TagID}
        />;
    }
}
