import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';

class Secret extends React.Component{
	
	

	render(){
		return this.renderSecretPage();
	}
}

export default withAuth(Secret);