import * as React from 'react';
//import { IntentionCreate } from '../Intention/IntentionCreate';
//import { IntentionUpdate } from '../Intention/IntentionUpdate';
//import { TransactionCreateComponent } from '../Transaction/TransactionCreateComponent';
//import { User } from '../../models';
//import { Status, Size } from '../../enums';
//import { TransactionStore } from '../../stores/TransactionStore';
//import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
//import { UserStore } from '../../stores/UserStore';
//import { Application } from '../../enums';
//import * as moment from 'moment';
/*import { TagCreate } from '../../components/Tag/TagCreate'; 

interface Props {
    user: UserStore;
    //paymentAccountList: PaymentAccountStore[],
    //ApplicationID: Application,
    TagID?: string,
}

interface State {
    action: Action;
    //transaction: TransactionStore,
}

enum Action {
    UserActions,
//    IntentionCreate,
//    IntentionUpdate,
//    TransactionCreate,
    TagCreate	
}

export class UserActions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            action: Action.UserActions,
//            transaction: new TransactionStore({
//                UserReceiver: props.user,
//                PaymentAccount: props.paymentAccountList[0],
//                TransactionDate: moment(),
            //})
        };
    }

    render() {
        const {
            props: { user }, // { user, paymentAccountList, ApplicationID, TagID },
            state: { action }//{ action, transaction }
        } = this;

        return (
            <React.Fragment>
                {action === Action.TagCreate && (
                    <TagCreate user={user} />
                )}
            </React.Fragment>
        );
    }
}


/*
                {action === Action.TransactionCreate && (
                    <TransactionCreateComponent
                        paymentAccountList={paymentAccountList}
                        transaction={transaction}
                        ApplicationID={ApplicationID}
                        TagID={TagID}
                    />
                )}
                {action === Action.IntentionUpdate && (
                    <IntentionUpdate />
                )}
                {action === Action.UserActions ? (
                    <React.Fragment>
                        <div className="text-muted mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus illo saepe illum aliquid molestiae soluta doloribus sit suscipit atque laudantium porro, quisquam dolore deserunt iusto beatae obcaecati, aspernatur deleniti.</div>
                        <div onClick={e => this.setState({action: Action.TransactionCreate})} className="btn btn-outline-danger w-100 mb-4">Создать транзакцию</div>
                        <div onClick={e => this.setState({action: Action.IntentionCreate})} className="btn btn-outline-warning w-100">Помогать регулярно</div>
                        <div><br/></div>
                        <div onClick={e => this.setState({action: Action.TagCreate})} className="btn btn-outline-primary w-100">Создать тег</div>
                    </React.Fragment>
                ) : (
                    <input
                        onClick={e => this.setState({action: Action.UserActions})}
                        className="btn btn-outline-secondary w-100"
                        value="Отмена"
                    />
                )}*/
