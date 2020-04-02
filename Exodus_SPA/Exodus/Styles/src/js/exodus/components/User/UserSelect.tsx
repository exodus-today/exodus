import * as React from 'react';
import { getLangValue, getApiKey } from '../../global';
import { bind } from '../../load';
const shortid = require('shortid');

interface SearchPageState  {
    query: string,
    searchResult: any[],
    loading: boolean
}

interface SearchPageProps {
    query: string;    
    fun:Function;
    count:number;
}

export class UserSelect extends React.Component<SearchPageProps, SearchPageState> {
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
    
    handleClickSendInvite =(UserID:string, UserFullName:string)=>{
        this.props.fun( UserID, UserFullName );
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
            fetch('/api/Search/Users?api_key='+ getApiKey() + '&count='+this.props.count+'&query='+ that.state.query.toLocaleUpperCase(), {credentials: 'include'})
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
                <div key={shortid.generate()} className="ex-public-profile-relation-user__container" onClick={_=>this.handleClickSendInvite(el.UserID, el.UserFullName)}>
                    <img src={el.AvatarSmall} className="ex-public-profile-relations-image" />
                    <div className="UserName">{
                        el.UserFullName
                    }</div>
                </div>
            )
    }

    render() {        
        return (        
            <div style={{background:'#f2f2f2', border:'1px solid #ccc'}}>        
                    <div className="row mb-4">    
                        <div className="col-md-4 d-flex align-items-center" style={{marginLeft:5}}>
                            <strong>{getLangValue('SearchForUserExodus')}</strong>
                        </div>

                        <div className="col-md-6">
                            <input 
                            type="text"
                            className="ex-public-profile-search-input" 
                            value={this.state.query}
                            placeholder={getLangValue('EnterPartOfFullName')}
                            onChange={this.onQueryChange}
                            />                            
                        </div>
                    </div>
                    <div className="row mb-4" style={{paddingLeft:15,paddingRight:15}}>
                        <div ref={el => this.resultContainer = el} className="" data-loading={this.state.loading}>
                            <div className="ex-public-profile-relation-user">
                                {
                                    this.state.searchResult.map(this.renderSearchItem)
                                }
                        </div>
                    </div>    
                </div>
        </div>        
        )     
    }     
}

export default UserSelect;