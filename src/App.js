// src/App.js
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import LandingPage from "./components/mainpage/LandingPage";
import { NavigateBar } from "./components/mainpage/NavigateBar";
import Home from "./components/mainpage/Home";
import AboutUs from "./components/mainpage/AboutUs";
import ContactUs from "./components/mainpage/ContactUs";
import PetList from "./components/mainpage/PetList";
import Tracking from "./components/mainpage/Tracking";
import Community from "./components/mainpage/Community";
import OtpVerificationPage from "./components/PhoneOTP";
import Profile from "./components/mainpage/Profile";
import DonationCard from "./components/mainpage/Cards";

// Admin routess
import Sidebar from "./admin_src/src/Components/SideNavBar/SideBar";
import Adoption from "./admin_src/src/Screens/Adoption/Adoption";
import Dashboard from "./admin_src/src/Screens/Dashboard/Dashboard";
import AdoptRequest from "./admin_src/src/Screens/AdoptResquest/AdoptRequest";
import Pets from "./admin_src/src/Screens/Pets/Pets";
import ProfileSetting from "./admin_src/src/Screens/ProfileSetting/ProfileSetting";
import Request from "./admin_src/src/Screens/Request/Request";
import Surrender from "./admin_src/src/Screens/Surrender/Surrender";
import TrackingAdmin from "./admin_src/src/Screens/Tracking/Tracking";
import User from "./admin_src/src/Screens/Users/User";
import Category from "./admin_src/src/Screens/Category/Category";
import Post from "./admin_src/src/Screens/Posts/Posts";
import Tips from "./admin_src/src/Screens/Tips/TipsListing";
import Donations from "./admin_src/src/Screens/Donation/Donation";


function App() {
	const { user } = useSelector((state) => state.user);

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						user || user?.role_id === 1 ? <Navigate to="/" /> : <Login />
					}
				/>
				<Route
					path="/WelcomePage"
					element={
						user || user?.role_id === 1 ? <Navigate to="/" /> : <WelcomePage />
					}
				/>
				<Route
					path="/otp-verification"
					element={
						user || (user && user.role_id === 1) ? (
							<Navigate to="/" />
						) : (
							<OtpVerificationPage />
						)
					}
				/>
			</Routes>
			{user && user.role_id === 1 && <Sidebar />}
			{user && user.role_id !== 1 && <NavigateBar />}

			<Routes>
				{/* Admin routes */}
				{user && user.role_id === 1 && (
					<>
						<Route path="/" element={<Dashboard />} />
						<Route path="/adoption" element={<Adoption />} />
						<Route path="/adoptRequest" element={<AdoptRequest />} />
						<Route path="/pets" element={<Pets />} />
						<Route path="/profileSetting" element={<ProfileSetting />} />
						<Route path="/request" element={<Request />} />
						<Route path="/surrender" element={<Surrender />} />
						<Route path="/tracking" element={<TrackingAdmin />} />
						<Route path="/users" element={<User />} />
						<Route path="/category" element={<Category />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/donations" element={<Donations />} />
						{/* Add other admin routes here... */}
					</>
				)}

				{/* User routes */}
				<Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
				<Route
					path="/LandingPage"
					element={user ? <LandingPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/aboutus"
					element={user ? <AboutUs /> : <Navigate to="/login" />}
				/>
				<Route
					path="/contactus"
					element={user ? <ContactUs /> : <Navigate to="/login" />}
				/>
				<Route
					path="/petlist"
					element={user ? <PetList /> : <Navigate to="/login" />}
				/>
				<Route
					path="/tracking"
					element={user ? <Tracking /> : <Navigate to="/login" />}
				/>
				<Route
					path="/community"
					element={user ? <Community /> : <Navigate to="/login" />}
				/>
        <Route
					path="/donation"
					element={user ? <DonationCard /> : <Navigate to="/login" />}
				/>
        <Route
					path="/profile"
					element={user ? <Profile /> : <Navigate to="/login" />}
				/>
			</Routes>
		</Router>
	);
}

export default App;