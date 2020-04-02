import * as React from 'react';
import { lang } from 'moment';
import { getUserID, getApiKey } from '../../global';

interface Props {
	UserID:number;
	AvatarBIG:string;
	UserEmail:string;
	UserFirstName:string;
	UserLastName:string;
	lang:string;
}



export class StatusInfo extends React.Component < any, any > {
	constructor(props: Props) {
		super(props);
		this.state = {
			file: '', 
			imagePreviewUrl: '', 
			avatar:this.props.AvatarBIG,
			UserEmail:this.props.UserEmail,
			UserFirstName:this.props.UserFirstName,
			UserLastName:this.props.UserLastName,
		};
    }
 
	handleSubmit = (e:any) => {
		e.preventDefault();
	  }

	handleImageChange = (e:any) => {
		let reader = new FileReader();
		let file = e.target.files[0];
    	reader.onloadend = () => {
			this.setState({
			  file: file,
			  avatar: reader.result
			});
		}
		reader.readAsDataURL(file);

		var data = new FormData()		  
		data.append('avatar', file);
		//data.append('UserID', getUserID());
		//data.append('api_key', getApiKey());
		  
		fetch('/api/User/UploadAvatar?api_key='+getApiKey()+'&UserID='+getUserID(), { method: 'POST', body: data, credentials: 'include' })
		.then(function (data) {			
			//console.log('Request succeeded with JSON response', data);
			//alert();
			location.reload();
		  })
		  .catch(function (error) {
			//console.log('Request failed', error);
		  });		
		//location.reload();  
		//e.preventDefault(); 
	  }
    render () {
		var slovar;		
		var en = { changePhoto: "Сhange photo", 
				   email:"Your Email:", 
				   main:"(main)", 
				   yourName:"Your name", 
				   yourLastName:"Your last name:", 
				   dataChange:"Data changes will take effect after confirmation.",
				   go:"Submit a change request"};
				   
		var ru = { changePhoto: "Поменять фото", 
				   email:"Ваш E-mail:", 
				   main:"(основной)", 
				   yourName:"Ваше имя", 
				   yourLastName:"Ваша фамилия:",
				   dataChange:"Изменения данный вступят в силу после подтверждения.",
				   go:"Отправить запрос на изменение"   
				};

		switch(this.props.lang) {
			case 'en': slovar = en; break;
			case 'ru': slovar = ru; break;
			default : slovar = ru; break;
		  }

		return (
		<form className="row" onSubmit={this.handleSubmit}>
		    <div className="col-3 text-center">
		        <img src={this.state.avatar} style={{width:'160px', height:'160px'}} className="ex-avatar ex-avatar_medium ex-avatar_light mb-4" />
			<div className="file-upload">
		        <label>
					<input type="file" id="avatar" name="avatar"
						onChange={e=>this.handleImageChange(e)}				
		                accept=".jpg, .jpeg, .png" />
		            <span>{slovar.changePhoto}</span>
		        </label>
			</div>
		    </div>
			<a id="home" href='/Desktop'></a>
		    <div className="col-9">
		        <div className="row mb-4">
		            <div className="col-4 d-flex align-items-center">
		                <label>{slovar.email} <span className="small">{slovar.main}</span>:</label>
		            </div>
		         <div className="col-8">
		              <input type="email" name="user-data-email" className="form-control" defaultValue={this.state.UserEmail} />
		         </div>
		    </div>
            <div className="row mb-4">
             	<div className="col-4 d-flex align-items-center">
		                <label>{slovar.yourName}</label>
                </div>
  			    <div className="col-8">
 	                <input type="text" name="user-data-first-name" className="form-control" defaultValue={this.state.UserFirstName}/> 
        	    </div>
		    </div>

            <div className="row mb-4">
 		        <div className="col-4 d-flex align-items-center">
                		<label>{slovar.yourLastName}</label>
		        </div>
		        <div className="col-8">
                    <input type="text" name="user-data-last-name" className="form-control" defaultValue={this.state.UserLastName}/>
	            </div>
		   </div>

	        <div className="row mb-4">
	            <div className="col-4"></div>
	            <div className="col-8 small text-muted">{slovar.dataChange}</div>
        	    </div>
		        <div className="text-right">
				<a href="/Desktop"><button className="btn btn-outline-primary">{slovar.go}</button></a>
		        </div>
            </div>				
		</form>		
        );
    }
}