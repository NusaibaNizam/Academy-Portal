import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./RegisterLogin.css"

const RegisterLogin = () => {
	const [containerName, setContainerName] = useState('');
	const handleMove = () => {
		if (containerName === '') {
			setContainerName('rightPanelActive')
		} else {
			setContainerName('')
		}
	}
	return (
		<>
			<div className="loginRoot">
				<div className={"loginRegisterContainer " + containerName}>
					<Register containerName={containerName}/>
					<Login containerName={containerName}/>
					<div className="overlayContainer">
						<div className="overlay">
							<div className="overlayPanel overlayLight">
								<h1 className="loginHeader">Welcome Back!</h1>
								<p className="loginDetails">Login to enter</p>
								<button className="ghost loginButton" onClick={handleMove} >Sign In</button>
							</div>
							<div className="overlayPanel overlayRight">
								<h1 className="loginHeader">Hello!</h1>
								<p className="loginDetails">Become an Academy member today</p>
								<button className="ghost loginButton" onClick={handleMove} >Apply</button>
							</div>
						</div>
					</div>
				</div>

			</div>

		</>
	);
}

export default RegisterLogin;