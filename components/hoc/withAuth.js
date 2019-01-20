import React from 'react';
import BaseLayout from '../layouts/BaseLayout'
import BasePage from '../BasePage';

// a high order component is just a function
export default function(Component){
	return class withAuth extends React.Component{

	renderProtectedPage(){
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
					<h1> You are not authenticated. Please login to access this page. </h1>
				</BasePage>
			</BaseLayout>			
			)
		}
	}

		render(){
			return this.renderProtectedPage();
		}
	}

}