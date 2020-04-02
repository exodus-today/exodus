import * as React from 'react';
import { Transaction } from '../../classes/Transaction';
import * as moment from 'moment';
import { getLangValue, getApiKey, getUserID, getLang } from '../../global.js';
import { notify } from '../Shared/Notifications';
import { FilterTransaction } from '../../enums';


interface Props {
    UserID :number
    itemID: number 
}

interface State {
    TransactionReceiver: Array<Transaction>; 
    TransactionSender: Array<Transaction>; 
    TransactionActive: Transaction|null;
    page:number;
    x1:object;
    x2:object;
    UploadComplite:boolean;
    OpenObligation:number;
    OneTransaction:Transaction | null;
}

export class Transactions extends React.Component<Props, State> {
    constructor(props: Props) {
         super(props);
         this.state = { page:1, 
                        x1:{background:"#95c61e",color:"#fff"},x2:{},
                        TransactionReceiver:[],
                        TransactionSender:[],
                        TransactionActive:null,
                        UploadComplite:false,
                        OpenObligation:0,
                        OneTransaction:null,
                    };
    }  
    
    loadReceiver=()=>{
        this.setState({UploadComplite:false});        
        fetch('/api/Transaction/GetAll_ByUserReceiver?UserID='+getUserID(), {credentials: 'include'})
            .then(response => response.json())
            .then(
                json=>{
                this.setState({ TransactionReceiver: json.Data.map((item: any)=> { return new Transaction(item) }) }) 
                this.setState({UploadComplite:true})}             
            )
        }  
        
    loadSender=()=>{
        this.setState({UploadComplite:false});        
        fetch('/api/Transaction/GetAll_ByUserSender?UserID='+getUserID(), {credentials: 'include'})
            .then(response => response.json())
            .then(
                json=>{ 
                    this.setState({ TransactionSender: json.Data.map((item: any)=> { return new Transaction(item) }) })              
                    this.setState({UploadComplite:true})}
                    )
            }          
    loadByID=(id:number)=>{
        this.setState({UploadComplite:false});        
        fetch('/api/Transaction/Get_ByID?TransactionID='+id, {credentials: 'include'})
            .then(response => response.json())
            .then(
                json=>{ 
                    this.setState({ TransactionActive: new Transaction(json.Data) })
                    this.setState({UploadComplite:true})}
                    )
            }  

    componentWillMount() {
        console.log(this.props)
        if ((this.props.itemID!=0) || (this.props.itemID!=null)) {
            this.setState({UploadComplite:false});        
            fetch('/api/Transaction/Get_ByID?TransactionID='+this.props.itemID, {credentials: 'include'})
                .then(response => response.json())
                .then(
                    json=>{
                    this.setState({ OneTransaction: new Transaction(json.Data) }) 
                    console.log(json.Data)
                    this.setState({UploadComplite:true})}             
                )
            }
        if (this.props.itemID>0) 
            this.loadByID(this.props.itemID)
        else
        {
            this.loadReceiver() 
            this.loadSender()
        }
    } 
       
    ConfirmSender = (TransactionID:number)=>{
       
        fetch("api/Transaction/ConfirmBySender?TransactionID="+
                TransactionID+"&SenderID="+getUserID()+"&IsConfirmedBySender=true",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:'',
            credentials: 'include'
        })
        this.loadSender() 
    }

    ConfirmReceiver = (TransactionID:number)=>{
        fetch("api/Transaction/ConfirmByReciver?TransactionID="+
                TransactionID+"&ReciverID="+getUserID()+"&IsConfirmedByReceiver=true",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:'',
            credentials: 'include'
        })
        this.loadReceiver()         
    }
    buttonClickAll =()=> {
        this.setState({page:FilterTransaction.TransactionReceiver, x1:{background:"#95c61e",color:"#fff"},x2:{}})
    }   
    buttonClickArhiv =()=> {
        this.setState({page:FilterTransaction.TransactionSender, x1:{},x2:{background:"#459edb",color:"#fff"}})
    }      
    render() {
        if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>        
        var now = moment().format("DD.MM.YYYY");        
        const { page } = this.state;
        const head =        <tr>
                                <th scope="col">
                                    {getLangValue('Date')}<br/>
                                </th>
                                <th scope="col">
                                    {(page === FilterTransaction.TransactionReceiver) && getLangValue('FromWhom')}
                                    {(page === FilterTransaction.TransactionSender) && getLangValue('To')}
                                    <br/>
                                    <span style={{fontSize:12, fontWeight:'normal'}}>
                                    {getLangValue('MapAccountWallet')} </span>
                                </th>
                                <th scope="col">
                                    {getLangValue('Amount')}
                                </th>                                   
                                <th scope="col">
                                    {getLangValue('Tag')}<br/>
                                    {getLangValue('Application')}
                                </th>
                                <th scope="col">
                                    {getLangValue('Obligation')}
                                </th>
                                <th scope="col">
                                    {getLangValue('Confirmed')}<br/>
                                    {getLangValue('Sender')}
                                </th>
                                <th scope="col">
                                    {getLangValue('Confirmed')}<br/>
                                    {getLangValue('Recipient')}
                                </th>                                
                            </tr>
                                
        return (
        <div id="ex-route-2"> 
           <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" >
           <div className="ex-panel">
             <div className="ex-panel__header" style={{lineHeight:"50px"}}>
               <i className="ex-panel__icon">#</i>
               {getLangValue('Transaction')} : {now} 
            </div>
            <div className="ex-panel__content_big">
                
                {(this.props.itemID==0 || this.props.itemID==null) && (
                <button onClick={this.buttonClickAll} className="btn btn-outline-success w-80" style={this.state.x1}>
                {getLangValue('Received')} </button> 
                )}
                &nbsp;
                {(this.props.itemID==0 || this.props.itemID==null) && (
                <button onClick={this.buttonClickArhiv} 
                     className="btn btn-outline-primary w-80"
                     style={this.state.x2}>{getLangValue('Sent')}
                </button> 
                )}

        { (this.props.itemID==0 || this.props.itemID==null ) && (page === FilterTransaction.TransactionReceiver) && (
        <div>
            <table>
                <tbody> 
                    {head}  
                        { !this.state.UploadComplite && 
                        (<tr>
                            <td colSpan={7}>
                            <div style={{position:"relative",marginLeft:'50%',marginTop:'2%',marginBottom:'2%'}}> 
                                <img src="styles/dist/images/loading.svg" alt="" />  
                                </div>
                            </td>
                        </tr>)}    
                </tbody>                        
                                           
                    {this.state.TransactionReceiver.map((number,index) => (
                    <tbody key={index}>     
                        <tr>
                            <td scope="row">
                                <strong> {number.TransactionDateTime.toString().substr(8,2)}.
                                         {number.TransactionDateTime.toString().substr(5,2)}.
                                         {number.TransactionDateTime.toString().substr(0,4)}
                                </strong><br/>
                                <span style={{fontSize:12}}>
                                    {number.TransactionDateTime.toString().substr(11,8)}
                                </span>
                            </td>
                            {/* От кого */}
                            <td>
                                <strong>
                                    {number.TransactionSender.UserFullName}
                                </strong><br/>
                                    {number.TransactionMemo}
                                <span style={{fontSize:12}}></span></td>  
                            {/* Сумма */}
                            <td style={{width:'60px', background:'#e5fcb9', textAlign:'center'}}>
                                <b>{number.TransactionAmount}</b> $
                            </td>
                            {/*  Тег / Приложение */}
                                <td style={{width:'150px', padding:1, margin:0, fontSize:'16px', textAlign:'center'}}><b>                                                             
                                {(number.Tag.TagID==0)?getLangValue('UserProfile'):
                                    (getLang()=='en')?number.Tag.NameEng:number.Tag.NameRus
                                }</b><br/>
                                {(getLang()=='en')?number.Application.ApplicationNameEng:number.Application.ApplicationNameRus}
                                </td>
                            {/* Обязательство */}
                            <td style={{fontSize:14, fontWeight:'normal', textAlign:'center'}}>
                                {(number.Tag.TagID==0)?getLangValue('No'):
                            (getLang()=='en')?
                                number.Obligation.ObligationKind.ObligationNameEng:
                                number.Obligation.ObligationKind.ObligationNameRus
                            }
                            </td>
                            {/* Подтверждено отправителем */}
                            <td style={{fontSize:14, fontWeight:'normal', padding:0, textAlign:'center' }}>
                                {number.IsConfirmedBySender?getLangValue('Yes'):getLangValue('No')}
                            </td>
                            {/* Подтверждено получателем */}
                            <td style={{fontSize:14, fontWeight:'normal', padding:0, width:'100px', textAlign:'center'}}>
                                {number.IsConfirmedByReceiver?getLangValue('Yes'):
                                <button className="btn btn-outline-primary w-80" 
                                        onClick={()=>this.ConfirmReceiver(number.TransactionID)}
                                        style={{borderColor:'white'}}>{getLangValue('Confirm')}</button>
                            }                            
                            </td>                                                        
                        </tr>
                    </tbody>
                    ))}
            </table>                 
        </div>
        )}  

        { (this.props.itemID==0 || this.props.itemID==null ) &&  page === FilterTransaction.TransactionSender && (
            <div>
                <table>
                    <tbody>  
                        {head}            
                    </tbody>  
                                                  
                        {this.state.TransactionSender.map((number,index) =>( 
                        <tbody key={index}> 
                        <tr>
                            <td scope="row">
                                <strong> {number.TransactionDateTime.toString().substr(8,2)}.
                                         {number.TransactionDateTime.toString().substr(5,2)}.
                                         {number.TransactionDateTime.toString().substr(0,4)}
                                </strong><br/>                                        
                                <span style={{fontSize:12}}>
                                    {number.TransactionDateTime.toString().substr(11,8)}
                                </span>
                            </td>
                            {/* От кого */}
                            <td>
                                <strong>
                                    {number.TransactionReceiver.UserFullName}
                                </strong><br/>
                                {number.TransactionMemo}
                                <span style={{fontSize:12}}></span></td>  
                            {/* Сумма */}
                            <td style={{width:'60px', background:'#459edb', color:'white', textAlign:'center'}}>
                                <b>{number.TransactionAmount}</b> $
                            </td>                        
                            {/* Теш / приложение */}
                            <td style={{width:'150px', padding:1, margin:0, fontSize:'16px', textAlign:'center'}}><b>
                                {(number.Tag.TagID==0)?getLangValue('UserProfile'):
                                    (getLang()=='en')?
                                    number.Tag.NameEng:
                                    number.Tag.NameRus
                                }</b><br/>
                                {(getLang()=='en')?
                                    number.Application.ApplicationNameEng:
                                    number.Application.ApplicationNameRus}                                
                            </td>
                            {/* Обязательство */}
                            <td style={{fontSize:14, fontWeight:'normal', textAlign:'center'}}>
                                {(number.Tag.TagID==0)?getLangValue('No'):
                                (getLang()=='en')?
                                    number.Obligation.ObligationKind.ObligationNameEng:
                                    number.Obligation.ObligationKind.ObligationNameRus
                                }
                            </td> 
                            {/* Подтверждено отправителем */}
                            <td style={{fontSize:14, fontWeight:'normal', padding:0, width:'100px', textAlign:'center'}}>
                                {number.IsConfirmedBySender?getLangValue('Yes'):
                                <button className="btn btn-outline-primary w-80" 
                                        style={{borderColor:'white'}}
                                        onClick={()=>this.ConfirmSender(number.TransactionID)}>
                                        {getLangValue('Confirm')}
                                </button>}
                            </td>
                            {/* Подтверждено получателем */}
                            <td style={{fontSize:14, fontWeight:'normal', padding:0, textAlign:'center'}}>
                            {number.IsConfirmedByReceiver?getLangValue('Yes'):getLangValue('No')}                                                        
                            </td>                                                          
                        </tr>
                        </tbody>
                        ))}
                    
                </table>                 
            </div>
            )}   

        { (this.props.itemID>0 ) && (
        <div>
            <table>
                <tbody>  
                    {head}            
                </tbody>  
                                              
                    { 
                    
                    ( this.state.TransactionActive!=null )&&
                    ( this.state.TransactionActive.TransactionID == this.props.itemID )&&
                    ( <tbody key={this.state.TransactionActive.TransactionID}> 
                    <tr>
                        <td scope="row">
                            <strong> {this.state.TransactionActive.TransactionDateTime.toString().substr(8,2)}.
                                     {this.state.TransactionActive.TransactionDateTime.toString().substr(5,2)}.
                                     {this.state.TransactionActive.TransactionDateTime.toString().substr(0,4)}
                            </strong><br/>                                        
                            <span style={{fontSize:12}}>
                                {this.state.TransactionActive.TransactionDateTime.toString().substr(11,8)}
                            </span>
                        </td>
                        {/* От кого */}
                        <td>
                            <strong>
                                {this.state.TransactionActive.TransactionReceiver.UserFullName}
                            </strong><br/>
                            {this.state.TransactionActive.TransactionMemo}
                            <span style={{fontSize:12}}></span></td>  
                        {/* Сумма */}
                        <td style={{width:'60px', background:'#459edb', color:'white', textAlign:'center'}}>
                            <b>{this.state.TransactionActive.TransactionAmount}</b> $
                        </td>                        
                        {/* Теш / приложение */}
                        <td style={{width:'150px', padding:1, margin:0, fontSize:'16px', textAlign:'center'}}><b>
                            {(this.state.TransactionActive.Tag.TagID==0)?getLangValue('UserProfile'):
                                (getLang()=='en')?
                                this.state.TransactionActive.Tag.NameEng:
                                this.state.TransactionActive.Tag.NameRus
                            }</b><br/>
                            {(getLang()=='en')?
                                this.state.TransactionActive.Application.ApplicationNameEng:
                                this.state.TransactionActive.Application.ApplicationNameRus}                                
                        </td>
                        {/* Обязательство */}
                        <td style={{fontSize:14, fontWeight:'normal', textAlign:'center'}}>
                            {(this.state.TransactionActive.Tag.TagID==0)?getLangValue('No'):
                            (getLang()=='en')?
                            this.state.TransactionActive.Obligation.ObligationKind.ObligationNameEng:
                            this.state.TransactionActive.Obligation.ObligationKind.ObligationNameRus
                            }
                        </td> 
                        {/* Подтверждено отправителем */}
                        <td style={{fontSize:14, fontWeight:'normal', padding:0, width:'100px', textAlign:'center'}}>
                            {this.state.TransactionActive.IsConfirmedBySender?getLangValue('Yes'):
                            <button className="btn btn-outline-primary w-80" 
                                    style={{borderColor:'white'}}
                                    onClick={()=>this.ConfirmSender(this.state.TransactionActive==null?0:
                                    this.state.TransactionActive.TransactionID)}>
                                    {getLangValue('Confirm')}
                            </button>}
                        </td>
                        {/* Подтверждено получателем */}
                        <td style={{fontSize:14, fontWeight:'normal', padding:0, width:'100px', textAlign:'center'}}>
                            {this.state.TransactionActive.IsConfirmedByReceiver?getLangValue('Yes'):
                            <button className="btn btn-outline-primary w-80" 
                                    onClick={()=>this.ConfirmReceiver(this.state.TransactionActive==null?
                                        0:
                                        this.state.TransactionActive.TransactionID)}
                                    style={{borderColor:'white'}}>{getLangValue('Confirm')}</button>
                        }                            
                        </td>                                                          
                    </tr>
                    </tbody>
                    )}                
            </table>                 
        </div>
        )}                   

                    </div>            
                </div>
            </div>
        </div>);
    }
} 
