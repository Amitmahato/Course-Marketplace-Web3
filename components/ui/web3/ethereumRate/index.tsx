import { COURSE_PRICE } from "@components/hooks/useEthPrice";
import Image from "next/image";
import React from "react";

interface IEthereumRate {
  rate: number;
  courseEthRate: number;
}

const EthereumRate: React.FC<IEthereumRate> = ({ rate, courseEthRate }) => {
  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex justify-center">
            <Image
              src={"/small-eth.webp"}
              layout="fixed"
              width={35}
              height={35}
            />
            <span className="text-2xl font-bold">= {rate}$</span>
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex justify-center">
            <span className="text-2xl font-bold">
              {courseEthRate.toFixed(6)}
            </span>
            <Image
              src={"/small-eth.webp"}
              layout="fixed"
              width={35}
              height={35}
            />{" "}
            <span className="text-2xl font-bold">= {COURSE_PRICE}$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
};

export default EthereumRate;
