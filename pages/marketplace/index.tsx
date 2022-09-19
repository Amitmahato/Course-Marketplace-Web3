import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import React, { useState } from "react";
import { Button, Loader } from "@components/ui/common";
import { IOrderState, OrderModal } from "@components/ui/order";
import { course } from "interfaces/course";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";

export default function Marketplace({ courses }) {
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState<course>(null);
  const { contract, web3 } = useWeb3();
  const { isInitialised, lookUp } = useOwnedCourses(courses, account.data);

  const purchaseCourse = async (order: IOrderState) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    /**
     * Order Hash = keccak256(course id + account address)
     *
     * Ex:
     * - course id  = 1410474 => ASCII to HEX => 0x31343130343734 (7 bytes) =>  0x31343130343734000000000000000000 (16 bytes)
     * - address    = 0x95bDbD553b5848E10DDE013E32FfdDd9C28BD406
     * - orderHash  = keccak256(0x3134313034373400000000000000000095bDbD553b5848E10DDE013E32FfdDd9C28BD406)
     *              = 0x886687af6e083d9cbefd4e39a5909c6cc3009dd767f0d4fb8e6d8dd31bd1f3af
     */
    const orderHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      {
        type: "bytes20",
        value: account.data,
      }
    );

    /**
     * Let email = mahatoa90@gmail.com => ASCII
     *    keccak256(email) => 0x31e6504e138603a3f8c843ff62a9ba4c4c8d687865767c34c1bca3550b32331f
     */
    const emailHash = web3.utils.soliditySha3(order.email);

    /**
     * emailHash  = 0x31e6504e138603a3f8c843ff62a9ba4c4c8d687865767c34c1bca3550b32331f (32 bytes)
     * orderHash  = 0x886687af6e083d9cbefd4e39a5909c6cc3009dd767f0d4fb8e6d8dd31bd1f3af (32 bytes)
     *
     * proof      = keccak256(0x31e6504e138603a3f8c843ff62a9ba4c4c8d687865767c34c1bca3550b32331f886687af6e083d9cbefd4e39a5909c6cc3009dd767f0d4fb8e6d8dd31bd1f3af)
     *            = 0x80cd072bab8f039dd26a9604b31ce857bf2c5dfb470aa03a202d0a6b689159c9 (32 bytes)
     */
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(order.price.toString());

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({
          from: account.data,
          value,
        });
      console.log(
        "Course purchased successfully! Transaction details: ",
        result
      );
    } catch (e) {
      // will fail you same user tries to purchase any given course twice
      console.log("Failed to purcahse course! Error: ", e);
    }
  };

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            disabled={!canPurchaseCourse}
            key={course.id}
            course={course}
            Footer={() => {
              if (!isInitialised) {
                return (
                  <Button
                    title="Purchase"
                    variant="lightPurple"
                    disabled={true}
                  >
                    <Loader size="sm" />
                  </Button>
                );
              }

              if (lookUp[course.id]) {
                return <Button title="Owned" variant="green" disabled={true} />;
              }

              return (
                <Button
                  title="Purchase"
                  variant="lightPurple"
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                />
              );
            }}
          />
        )}
      </CourseList>

      {!!selectedCourse && (
        <OrderModal
          open={!!selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
          }}
          onSubmit={(order: IOrderState) => {
            purchaseCourse(order);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
