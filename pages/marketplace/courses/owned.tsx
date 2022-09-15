import { useAccount } from "@components/hooks/web3/useAccount";
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";

const OwnedCourses = ({ courses }) => {
  const router = useRouter();
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  console.log("Owned Courses : ", ownedCourses.data);

  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.data?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            {/* <Message type={MessageTypes.success}>Purchased!</Message> */}
            <Button
              onClick={() => router.push(`/courses/${course.slug}`)}
              title="Watch the course"
            />
          </OwnedCourseCard>
        ))}
      </section>
    </>
  );
};
export default OwnedCourses;

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
