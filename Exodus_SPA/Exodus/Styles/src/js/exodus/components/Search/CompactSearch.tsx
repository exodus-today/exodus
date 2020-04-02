import * as React from 'react';
import { getLangValue, getApiKey } from '../../global';
import { bind, load } from '../../load';
import { Application } from '../../enums';
import { closeMainMenu } from '../../main-menu';
const shortid = require('shortid');

interface CompactSearchState  {
    searchQuery: string,
    searchResult: any[],
    loading: boolean
}

declare global {
    interface Window { clearCompactSearch: Function; }
}

export class CompactSearch extends React.Component<any, CompactSearchState> {
searchContainer: HTMLElement | null;
searchBtn: HTMLElement | null;
searchAllBtn: HTMLElement | null;
typingTimeout: any;

    constructor(props:any) {      
        super(props);
        this.state = { searchQuery: '', searchResult: [], loading: false };
        this.handleChange = this.handleChange.bind(this);       
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.loadSearchPage = this.loadSearchPage.bind(this);
        this.typingTimeout = null;

        let self = this;
        window.clearCompactSearch = () => {
            self.setState({searchQuery: '', searchResult: [], loading: false});
        }
    }

    componentDidMount() {
        load(this.searchBtn);
        load(this.searchAllBtn);
    }

    getSearchContainer() {
        if (this.searchContainer == null) {
            this.searchContainer = document.getElementById('ex-header__search');
        }
        return this.searchContainer;
    }

    handleChange(event:any) {
        const self = this;

        let searchStr = event.target.value;
        self.setState({searchQuery: searchStr, loading: true});

        clearTimeout(this.typingTimeout);

        this.typingTimeout = setTimeout(function () {
            fetch('/api/Search/Any?api_key='+ getApiKey() + '&count=5' +'&query='+ self.state.searchQuery.trim(), {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    self.setState({searchResult: json.Data, loading: false}, function () {
                        bind(self.getSearchContainer());
                    });
                });
        }, 1000);
    }

    loadSearchPage() {
        closeMainMenu();
        if (this.searchBtn) {
            this.searchBtn.click();
        }
    }

    handleKeyPress(event:any) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.loadSearchPage();
        }
    }

    render() {
        return (
            <div className="ex-header__search-form">
                <input 
                    type="text"
                    placeholder={getLangValue("SearchPagePlaceholder")}
                    className="ex-header__search-text"
                    onChange={this.handleChange}
                    value={this.state.searchQuery}
                    onKeyPress={this.handleKeyPress}
                />

                <button ref={el => this.searchBtn = el} className="ex-header__search-submit" data-load={"/Search/Index?query=" + this.state.searchQuery} data-target="#ex-route-1" />

                <div className="ex-header__search-results" data-loading={this.state.loading}>
                    {this.state.searchResult.map(el => {
                        if (el.TagID) {
                            let appType = el.ApplicationID == Application.H2O ? 'AppH2O' : 'AppOwnIniciative';
                            return (
                                <div key={shortid.generate()} data-load={"/Application/" + appType + "?TagID=" + el.TagID} data-target="#ex-route-1">
                                    <img src={'/Styles/dist/images/tags/' + el.ApplicationID + '.svg'} />
                                    <span>{el.Name}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div key={shortid.generate()} data-load={"/PublicProfile/UserDetail?UserID=" + el.UserID + "&TagID=0"} data-target="#ex-route-1">
                                    <img src={el.AvatarSmall} />
                                    <span>{el.UserFullName}</span>
                                </div>
                            )
                        }
                    })}
                    <div className="ex-search-more" ref={el => this.searchAllBtn = el} hidden={this.state.searchResult.length == 0} data-load={"/Search/Index?query=" + this.state.searchQuery} data-target="#ex-route-1" >{getLangValue("SearchAll") + " «" + this.state.searchQuery + "»"}</div>
                </div>
            </div>
        )
    }
}

export default CompactSearch;