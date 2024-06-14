
import React from "react";
import { useLocation } from "react-router-dom";
import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
} from "@material-tailwind/react";

import Footer from "./Footer";



export function AdoptForm() {

	const handleSubmit = (e) => {
		e.preventDefault();
	};




	

	return (
		<div className="big-container w-full bg-light-purple">

			<div className="mt-24 pt-20 flex text-center justify-center flex-col">
				<Typography variant="h1" color="blue-gray" className="font-bold mb-4 font-raleway">
					Adopt Form
				</Typography>

				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center font-raleway"
				>
					We will contact you as soon as possible after we received the form.
				</Typography>
			</div>

			<div className="p-2 content-container mx-auto flex flex-col items-center bg-light-purple text-raleway rounded-lg ">
				<Card
					color="transparent"
					shadow={false}
					className="mt-4 mb-8 items-center font-raleway w-full sm:w-96"
				>
					<form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 font-raleway">
						<div className="mb-1 flex flex-col gap-6">
							<Typography variant="h6" className="-mb-3 font-raleway">
								Fullname
							</Typography>
							<Input
								type="text"
								size="lg"
								placeholder=""
								className=" !border-darkpurple focus:!border-lavender bg-white font-raleway"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>

							<Typography
								variant="h6"
								color="blue-gray"
								className="-mb-3 font-raleway"
							>
								Email
							</Typography>
							<Input
								size="lg"
								placeholder=""
								className=" !border-darkpurple focus:!border-lavender bg-white font-raleway"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>

							<Typography
								variant="h6"
								color="blue-gray"
								className="-mb-3 font-raleway"
							>
								Address
							</Typography>
							<Input
								size="lg"
								placeholder=""
								className=" !border-darkpurple focus:!border-lavender bg-white font-raleway"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
							<Typography variant="h6" className="-mb-3 font-raleway">
								Phone number
							</Typography>
							<Input
								type="text"
								size="lg"
								placeholder=""
								className=" !border-darkpurple focus:!border-lavender bg-white font-raleway"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
							
							<Typography
								variant="h6"
								color="blue-gray"
								className="-mb-3 font-raleway"
							>
								Reason to adopt
							</Typography>
							<Textarea
								size="lg"
								placeholder=""
								className=" !border-darkpurple focus:!border-lavender bg-white  font-raleway"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</div>

						<Button
							className="bg-lavender mt-4 font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300"
							fullWidth
							onClick={handleSubmit}
						>
							Submit
						</Button>

					</form>

					<div className="w-full bg-grey">
						<p>Pet Info</p>
					
						
					</div>
				</Card>

				
				
				
			</div>
			<Footer />
		</div>
	);
}
