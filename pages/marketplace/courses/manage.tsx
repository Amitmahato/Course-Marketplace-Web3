import { useAdmin } from "@components/hooks/web3/useAdmin";
import { useManagedCourses } from "@components/hooks/web3/useManagedCourses";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import { COURSE_STATE, COURSE_STATES } from "@utils/normalize";
import { withToast } from "@utils/toast";
import { isHex } from "@utils/utilityFunctions";
import { IManagedCourse } from "interfaces/course";
import { useEffect, useState } from "react";

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
      const result = await contract.methods.activateCourse(course.hash).send({
        from: account.data,
      });
      managedCourses.mutate();
      return result;
    } catch (err) {
      console.log("Failed to activate the course with error: ", err);
      throw new Error(err.message);
    }
  };

  const deactivateCourse = async (course: IManagedCourse) => {
    try {
      const result = await contract.methods.deactivateCourse(course.hash).send({
        from: account.data,
      });
      managedCourses.mutate();
      return result;
    } catch (err) {
      console.log("Failed to activate the course with error: ", err);
      throw new Error(err.message);
    }
  };

  const [filteredCourses, setFilteredCourses] = useState<IManagedCourse[]>(
    managedCourses.data || []
  );

  useEffect(() => {
    if (managedCourses.data) {
      setFilteredCourses(managedCourses.data);
    }
  }, managedCourses.data);

  const onSearch = (searchText: string, courseState: string) => {
    let filtered: IManagedCourse[] = [];
    if (searchText.length === 0 || !isHex(searchText)) {
      filtered = managedCourses.data || [];
    } else if (isHex(searchText)) {
      filtered = managedCourses.data?.filter((course) =>
        course.hash.includes(searchText)
      );
    } else {
      console.log("Invalid course hash provided in the search input");
    }

    if (courseState) {
      filtered = filtered.filter(
        (course) => course.state === COURSE_STATES[courseState]
      );
    }
    setFilteredCourses(filtered);
  };

  return account.isAdmin ? (
    <>
      <MarketHeader />
      <CourseFilter onSearch={onSearch} />
      <section className="grid grid-cols-1">
        {isInitialised ? (
          filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
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
                      onClick={() => withToast(activateCourse(course))}
                    />
                    <Button
                      title="Deactivate"
                      variant="red"
                      onClick={() => withToast(deactivateCourse(course))}
                    />
                  </div>
                )}
              </ManagedCourseCard>
            ))
          ) : (
            <Message type={MessageTypes.warning} size="md">
              No Courses to display
            </Message>
          )
        ) : null}
      </section>
    </>
  ) : null;
};
export default ManageCourses;
