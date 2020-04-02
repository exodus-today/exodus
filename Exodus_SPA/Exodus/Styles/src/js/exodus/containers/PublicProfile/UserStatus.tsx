import * as React from 'react';
import { UserActions } from '../../components/H20/UserActions';
import { StatusIndicator } from '../../components/User/StatusIndicator';
import { StatusLabel } from '../../components/User/StatusLabel';
import { StatusAmount } from '../../components/User/StatusAmount';
import { Size, Application } from '../../enums';
import { UserStore } from '../../stores/UserStore';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';

interface Props {
    UserID: string;
}

interface State {
    user: UserStore;
    paymentAccountList: PaymentAccountStore[],
}

export class UserStatus extends React.Component<Props, State> {
    componentWillMount() {
        fetch(`/api/PaymentAccount/Get_List?UserID=${this.props.UserID}`, {credentials: 'include'})
            .then(response=>response.json())
            .then(json=>this.setState({
                user: new UserStore(json.Data.User),
                paymentAccountList: json.Data.PaymentAccounts.map((item: any)=>new PaymentAccountStore(item)),
            }) );
            
    }
    render() {
        if (this.state === null) return 'Loading...';        
        let { user, paymentAccountList } = this.state;
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-3">
                            <StatusIndicator status={user.UserStatus} size={Size.Large} />
                        </div>
                        {user.UserStatus == 1 && (
                            <div className="col-9">                            
                                <StatusLabel status={user.UserStatus} size={Size.Large} />                                
                            </div>
                        )}
                        {user.UserStatus == 2 && (
                            <div className="col-9">                            
                                <StatusLabel status={user.UserStatus} size={Size.Large} />
                                <StatusAmount status={user.UserStatus} size={Size.Large} />                            
                            </div>
                        )}
                        {user.UserStatus == 3 && (
                            <div className="col-9">                            
                                <StatusLabel status={user.UserStatus} size={Size.Large} />
                                <StatusAmount status={user.UserStatus} size={Size.Large} />                            
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    {user.UserStatus != 1 && (
                    <UserActions
                        user={user}
                        paymentAccountList={paymentAccountList}
                        ApplicationID={Application.Direct}
                    />
                    )}
                </div>
            </div>
        );
    }
}
