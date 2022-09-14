import { useAccount } from "@components/hooks/web3/useAccount";
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";

const OwnedCourses = ({ courses }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  return (
    <>
      {"[ " + ownedCourses.data.join(", ") + " ]"}
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message type={MessageTypes.success}>Purchased!</Message>
          <Button title="Watch the course" />
        </OwnedCourseCard>
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
