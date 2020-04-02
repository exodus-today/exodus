import * as React from 'react';
import { PaymentAccountNew } from './PaymentAccountNew'
import { PaymentAccountStore } from '../../stores/PaymentAccountStore'
import { PaymentAccountEdit } from './PaymentAccountEdit'
import { getApiKey, getUserID } from '../../global';

interface Props {
    
}

interface State {
    paymentAccountList: PaymentAccountStore[]
}

export class PaymentAccountList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.loadData = this.loadData.bind(this);
    }
    componentWillMount() {
        this.loadData();
    }

    loadData=()=>{
        this.setState({paymentAccountList:[]});
        fetch('/api/PaymentAccount/Get_list?UserID='+getUserID(), {credentials: 'include'})
            .then(response=>response.json())            
            .then(json=>{this.setState({ paymentAccountList: json.Data.PaymentAccounts.map( (item: any)=>new PaymentAccountStore(item))}); })
            //.then(_=>console.log('PaymentAccountList'+this.state.paymentAccountList))
    }    

    render() {                 
        if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
        const { paymentAccountList } = this.state;
        return (
        <div>   {/*update={()=>{this.handleUpdate()}}*/}
            {
                paymentAccountList.map(
                    item=>
                        {
                        return <PaymentAccountEdit 
                                key={item.AccountID.toString()} 
                                PaymentsAccounts={item} 
                                update={this.loadData} />}) }
                        <PaymentAccountNew update={this.loadData} />
        </div>)
}}
