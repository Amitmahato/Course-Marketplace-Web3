import { Button } from "@components/ui/common";
import { COURSE_STATE, COURSE_STATES } from "@utils/normalize";
import { camelCaseToTitleCaseString } from "@utils/utilityFunctions";
import { useEffect, useState } from "react";

interface ICourseFilter {
  onSearch: (searchText: string, courseState: string) => void;
}

export const CourseFilter: React.FC<ICourseFilter> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [courseState, setCourseState] = useState<string>(null);

  useEffect(() => {
    onSearch(searchText, courseState);
  }, [courseState]);

  return (
    <div className="flex flex-col md:flex-row items-center my-4">
      <div className="flex mr-2 relative rounded-md">
        <input
          type="text"
          name="account"
          id="account"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
          }}
          className="w-52 sm:w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
          placeholder="0x2341ab..."
        />
        <Button
          title="Search"
          onClick={() => {
            onSearch(searchText, courseState);
          }}
        />
      </div>
      <div className="relative text-gray-700">
        <select
          className="w-72 h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
          placeholder="Regular input"
          onChange={(e) => {
            if (COURSE_STATES[e.target.value]) {
              setCourseState(e.target.value);
            } else {
              setCourseState(null);
            }
          }}
          value={courseState}
        >
          {["all", ...Object.keys(COURSE_STATES)].map((key, index) => {
            return (
              <option
                key={index}
                value={key}
                onChange={(event) => {
                  console.log(event.target);
                }}
              >
                {camelCaseToTitleCaseString(COURSE_STATES[key] ?? key)}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default CourseFilter;
