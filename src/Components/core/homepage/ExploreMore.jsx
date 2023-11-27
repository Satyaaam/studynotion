import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths"];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl text-center font-semibold">
        Unlock the <HighLightText text="Power of Code" />
      </div>
      <p className="text-center text-richblack-300 text-lg mt-4 font-semibold">
        Learn to build anything you can imagine.
      </p>
      <div className="flex gap-7 items-center mt-5 flex-row h-[70px] w-fit mx-auto  p-6 bg-richblack-800 rounded-lg">
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setMyCards(element)}
              className={`text-[16px] h-[30px] flex items-center justify-center  ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } rounded-lg transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-7`}
            >
              {element}
            </div>
          );
        })}
      </div>
      {/* <div className="lg:h-[150px]"></div> */}
      <div className="flex gap-6">
        {courses.map((element, index) => {
          return (
            <div key={index} className="mt-[50px]">
              <CourseCard
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
