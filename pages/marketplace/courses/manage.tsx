import { useAdmin } from "@components/hooks/web3/useAdmin";
import { useManagedCourses } from "@components/hooks/web3/useManagedCourses";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import { COURSE_STATE } from "@utils/normalize";
import { IManagedCourse } from "interfaces/course";
import { useState } from "react";

const VerifyEmail: React.FC<{
  verified?: boolean;
  onVerify: (email: string) => void;
  onEmailChange: () => void;
}> = ({ verified, onVerify, onEmailChange }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col w-1/2 mr-2 relative rounded-md">
      <div className="flex flex-row">
        <input
          value={email}
          onChange={({ target: { value } }) => {
            setEmail(value);
            onEmailChange();
          }}
          type="text"
          name="account"
          id="account"
          className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
          placeholder="x@y.com"
        />
        <Button title="Verify" onClick={() => onVerify(email)} />
      </div>
      {![null, undefined].includes(verified) && (
        <div className="mt-2">
          {verified ? (
            <Message type={MessageTypes.success}>Verified!</Message>
          ) : (
            <Message type={MessageTypes.danger}>Wrong Proof!</Message>
          )}
        </div>
      )}
    </div>
  );
};

const ManageCourses = () => {
  const [ownershipProved, setOwnershipProved] = useState({});
  const { web3, contract } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses, isInitialised } = useManagedCourses(account);

  const verifyCourseOwnership = (
    email: string,
    { courseHash, proof }: { courseHash: string; proof: string }
  ) => {
    const emailHash = web3.utils.soliditySha3(email);

    const _proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: courseHash }
    );

    if (_proof === proof) {
      setOwnershipProved({
        ...ownershipProved,
        [courseHash]: true,
      });
    } else {
      setOwnershipProved({
        ...ownershipProved,
        [courseHash]: false,
      });
    }
  };

  const activateCourse = async (course: IManagedCourse) => {
    try {
      await contract.methods.activateCourse(course.hash).send({
        from: account.data,
      });
      managedCourses.mutate();
    } catch (err) {
      console.log("Failed to activate the course with error: ", err);
    }
  };

  const deactivateCourse = async (course: IManagedCourse) => {
    try {
      await contract.methods.deactivateCourse(course.hash).send({
        from: account.data,
      });
      managedCourses.mutate();
    } catch (err) {
      console.log("Failed to activate the course with error: ", err);
    }
  };

  return account.isAdmin ? (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {isInitialised &&
          managedCourses.data?.map((course, index) => (
            <ManagedCourseCard course={course} key={index}>
              <VerifyEmail
                key={index}
                onEmailChange={() => {
                  const obj = { ...ownershipProved };
                  if (obj[course.hash] !== undefined) {
                    delete obj[course.hash];
                    setOwnershipProved(obj);
                  }
                }}
                onVerify={(email) => {
                  verifyCourseOwnership(email, {
                    courseHash: course.hash,
                    proof: course.proof,
                  });
                }}
                verified={ownershipProved[course.hash]}
              />
              {course.state === COURSE_STATE.PURCHASED && (
                <div className="mt-2">
                  <Button
                    title="Activate"
                    variant="green"
                    onClick={() => activateCourse(course)}
                  />
                  <Button
                    title="Deactivate"
                    variant="red"
                    onClick={() => deactivateCourse(course)}
                  />
                </div>
              )}
            </ManagedCourseCard>
          ))}
      </section>
    </>
  ) : null;
};
export default ManageCourses;
