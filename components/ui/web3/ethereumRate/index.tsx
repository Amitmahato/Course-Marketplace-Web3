import { COURSE_PRICE, useEthPrice } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";
import React from "react";

const EthereumRate = () => {
  const {
    rate: { data: rate },
    courseEthRate,
  } = useEthPrice();

  return (
    // <div className="grid grid-cols-4">
    //   <div className="flex flex-1 items-stretch text-center">
    //     <div className="p-10 border drop-shadow rounded-md">
    //       <div className="flex justify-center">
    //         {rate ? (
    //           <>
    //             <Image
    //               src={"/small-eth.webp"}
    //               layout="fixed"
    //               width={35}
    //               height={35}
    //             />
    //             <span className="text-2xl font-bold">= {rate}$</span>
    //           </>
    //         ) : (
    //           <div className="w-full flex justify-center">
    //             <Loader size="md" />
    //           </div>
    //         )}
    //       </div>
    //       <p className="text-xl text-gray-500">Current eth Price</p>
    //     </div>
    //   </div>
    //   <div className="flex flex-1 items-stretch text-center">
    //     <div className="p-10 border drop-shadow rounded-md">
    //       <div className="flex justify-center">
    //         {courseEthRate ? (
    //           <>
    //             <span className="text-2xl font-bold">
    //               {courseEthRate.toFixed(6)}
    //             </span>
    //             <Image
    //               src={"/small-eth.webp"}
    //               layout="fixed"
    //               width={35}
    //               height={35}
    //             />{" "}
    //             <span className="text-2xl font-bold">= {COURSE_PRICE}$</span>
    //           </>
    //         ) : (
    //           <div className="w-full flex justify-center">
    //             <Loader size="md" />
    //           </div>
    //         )}
    //       </div>
    //       <p className="text-xl text-gray-500">Price per course</p>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          {rate ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">= {rate}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {rate ? (
            <>
              <span className="text-xl font-bold">{courseEthRate}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  );
};

export default EthereumRate;
