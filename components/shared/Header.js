import React from 'react';
import Link from 'next/link';
import '../../styles/main.scss';
//import BaseLayout from '../components/layouts/BaseLayout'

class Header extends React.Component{

	render(){

		return (
			<React.Fragment>

				<Link href="/">
					<a> Home </a>
				</Link>

				<Link href="/about">
					<a> About </a>
				</Link>

				<Link href="/portfolios">
					<a> Portfolio </a>
				</Link>

				<Link href="/blogs">
					<a> Blog</a>
				</Link>

				<Link href="/cv">
					<a> CV </a>
				</Link>

				<style jsx>
					{
					`
						a {
							font-size: 20px;
						};

						.customClass{
							color: red;
						}
					`
					}
				</style>

			</React.Fragment>
		)
	}
}

export default Header;