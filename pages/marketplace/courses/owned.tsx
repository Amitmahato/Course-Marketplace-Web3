import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { Button, Message } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";

const OwnedCourses = ({ courses }) => {
  const router = useRouter();
  const { account, isSupported } = useWalletInfo();
  const { ownedCourses, isInitialised } = useOwnedCourses(
    courses,
    account.data
  );

  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {isInitialised && isSupported && ownedCourses.data?.length > 0 ? (
          ownedCourses.data?.map((course) => (
            <OwnedCourseCard key={course.id} course={course}>
              {/* <Message type={MessageTypes.success}>Purchased!</Message> */}
              <Button
                onClick={() => router.push(`/courses/${course.slug}`)}
                title="Watch the course"
              />
            </OwnedCourseCard>
          ))
        ) : (
          <div className="w-1/2">
            <Message type={MessageTypes.warning}>
              <div>You do not own any courses!</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline cursor:pointer">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        )}
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
