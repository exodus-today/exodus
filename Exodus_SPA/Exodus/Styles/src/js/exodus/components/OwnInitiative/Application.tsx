import * as React from 'react';
//import {LeftPanel}  from './LeftPanel';
//import {RightPanel}  from './RightPanel';

interface Props {
    
}

interface State {

}

export class OwnInitiativeApplication extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
                <div className="ex-list ex-grid_0-1-0">
                    <div className="ex-list__header">
                        <div className="ex-list__item">
                            <div className="ex-list__item-content">
                                OwnInitiative Application
                            </div>
                        </div>
                    </div>
                </div>);
    }
}
