import * as React from 'react';
import {getLangValue} from './../../global';

interface Props {
    
}

interface State {

}

export class AppInfo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space">
                <div className="ex-panel">
                    <div className="ex-panel__content">
                        <div className="row mb-4">
                            OwnInitiative AppInfo
                        </div>
                    </div>
                </div>
            </div>    
            );
    }
}
