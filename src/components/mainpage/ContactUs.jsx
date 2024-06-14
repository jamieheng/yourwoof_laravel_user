import React from "react";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
	Textarea,
} from "@material-tailwind/react";
import Footer from "./Footer";

export default function ContactUs() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="big-container w-full bg-light-purple font-raleway">
			<div className="mt-24 pt-20 flex flex-col items-center text-center">
				<Typography variant="h1" color="blue-gray" className="font-bold mb-4">
					GET IN TOUCH WITH US
				</Typography>
				<Typography
					variant="h6"
					color="blue-gray"
					className="text-center w-full md:w-1/2 lg:w-1/2 font-raleway"
				>
					To contact us about our services or to adopt one of our rescues,
					please don’t hesitate to contact us on any of the details below or
					through our contact form. We will get back to you ASAP if contacting
					us by email.
				</Typography>
			</div>

			<div className="p-4 content-container mx-auto flex flex-col items-center bg-light-purple text-raleway rounded-lg">
				<Card
					color="transparent"
					shadow={false}
					className="mt-4 mb-8 items-center font-raleway w-full sm:w-96"
				>
					<form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
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

							<Textarea
								label="Message"
								className="!border-darkpurple focus:!border-lavender bg-white "
							></Textarea>
						</div>

						<Button
							className="mt-6 bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300"
							fullWidth
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</form>
				</Card>
				<div className="flex justify-center items-center mx-auto"></div>
				{/* footer */}
				<Footer />
			</div>
		</div>
	);
}
