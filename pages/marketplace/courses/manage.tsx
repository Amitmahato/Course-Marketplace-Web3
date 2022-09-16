import { useManagedCourses } from "@components/hooks/web3/useManagedCourses";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { Button } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";

const ManageCourses = () => {
  const { account } = useWalletInfo();
  const { managedCourses, isInitialised } = useManagedCourses(account.data);

  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {isInitialised &&
          managedCourses.data?.map((course) => (
            <ManagedCourseCard course={course}>
              <div className="flex mr-2 relative rounded-md">
                <input
                  type="text"
                  name="account"
                  id="account"
                  className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0x2341ab..."
                />
                <Button title="Verify" />
              </div>
            </ManagedCourseCard>
          ))}
      </section>
    </>
  );
};
export default ManageCourses;
