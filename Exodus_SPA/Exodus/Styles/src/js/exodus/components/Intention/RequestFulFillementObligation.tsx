import * as React from 'react';
import { Obligation } from '../../classes/Obligation';

interface Props {
    close:Function
}

interface State {
  
}

export class RequestFulFillementObligation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);       
    }
  
    render() {        
        return (
           <div>  
              <button onClick={()=>this.props.close()}>CloseReact</button>
           </div>
        );
    }
}
