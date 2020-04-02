import * as React from 'react';
//import { IntentionCreate } from '../Intention/IntentionCreate';
//import { IntentionUpdate } from '../Intention/IntentionUpdate';
import { TransactionCreateComponent } from '../Transaction/TransactionCreateComponent';
import { TransactionStore } from '../../stores/TransactionStore';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
import { UserStore } from '../../stores/UserStore';
import { Application } from '../../enums';
import { getUserID } from '../../global'
import * as moment from 'moment';

interface Props {
    user: UserStore
    paymentAccountList: PaymentAccountStore[]
    ApplicationID: Application
    TagID?: string
}

interface State {
    action: Action
    transaction: TransactionStore
    user:UserStore
}

enum Action {
    UserActions,
    IntentionCreate,
    IntentionUpdate,
    TransactionCreate,
    TagCreate	
}

export class UserActions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            action: Action.UserActions,
            transaction: new TransactionStore({
            UserReceiver: props.user,
            PaymentAccount: props.paymentAccountList[0],
            TransactionDate: moment(),            
            }),
            user:props.user            
        };        
    }

    render() {
        const {
            props: { paymentAccountList, ApplicationID, TagID }, // -user
            state: { action, transaction }
        } = this;
        return (
            <React.Fragment>              
                {/* { (action === Action.IntentionCreate) && 
                ( <IntentionCreate user={user} />
                )} */}
                {action === Action.TransactionCreate && (
                    <TransactionCreateComponent
                        paymentAccountList={paymentAccountList}
                        transaction={transaction}
                        ApplicationID={ApplicationID}
                        TagID={TagID}
                        close={() => this.setState({action: Action.UserActions})} 
                    />
                )}
                {/* {action === Action.IntentionUpdate && (
                    <IntentionUpdate />
                )} */}
                {getUserID()!==this.state.user.UserID.toString() &&
                (
                        action === Action.UserActions ? (
                        <React.Fragment>
                            <div className="text-muted mb-5"></div>

                            {this.state.user.UserStatus==3 && (
                                <div onClick={e => this.setState({action: Action.TransactionCreate})} className="btn btn-outline-danger w-100 mb-4">Создать транзакцию</div>
                                )
                            }
                            {this.state.user.UserStatus==2 && (
                                <div onClick={e => this.setState({action: Action.IntentionCreate})} className="btn btn-outline-warning w-100">Помогать регулярно</div>
                                )
                            }
                            <div><br/></div>                        
                        </React.Fragment>
                    ) : (
                        <div onClick={e => this.setState({action: Action.UserActions})}
                            className="btn btn-outline-secondary w-100">Отмена</div>
                    )
                )}
            </React.Fragment>
        );
    }
}
