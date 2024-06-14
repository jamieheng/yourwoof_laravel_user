import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";

import Footer from "./Footer";
export default function AboutUs() {
	return (
		<div className="relative mt-40 font-raleway">
			<div className="relative">
				<div className="absolute h-full w-full bg-black opacity-30"></div>
				<img
					className="h-full w-full object-cover object-center"
					src="https://www.lawnstarter.com/blog/wp-content/uploads/2023/08/pexels-blue-bird-7210705new-1.png"
					alt="About us dog"
				/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
					<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">ABOUT YOURWOOF</h1>
					<p className="text-xl font-raleway">Learn more about our story and mission.</p>
				</div>
			</div>
			<p className="p-6 mt-4 text-3xl font-bold text-center">WHAT DO WE DO</p>
			<Typography
				variant="lead"
				className=" w-3/4 text-center mx-auto justify-center pb-8 font-raleway"
		
			>
				At the core of our mission lies a passionate commitment to enhancing the
				lives of stray animals in Cambodia. Stray animals face unique
				challenges, navigating the streets and urban environments without a
				stable home or reliable source of care. Our primary objective is to
				alleviate their hardships and create a positive impact on their
				well-being.
			</Typography>

			<div className="work-list flex flex-wrap justify-center bg-light-purple">
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
							<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center font-raleway">
									<Typography variant="h5" color="blue-gray">
										
										<p className="font-raleway">Rescue and Rehabilitation</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-full sm:w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								When we rescue stray animals, our first priority is their
								immediate well-being. We provide them with necessary medical
								attention, nutrition, and a safe environment to recover. Our
								team of veterinary professionals ensures that each animal is in
								optimal health before beginning the process of finding them a
								new home.
							</Typography>
						</CardBody>
					</Card>
				</div>

				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
							<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>


								<div className="flex items-center justify-center font-raleway">
									<Typography variant="h5" color="blue-gray">
										
										<p className="font-raleway">Collaboration with Adoption Agencies</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								Collaborating with adoption agencies and animal welfare
								organizations expands our reach and increases the likelihood of
								finding suitable homes for the stray animals. These partnerships
								enable us to tap into a larger pool of potential adopters and
								enhance the overall success of our adoption efforts.
							</Typography>
						</CardBody>
					</Card>
				</div>
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
								<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center font-raleway">
									<Typography
										variant="h5"
										color="blue-gray"
										className="text-center sm:text-left"
									>
										
										<p className="font-raleway">Utilizing Social Media and Online Platforms</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-ralway"
								style={{ letterSpacing: "1.5px" }}
							>
								In the digital age, social media plays a crucial role in
								connecting lost animals with their owners. We leverage various
								online platforms to share pictures, stories, and information
								about the stray animals under our care. This not only reaches a
								wide audience but also facilitates quick communication and
								collaboration.
							</Typography>
						</CardBody>
					</Card>
				</div>
				<div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
					<Card
						color="transparent"
						shadow={false}
						className="w-full max-w-full"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5 items-center">
								<img
									src="../images/doglogo.svg"
									alt="logo"
									className="dog-logo w-10 h-10 mb-4 sm:w-14 sm:h-14"
								/>
								<div className="flex items-center justify-center ">
									<Typography variant="h5" color="blue-gray">
										<p className="font-raleway">	Adoption Events and Outreach Programs</p>
									</Typography>
								</div>
							</div>
						</CardHeader>
						<CardBody className="mb-6 p-0">
							<Typography
								variant="lead"
								className="w-3/4 text-center mx-auto justify-center pb-12 font-raleway"
								style={{ letterSpacing: "1.5px" }}
							>
								We organize adoption events and outreach programs to showcase
								the lovable qualities of our rescued animals. These events serve
								as opportunities for potential adopters to meet and interact
								with the animals in a friendly and relaxed environment. It also
								allows us to share valuable information about responsible pet
								ownership.
							</Typography>
						</CardBody>
					</Card>
				</div>
			</div>

			<div className="p-6 mt-4 text-3xl font-bold text-center">
				MEET THE YOURWOOF TEAM
			</div>
			<div className="flex flex-col items-center lg:flex-row lg:space-x-20 justify-center">
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
							src={require('./../assets/images/reach.jpg')}
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
						Sotheareach Chantrea
						</Typography>
						
					</CardBody>
				
				</Card>
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
					
							src={require('./../assets/images/ngou.jpg')}
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
							Pok Tepvignou
						</Typography>
						
					</CardBody>
		
				</Card>

				<Card className="w-96 ">
					<CardHeader floated={false} className="h-80">
						<img
						className="h-full w-full object-cover object-center"
							src={require('./../assets/images/ta.jpg')}
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
						Thoeun Pisethta
						</Typography>
						
					</CardBody>

				</Card>
				
				
			</div>

			<div className="flex flex-col items-center lg:flex-row lg:space-x-20 justify-center mt-4">
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
							className="h-full w-full object-cover object-center"
							src={require('./../assets/images/ry.jpg')}
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
						In Sothiry
						</Typography>

					</CardBody>

				</Card>
				<Card className="w-96">
					<CardHeader floated={false} className="h-80">
						<img
						className="h-full w-full object-cover object-center"
							src={require('./../assets/images/h.jpg')}
							alt="profile-picture"
						/>
					</CardHeader>
					<CardBody className="text-center">
						<Typography variant="h4" color="blue-gray" className="mb-2">
							Veiy Sokheng
						</Typography>

					</CardBody>

				</Card>

				
				
				
			</div>

			<div className="flex justify-center items-center mx-auto"></div>
			{/* footer */}
			<Footer/>
		</div>
	);
}
