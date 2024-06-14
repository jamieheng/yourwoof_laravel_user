import React, { useState, useEffect } from 'react';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Transition } from "@headlessui/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

export default function TipList() {
  const [tips, setTips] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tips')
      .then((response) => {
        setTips(response.data.tips || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, index + size));
      index += size;
    }
    return chunkedArr;
  };

  const cardChunks = chunkArray(tips, 3);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === cardChunks.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cardChunks.length - 1 : prevSlide - 1
    );
  };

  if (cardChunks.length === 0) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="flex flex-row p-6 mt-4 md:text-2xl lg:text-3xl font-bold text-center">
        TIPS FOR YOUR PET
      </p>
      <div className="relative">
        <Transition
          show={true}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex justify-center items-center">
            {cardChunks[currentSlide].map((card, index) => (
              <div key={index} className="m-5">
                <Card className="h-[28rem] w-full max-w-[22rem] overflow-hidden">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                  >
                    <img
                      src={card.tip_img}
                      alt="tips"
                      className="object-cover w-full h-full"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-raleway"
                    >
                      {card.tip_title}
                    </Typography>
                    <Typography
                      color="gray"
                      className="mt-3 font-normal font-raleway"
                    >
                      {card.tip_description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <Typography className="font-normal font-raleway">
                      {card.date}
                    </Typography>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </Transition>
        <div className="w-full absolute flex justify-between top-1/2 transform -translate-y-1/2 px-4">
          <button
            onClick={prevSlide}
            className="bg-blue-500 p-2 rounded-full z-20  text-purple hover:bg-grey text-center"
           
          >
            <ArrowBackIosIcon />
          </button>
          <button
            onClick={nextSlide}
            className="bg-blue-500 p-2 rounded-full z-20  text-purple hover:bg-grey text-center"
           
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
