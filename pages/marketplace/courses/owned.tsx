import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import { MarketHeader } from "@components/ui/marketplace";

const OwnedCourses = () => {
  const { data } = useOwnedCourses();
  return (
    <>
      {data}
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
