/*import * as React from 'react';
import { UserActions as TagUserActionsView } from '../../components/Tag/UserActions';
import { UserStore } from '../../stores/UserStore';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
import { Application } from '../../enums';

interface Props {
    UserID: string;
    TagID: string;
}

interface State {
    user: UserStore;
    paymentAccountList: PaymentAccountStore[],
}

export class UserActions extends React.Component<Props, State> {
    componentWillMount() {
        fetch(`/PaymentAccount/PaymentAccountList_JS?UserID=${this.props.UserID}`)
            .then(response=>response.json())
            .then(json=>this.setState({
                user: new UserStore(json.User),
                paymentAccountList: json.PaymentAccounts.map((item: any)=>new PaymentAccountStore(item)),
            }));
    }
    render() {
        if (this.state === null) return 'Loading...';
        const {
            props: { TagID },
            state: { user, paymentAccountList }
        } = this;

        return <TagUserActionsView
        user={user}
        //paymentAccountList={paymentAccountList}
        //ApplicationID={Application.H2O}
        TagID={TagID}/>; 
	    
    }
}*/

/*<UserActionsView
            user={user}
            paymentAccountList={paymentAccountList}
            ApplicationID={Application.H2O}
            TagID={TagID}/>; */