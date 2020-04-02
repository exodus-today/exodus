import * as React from 'react'
import { getLangValue } from '../../global.js';
var CardType = ["BankAccount", "PayPal", "WebMoney", "Bitcoin"];
var BankCardType = ["Visa", "MasterCard","AmericanExpress","Discover", "Maestro"]

interface StateSelRow {
    ActiveCard:string;
    ActiveCardImg:string;  
    PaymentsAccounts2:Array<string>;
    CardType:Array<number>;
    TypeID:Array<number>;
    CardID:Array<string>;
    name:string; //Имя 
}

interface PropsSelRow {
    CardNumbers:Array<string>;
    AccountTypes:Array<number>;
    TypeID:Array<number>;
    CardID:Array<string>;
    onSelectAccountID:Function;
    name:string;
}

// <SelectPaymentCard CardNumbers={this.state.CardNumbers} AccountTypes={this.state.AccountTypes} TypeID={this.state.TypeID} />
export class SelectPaymentCard extends React.Component <PropsSelRow, StateSelRow> {
    constructor(props: PropsSelRow) {
        super(props);
        this.state = { ActiveCard:this.props.CardNumbers[0],       //Выбранная карта
                       ActiveCardImg: (this.props.AccountTypes[0] === 1)?   BankCardType[this.props.TypeID[0]]+".png":  CardType[this.props.TypeID[0]]+".svg",   //Активное изображение
                       PaymentsAccounts2:this.props.CardNumbers,   //Номера карт 
                       CardType:this.props.AccountTypes,           //тип карты - Банковская = 1 и другие 
                       TypeID:this.props.TypeID,                   //тип карты - Банковская = 1,2,3,4,5 () и другие 
                       name:this.props.name,
                       CardID:this.props.CardID
                    }
                    this.props.onSelectAccountID(this.props.CardID[0],this.props.TypeID[0]);
                    
        }  

    SetCard=(e:any)=>{      
        
    this.setState({ActiveCard:e.target.value,
                   ActiveCardImg:  (this.state.CardType[this.state.PaymentsAccounts2.indexOf(e.target.value)] === 1)? 
                                   BankCardType[this.state.TypeID[this.state.PaymentsAccounts2.indexOf(e.target.value)]]+".png": 
                                   CardType[this.state.TypeID[this.state.PaymentsAccounts2.indexOf(e.target.value)]]+".svg"
                  });
    this.props.onSelectAccountID(this.state.CardID[this.state.PaymentsAccounts2.indexOf(e.target.value)],
                                 this.state.CardType[this.state.PaymentsAccounts2.indexOf(e.target.value)]);                  
    }
    

    render() {        
        var option = new Array<object>();           
        this.props.CardNumbers.forEach((u:string,i) => { option.push(<option key={u} value={u}>{this.state.CardType[i]==1?BankCardType[this.state.TypeID[i]-1]:CardType[this.state.TypeID[i]-1]}: {u}</option>); });  
       return (    
        <div className="row mb-4">
            <div className="col-md-5">
                <label>{getLangValue('MapAccountWallet')}:</label>
            </div>
            {/* <div className="col-md-3">
                    <img src={"/Styles/dist/images/payment/"+[this.state.ActiveCardImg]} style={{height: '30px',paddingTop:'5px'}} />                    
            </div> */}
            <div className="col-md-7">                                                    
                <select className="form-control" name="card" onChange={this.SetCard}>
                    {option}
                </select>                                                    
            </div>
        </div>  
      );
    }
}