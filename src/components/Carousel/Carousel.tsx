import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import { CarouselProp } from "../../types";

const Carousel = ({ carouselData }: CarouselProp) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    function nextSlide() {
        let newSlide =
            currentSlide === carouselData.length - 1
                ? 0
                : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    function prevSlide() {
        let newSlide =
            currentSlide === 0
                ? carouselData.length - 1
                : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    return (
        <div>
            <div className="h-auto flex overflow-hidden relative">
                <AiOutlineLeft
                    onClick={prevSlide}
                    className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                />

                <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
                    {carouselData.map((slide, index) => {
                        return (
                            <img
                                src={slide}
                                alt="This is a carousel slide"
                                key={index}
                                className={
                                    index === currentSlide
                                        ? "block w-full h-auto object-cover"
                                        : "hidden"
                                }
                            />
                        );
                    })}
                </Swipe>

                <div className="absolute w-full flex justify-center bottom-0">
                    {carouselData.map((element, index) => {
                        return (
                            <div
                                className={
                                    index === currentSlide
                                        ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                                        : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                                }
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                }}
                            ></div>
                        );
                    })}
                </div>

                <AiOutlineRight
                    onClick={nextSlide}
                    className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Carousel;