import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import { MarketHeader } from "@components/ui/marketplace";

const ManageCourses = () => {
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  );
};
export default ManageCourses;
