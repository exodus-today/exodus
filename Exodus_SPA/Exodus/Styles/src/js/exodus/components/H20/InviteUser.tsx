import * as React from 'react';
import { getUserID, getApiKey, getLangValue } from '../../global';
import { bind } from '../../load';
const shortid = require('shortid');
import { notify } from '../Shared/Notifications';

interface SearchPageState  {
    query: string,
    searchResult: any[],
    loading: boolean
}

interface SearchPageProps {
    query: string;
    TagID: string;    
}

export class InviteUser extends React.Component<SearchPageProps, SearchPageState> {
    resultContainer: HTMLElement | null;
    constructor(props:any) {      
        super(props);
        this.state = { query: props.query, searchResult: [], loading: true }        
        this.onQueryChange = this.onQueryChange.bind(this);
        this.renderSearchItem = this.renderSearchItem.bind(this);
    }

    componentDidMount() {
        window.clearCompactSearch();
        this.updateSearchResults();                
    }

    onQueryChange(e: any) {
        this.setState({query: e.target.value});
        this.updateSearchResults();               
    }

    SetBold(str:string,  sub:string) {  
        var res = str.replace(new RegExp(sub, "ig"),'#'.repeat(sub.length))
        var exp = []
        for(var j=0; j<str.length; j++)
            {                    
                if (res[j]=='#') 
                    exp.push('<b style="color:red;">'+str[j]+'</b>');
                else 
                    exp.push(res[j])
            }             
        return exp.join('')
    }
    
    handleClickSendInvite =(UserID:string)=>{
        if (getUserID()==UserID) notify.error(getLangValue('YouCanNotInviteYourself'));       
        else fetch('/api/Tag/InviteUser?TagID='+this.props.TagID+
                        '&InviterUserID='+getUserID()+
                        '&InvitedUserID='+UserID, {credentials: 'include'})
        .then(res=>{
            if (res.ok)
            notify.success(getLangValue("InvitationSent"))
        })

        // fetch('/api/Intention/Get_ByIssuerID?api_key='+getApiKey()+'&UserID='+getUserID(), {credentials: 'include'})
        // let dic = { "TagID": this.props.TagID, InviterUserID: getUserID(), InvitedUserID:UserID };
        // fetch('/api/Events/Add?type=1',
        // {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json; charset=utf-8'
        //     },           
        //     body:                 
        //     JSON.stringify( dic ),
        //     method:'post', 
        //     credentials: 'include'}
        // )
        // .then(res=>{ if (res.ok) notify.success(getLangValue("InvitationSent")) })        
    }

    componentDidUpdate(){
        var elementArray = document.querySelectorAll('.UserName');       
        for (let i=0; i<elementArray.length; i++) {
            elementArray[i].innerHTML = this.SetBold(elementArray[i].innerHTML, this.state.query);
        }
    }

    updateSearchResults() {
        let that = this;

        this.setState({loading: true}, () => {            
            fetch('/api/Search/Users?api_key='+ getApiKey() + '&count=30&query='+ that.state.query.toLocaleUpperCase(), {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    that.setState({searchResult: json.Data, loading: false}, function () {
                        bind(that.resultContainer);                        
                    });
                });
        });              
    } 

    renderSearchItem(el: any) {
            return (
                <div key={shortid.generate()} className="ex-public-profile-relation-user__container" onClick={_=>this.handleClickSendInvite(el.UserID)}>
                    <img src={el.AvatarSmall} className="ex-public-profile-relations-image" />
                    <div className="UserName">{
                        el.UserFullName
                    }</div>
                </div>
            )
    }

    render() {        
        return (        
            <div>               
                <div className="ex-panels ex-scroll ex-scroll_with-free-space" style={{marginRight: '-18px'}}> 
                
                    <div className="ex-panel">
                        <div className="ex-panel__header">
                            {getLangValue('SearchForUserExodus')}
                            <input 
                            type="text"
                            className="ex-public-profile-search-input" 
                            value={this.state.query}
                            placeholder={getLangValue('EnterPartOfFullName')}
                            onChange={this.onQueryChange}
                            />                            
                        </div>
                        <div className="ex-panel__content">                            
                            <div ref={el => this.resultContainer = el} className="" data-loading={this.state.loading}>
                                <div className="ex-public-profile-relation-user">
                                    {
                                        this.state.searchResult.map(this.renderSearchItem)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        )     
    }     
}

export default InviteUser;