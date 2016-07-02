import React, { PropTypes } from 'react';
import styles from '../styles/facebook.scss';

class FaceData extends React.Component { 

 
  state = {details:''};
  constructor(props) {

  	

    super(props);
  
  	
    const {status,user_id,token} = this.props.conn;
    this.user_id = user_id
    this.token = token

 	
	this.getFBdata()
  }
	
  	getFBdata(){
		FB.api('/'+this.user_id,  {fields: ['last_name','first_name']},response => {
			 
			 	this.setState({fname:response.first_name,lname:response.last_name})
			 				});

	
  	};


	render(){
				return(<div >	<h1>Welcome {this.state.fname} {this.state.lname} </h1>
				 <div ><img src={'http://graph.facebook.com/'+this.user_id+'/picture?type=large'} /></div>
				 </div>);
		};
}

export default FaceData