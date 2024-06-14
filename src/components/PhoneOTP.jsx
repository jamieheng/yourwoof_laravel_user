import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authentication } from "../features/auth/authSlice";
import { auth, PhoneAuthProvider } from "../config/firebase"; // Ensure the correct imports

const OtpVerificationPage = () => {
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { verificationId, firstName, lastName, phone, password, address } =
		location.state;

		
	const verifyOtp = async () => {
		try {
			console.log(verificationId)
			const credential = PhoneAuthProvider.credential(verificationId, otp);
			const userCredential = await auth.signInWithCredential(credential);
			const user = userCredential.user;
		

			if (user) {
				try {
					const response = await axios.post(
						"https://attendance.rd-lab.work/api/users/register",
						{
							first_name: firstName,
							last_name: lastName,
							phone: user.phoneNumber,
							password: password,
							address: address,
							
						},
						
					);

					dispatch(authentication(response.data.users));
					navigate("/");
					

					
				} catch (err) {
					console.log(err);
				}
			}
		} catch (error) {
			console.error("Error during OTP verification:", error);
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-center h-screen font-raleway">
			<div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="mb-4 text-xl font-semibold text-center">Authenticate your account</h2>
				<p className="mb-4 text-lg text-center">Enter the OTP sent to {phone}</p>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Enter OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
				<div className="flex justify-center">
					<button
						className="bg-purple hover:bg-darkpurple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={verifyOtp}
					>
						Verify OTP
					</button>
				</div>
			</div>
		</div>
	);
};

export default OtpVerificationPage;
