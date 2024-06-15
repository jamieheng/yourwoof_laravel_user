import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authentication } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import {
	auth,
	RecaptchaVerifier,
	PhoneAuthProvider,
	firebase,
} from "../config/firebase";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const WelcomePage = () => {
	


  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to run effect only once on component m


	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [reCAPTCHACompleted, setReCAPTCHACompleted] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [verificationId, setVerificationId] = useState("");
	const [resendToken, setResendToken] = useState(null);
	const [user, setUser] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
				size: "invisible",
				callback: (response) => {
					setReCAPTCHACompleted(true);
					setShowSuccessMessage(true);
					window.grecaptcha = null;
					window.recaptcha = null;
				},
				"expired-callback": () => {
					setReCAPTCHACompleted(false);
					setShowSuccessMessage(false);
				},
			});
		}
	}, []);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSignUp = (phoneNumber) => {
		console.log("handleSignUp function called");

		const formattedPhone = phoneNumber.startsWith("+")
			? phoneNumber
			: `+855${phoneNumber}`;
		console.log("Formatted phone number:", formattedPhone);

		const appVerifier = window.recaptchaVerifier;
		console.log("appVerifier:", appVerifier);

		const phoneProvider = new PhoneAuthProvider(auth);
		phoneProvider
			.verifyPhoneNumber(formattedPhone, appVerifier)
			.then((verificationId) => {
				console.log("onCodeSent:", verificationId);

				setVerificationId(verificationId);

				navigate("/otp-verification", {
					state: {
						verificationId: verificationId,
						firstName: firstName,
						lastName: lastName,
						phone: formattedPhone,
						password: password,
						address: address,
					},
				});
			})
			.catch((error) => {
				console.error("Error during signInWithPhoneNumber:", error);
				setErrorMessage("Failed to sign up. Please try again.");
			});
	};
	const onHandleSubmit = (e) => {
    
		e.preventDefault();
    if(validPassword && validPhone)
      {
        handleSignUp(phone);
       
      }
		
	};

	useEffect(() => {
		if (user) {
			console.log("User state updated:", user);
		}
	}, [user]);

	const handleGoogleLoginSuccess = async (codeResponse) => {
		const idToken = codeResponse.credential;
		const accessToken = codeResponse.accessToken;
	  
		const credential = firebase.auth.GoogleAuthProvider.credential(
		 idToken,
		 accessToken
		);
	  
		try {
		 const userCredential = await firebase
		  .auth()
		  .signInWithCredential(credential);
	  
		 // User successfully signed in
		 const firebaseUser = userCredential.user;
		 console.log("User signed in:", firebaseUser);
	  
		 // Dispatch authentication action
		 dispatch(authentication(firebaseUser));
		 navigate("/");
	  
		 // Example of how to add the user to your database
		 if (firebaseUser) {
		  console.log("HIIIIII");
		  const response = await axios.post(
		   "http://127.0.0.1:8000/api/users/register",
		   {
			first_name: "hi",
			last_name: "bye",
			email: "hi@example.com",
			phone: "",
			password: "",
			address: "",
		   }
		  );
	  
		  dispatch(authentication(response.data.users));
		  window.location.reload();
	  
		  navigate("/");
		 }
		} catch (error) {
		 // Handle errors here
		 console.error("Firebase sign-in error:", error);
		 // Set error message state or handle error as needed
		}
	   };

  const [validPassword, setValidPassword] = useState(true);
  const [validPhone, setValidPhone] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    validatePhone(newPhone);
  };

  const validatePassword = (password) => {
    // Define the password validation criteria using regex
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const isValid = passwordPattern.test(password);
    setValidPassword(isValid);
  };

  const validatePhone = (phone) => {
    const fomattedPhone = `+855${phone}`;
    // Define the password validation criteria using regex
   const findPhone = users.find(user => user.phone === fomattedPhone);
   findPhone ? setValidPhone(false) : setValidPhone(true);
  };
   
  

	return (
		<div className="bg-container flex flex-col justify-start lg:flex-row lg:justify-center h-screen w-screen font-raleway">
			<div
				className="welcome-image bg-blue-dark w-full lg:w-1/2 h-64 lg:h-full"
				style={{
					backgroundImage: `url(https://cdn.dribbble.com/users/2893989/screenshots/10735596/media/0b7765d8fbd28e91d7344eb6c8cd9245.jpg?resize=1600x1200&vertical=center)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backdropFilter: "blur(5px)",
				}}
			>
				<div className="logo-header flex flex-col justify-start items-center mt-4">
					<div className="welcome-logo flex flex-row items-start">
						<h1 className="hidden lg:block welcome-title font-raleway color-purple text-2xl md:text-4xl text-white lg:mt-24 lg:ml-24">
							Welcome to
						</h1>
						<img
							src="../images/logo.svg"
							alt="logo"
							className="dog-logo w-40 h-30 md:w-60 md:h-45 lg:mt-12"
						/>
					</div>
				</div>
			</div>

			<div className="register-form flex flex-col justify-center items-center w-full lg:w-1/2">
				<div className="mb-6">
					<p className="text-2xl font-bold m-4">Sign Up</p>
					<p>Adopt a pet right now!</p>
				</div>

				{showSuccessMessage && (
					<div className="text-green-500 mb-4">
						reCAPTCHA verification successful!
					</div>
				)}

				{errorMessage && (
					<div className="text-red-500 mb-4">{errorMessage}</div>
				)}

				<form onSubmit={onHandleSubmit}>
					<div className="flex flex-row justify-center items-center">
						<div className="m-1">
							<div className="flex flex-row justify-center items-center w-full">
								<div className="form-group w-full mr-1">
									<label>Firstname</label>
									<input
										onChange={(e) => {
											setFirstName(e.target.value);
										}}
										value={firstName}
										name="firstName"
										type="text"
										required
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<label>Lastname</label>
									<input
										onChange={(e) => {
											setLastName(e.target.value);
										}}
										value={lastName}
										name="lastName"
										type="text"
										required
										className="form-control"
									/>
								</div>
							</div>

							<div className="form-group w-full">
              <label>Phone Number</label>
                <div className='relative phone-input-container'>
                  <p className='absolute top-1/2 left-2 transform -translate-y-1/2'>🇰🇭+855</p>
                  <input
                    onChange={handlePhoneChange}
                    name='phone'
                    type='tel' // Use type='tel' for telephone numbers
                    pattern='^\d{8,9}$' // Optional: HTML5 pattern for validation (accepts only 8-9 digits)
                    required
                    className='form-control w-full bg-transparent pl-16'
                    value={phone} 
                  />
                </div>
               {!validPhone ? <p className="text-red w-80 text-center p-2">Phone number is already taken.</p>  : "" }
							</div>

							<div className="form-group w-full">
								<label>Address</label>
								<input
									onChange={(e) => {
										setAddress(e.target.value);
									}}
									name="address"
									type="text"
									value={address}
									required
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label>Password</label>
								<div className="relative">
									<input
										onChange={
											handlePasswordChange
										}
										value={password}
										name="password"
										type={showPassword ? "text" : "password"}
										required
										className="form-control"
									/>
									<button
										type="button"
										className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 px-2 py-1 text-sm rounded"
										onClick={toggleShowPassword}
									>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>

                {!validPassword ? <p className="text-red w-80 text-center p-2">Password must be at least 10 characters, one uppercase letter, one lowercase letter, one number and one special character.</p> : "" }
                
							</div>
              
						</div>
					</div>
					<div id="recaptcha-container"></div>
					<div className="form-group">
						<button
							type="submit"
							className="btn btn-primary mb-4 bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 px-8 py-3 text-lg rounded-lg"
						>
							Register
						</button>

						<GoogleOAuthProvider clientId={clientId}>
       <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
         console.log("Login Failed");
        }}
       />
      </GoogleOAuthProvider>
					</div>
				</form>

				<div className="login-choice flex flex-col justify-center items-center w-full lg:w-1/2">
					<p>Already have an account?</p>
					<Link
						to="/Login"
						className="flex items-center text-lavender hover:text-darkpurple font-bold"
					>
						Login here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
