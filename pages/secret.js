import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage';

class Secret extends React.Component{
	
	renderSecretPage(){
		const {isAuthenticated} = this.props.auth;

		if(isAuthenticated){
			return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1> I am secret page </h1>
					<p> secret content here </p>
				</BasePage>
			</BaseLayout>			
			)
		}
		else{
			return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1> You ar enot authenticated. Please login to access this page. </h1>
				</BasePage>
			</BaseLayout>			
			)
		}
	}

	render(){
		return this.renderSecretPage();
	}
}

export default Secret;