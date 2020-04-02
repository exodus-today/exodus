import * as React from 'react';

// class UserRow extends React.Component <any> {
//     render() {
//       var name = //this.props.users.stocked ?
//         this.props.users.UserName;
//         // <span style={{color: 'red'}}>
//         //   {this.props.users.UserName}
//         // </span>;
//       return (
//         <tr>
//           <td>{name}</td>
//           <td>{this.props.users.UserID}</td>
//         </tr>
//       );
//     }
//   }

//   class UsersTable extends React.Component<any> {
//     render() {      
//     var rows = new Array<object>();
//        this.props.users.forEach((u:any) => {
//          if (u.UserName.toUpperCase().indexOf(this.props.filterText.toUpperCase()) === -1) {
//            return;
//          }
//         rows.push(<UserRow users={u} key={u.UserName} />);
//       });
//       return (
//         <table style={{width:'400px'}}>
//           <thead>
//             <tr>
//               <th>UserName</th>
//               <th>UserID</th>
//             </tr>
//           </thead>
//           <tbody>{rows}</tbody>          
//         </table>
//       );
//     }
//   }

  class UsersSelect extends React.Component<any> {
    constructor(props:any) {      
      super(props);
      this.state ={ avatar:''}      
    }  
    changeAvatar =(e:any)=>{
      this.setState({avatar:e.target.value})
      this.props.avatar(e.target.value)          
    }
    
    render() {      
    let rows = new Array<object>();
       this.props.users.forEach((u:any) => {
        if (u.UserName != undefined)
         if (u.UserName.toUpperCase().indexOf(this.props.filterText.toUpperCase()) === -1) {
           return;
         }
        rows.push(<option key={u.UserID} value={u.UserID}>{u.UserName} </option>);    {/*selected={(u.UserID==this.props.defUser)}*/}
      });
      return (
        <select className="form-control" onChange={ this.changeAvatar } defaultValue={this.props.defUser}>
          {rows}
        </select>
      );
    }
  }

  // interface PropsSearchBar {
  //   users:Array<object>;
  //   label:string;
  //   filterText:string|null;
  //   onUserInput:string;    
  // }

  interface StateSearchBar  {
    avatar:string
  }

  class SearchBar extends React.Component<any, StateSearchBar> {
    private filterTextInput: HTMLInputElement|null;
    constructor(props:any) {      
      super(props);
      this.state = { avatar:'' }
      this.handleChange = this.handleChange.bind(this);       
    }

     handleChange() {
          this.props.onUserInput(
            this.filterTextInput == null ? null:this.filterTextInput.value
          );   
     }
     updateAvatar = (value:string) => {       
        this.props.onSelectUser(value)   
     }
    render() {
      return ( //Строка пользователь                
          <div className="row mb-4">
            <div className="col-md-5">
              <label className="labelR">{this.props.label}</label>
            </div>
            <div className="col-md-5">
              <UsersSelect 
              users={this.props.users}
              filterText={this.props.filterText}
              avatar={this.updateAvatar}     
              defUser={this.props.defUser}         
              />              
            </div>
            <div className="col-md-2">
            {/* { <img src={this.state.avatar} style={{width: '100px', 
                                                  height: '100px', 
                                                  border:'5px solid #e0e0e0', 
                                                  borderRadius:'50%', 
                                                  position:'absolute', 
                                                  left:'-450px',
                                                  top:'-20px'}} /> } */}
              {<input 
                type="text"
                className = "form-control"
                placeholder="Search..."
                value={this.props.filterText}            
                ref={(input) => { this.filterTextInput = input; }}
                onChange={this.handleChange}                 
                 />}
            </div>          
          </div>     
      );
    }
  }

  interface State {
    filterText :string|null;
    UserID:number;
    UsersName:Array<string>;
    UsersAvatar:Array<string>;
  }

  export class UserList extends React.Component<any, State> {
    constructor(props:any) {
      super(props);
      this.state = {
        filterText: '',
        UserID:this.props.UserID,
        UsersName:[],
        UsersAvatar:[]
      };      
      this.props.onSelectUser(this.state.UserID);
      this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentWillMount() {
      fetch('api/Tag/GetUsers?TagID='+this.props.TagID, {credentials: 'include'})
      .then(response=>response.json())
     }


    handleUserInput(filterText:string) { this.setState({ filterText: filterText }); }  
    handleUser=(value:number)=>{this.props.onSelectUser(value)} 
    render() {
      return (               
          <SearchBar 
            filterText={this.state.filterText}           
            onUserInput={this.handleUserInput}
            users={this.props.users}
            label={this.props.label}
            onSelectUser={this.handleUser}
            defUser={this.props.UserID}
          />
          /* <UsersTable            
            users={this.props.users}
            filterText={this.state.filterText}
          /> */

      );
    }
  }
