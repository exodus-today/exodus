import * as React from 'react';
import { getLangValue, getApiKey } from '../../global';
import { bind } from '../../load';
const shortid = require('shortid');

interface SearchPageState  {
    query: string,
    searchResult: any[],
    loading: boolean,
    searchType: SearchType
}

interface SearchPageProps {
    query: string;
}

enum SearchType {
    All = 'all',
    Tags = 'tags',
    Users = 'users'
}

export class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    resultContainer: HTMLElement | null;

    constructor(props:any) {      
        super(props);
        this.state = { query: props.query, searchResult: [], searchType: SearchType.All, loading: true }

        this.onResultTypeChange = this.onResultTypeChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onQueryChange = this.onQueryChange.bind(this);
        this.renderSearchItem = this.renderSearchItem.bind(this);

        /*      
        this.handleClick = this.handleClick.bind(this);
        */
    }

    componentDidMount() {
        window.clearCompactSearch();
        this.updateSearchResults();
    }

    onResultTypeChange(e: any) {
        let that = this;
        this.setState({searchType: e.currentTarget.value}, () => {
            that.updateSearchResults();
        });
    }

    onKeyPress(e: any) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.updateSearchResults();
        }
    }

    onQueryChange(e: any) {
        this.setState({query: e.currentTarget.value});
    }

    updateSearchResults() {
        let that = this;
        this.setState({loading: true}, () => {
            let requestAction;
            switch(that.state.searchType) {
                case SearchType.All:
                    requestAction = 'Any';
                    break;

                case SearchType.Tags:
                    requestAction = 'Tags';
                    break;

                case SearchType.Users:
                    requestAction = 'Users';
                    break;
            }

            fetch('/api/Search/' + requestAction + '?api_key='+ getApiKey() + '&query='+ that.state.query, {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    that.setState({searchResult: json.Data, loading: false}, function () {
                        bind(that.resultContainer);
                    });
                });
        });
    }

    renderSearchItem(el: any) {
        if (el.TagID) {
            return (
                <div key={shortid.generate()} data-load={"/Application/AppH2O?TagID=" + el.TagID} data-target="#ex-route-1">
                    <img src={'/Styles/dist/images/tags/' + el.ApplicationID + '.svg'} />
                    <span>{el.Name}</span>
                </div>
            )
        } else {
            return (
                <div key={shortid.generate()} data-load={"/PublicProfile/UserDetail?UserID=" + el.UserID} data-target="#ex-route-1">
                    <img src={el.AvatarSmall} />
                    <span>{el.UserFullName}</span>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="ex-navigation"></div>
                <div className="ex-search ex-grid_0-1-1">
                    <div className="ex-search_container">
                        <div className="ex-search_title">{ getLangValue("SearchPageTitle") }</div>
                        <input 
                            type="text"
                            className="ex-search_input" 
                            value={this.state.query}
                            placeholder={ getLangValue("SearchPagePlaceholder") }
                            onKeyPress={this.onKeyPress}
                            onChange={this.onQueryChange}
                        />
                        <div className="ex-search_results">
                            <div className="ex-search_results-title">{ getLangValue("SearchPageResults") }:</div>
                            <div className="ex-search_results-types">
                                <input type="radio"
                                    name="ResultType"
                                    value={ SearchType.All }
                                    defaultChecked
                                    onChange={this.onResultTypeChange}
                                />
                                <span>{ getLangValue("SearchPageResultsAll") }</span>

                                <input type="radio"
                                    name="ResultType"
                                    value={ SearchType.Tags }
                                    onChange={this.onResultTypeChange}
                                />
                                <span>{ getLangValue("SearchPageResultsTags") }</span>

                                <input type="radio"
                                    name="ResultType"
                                    value={ SearchType.Users }
                                    onChange={this.onResultTypeChange}
                                />
                                <span>{ getLangValue("SearchPageResultsUsers") }</span>
                            </div>
                            <div ref={el => this.resultContainer = el} className="row ex-search_results-cols" data-loading={this.state.loading}>
                                <div className="col-md-6 ex-search_results-col">
                                    {
                                        this.state.searchResult
                                            .filter((item, index) => {return index % 2 == 0})
                                            .map(this.renderSearchItem)
                                    }
                                </div>
                                <div className="col-md-6 ex-search_results-col">
                                    {
                                        this.state.searchResult
                                            .filter((item, index) => {return index % 2 == 1})
                                            .map(this.renderSearchItem)
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

export default SearchPage;