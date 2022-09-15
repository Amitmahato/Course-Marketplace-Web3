import { COURSE_STATE } from "@utils/normalize";
import Link from "next/link";
import React from "react";

interface ICurriculam {
  lectures: string[];
  locked: boolean;
  state: COURSE_STATE;
}

const Curriculam: React.FC<ICurriculam> = ({ lectures, locked, state }) => {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Section 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lectures.map((lec) => (
                    <tr key={lec}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lec}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            locked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {locked ? "Locked" : "Unlocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {state === COURSE_STATE.ACTIVATED ? (
                          <Link href="/watch">
                            <a className="text-indigo-600 hover:text-indigo-900">
                              Watch
                            </a>
                          </Link>
                        ) : state === COURSE_STATE.PURCHASED ? (
                          <Link href="/faq">
                            <a className="text-yellow-600 hover:text-yellow-900">
                              Waiting for Activation
                            </a>
                          </Link>
                        ) : (
                          <Link href="/marketplace">
                            <a className="text-indigo-600 hover:text-indigo-900">
                              Get Access
                            </a>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculam;
