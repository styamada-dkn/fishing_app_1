import React, { FC } from "react";
import { FaCalendarDays, FaFishFins, FaFlagCheckered } from "react-icons/fa6";

interface InfoSectionProps {
  fishday: string;
  fish_result: string;
  weather: string;
  temperature: string;
  water_temperature: string;
  location: string;
}

const InfoSection: FC<InfoSectionProps> = ({
  fishday,
  fish_result,
  weather,
  temperature,
  water_temperature,
  location,
}) => {
  return (
    <>
      <div className="w-full min-h-20 rounded-lg bg-third shadow-md">
        <div className="bg-warning rounded-t-lg text-center flex justify-center items-center">
          <FaCalendarDays className="size-5 pr-2" />
          <h3 className="font-bold">釣行日</h3>
        </div>
        <div className="p-4 text-center">{fishday}</div>
      </div>
      <div className="w-full min-h-20 rounded-lg mt-2 bg-third shadow-md">
        <div className="bg-warning rounded-t-lg text-center flex justify-center items-center">
          <FaFishFins className="size-6 pr-2"/>
          <h3 className="font-bold">釣  果</h3>
        </div>
        <div className="p-2 text-center">{fish_result}</div>
      </div>
      <div className="w-full min-h-28 rounded-lg mt-2 bg-third shadow-md">
        <div className="bg-warning rounded-t-lg text-center flex justify-center items-center">
          <FaFlagCheckered className="size-5 pr-2"/>
          <h3 className="font-bold">天気・場所</h3>
        </div>
        <div className="p-2 text-base">
          <div>
            天気：<span className="pl-2">{weather}</span>
          </div>
          <div>
            気温：<span className="pl-2">{temperature}</span>
          </div>
          <div>
            水温：<span className="pl-2">{water_temperature}</span>
          </div>
          <div>
            場所：<span className="pl-2">{location}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
