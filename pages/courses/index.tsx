import AdminLayout from "components/layouts/AdminLayout";
import Image from "next/image";
import React from "react";
import { sampleCourses } from "state/courseSlice";
import Color from "color-thief-react";
import { FidgetSpinner } from "tabler-icons-react";
import Link from "next/link";

// dashboard for students and instructor.
// accessible only if authenticated and has active session.
// all info dependent on permissions in organization is fetched in client hook

const DashboardPage = () => {
  return (
    <div className="w-full h-full bg-slate-100">
      <div className="max-w-7xl p-8 flex flex-col">
        <h1 className="text-2xl font-medium font-sans mb-8">Dashboard</h1>
        <h1 className="text-lg font-sans mb-4">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-cols-auto gap-8 w-full">
          {sampleCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div
                key={course.id}
                className="w-full flex flex-col rounded-md border border-slate-200 bg-white hover:border-slate-300 duration-300 transition hover:shadow-md hover:shadow-black/5 cursor-pointer group"
              >
                <Color src={course.logo} format="hex" crossOrigin="">
                  {({ data, loading, error }) => (
                    <div className="w-full h-32 rounded-t-[5px] overflow-hidden relative bg-nav-dark">
                      <div
                        style={{
                          //backgroundColor: loading || error ? "#000" : data,
                          background: `radial-gradient(50% 70% at 50% 90%, ${data}40 0%, rgba(255, 255, 255, 0) 100%)`,
                        }}
                        className={`absolute w-full h-full inset-0 transition duration-500 ${
                          loading || error
                            ? "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      />
                      <div
                        style={{
                          backgroundImage: `radial-gradient(${data}9b 1px, transparent 0)`,
                          backgroundSize: "30px 30px",
                          backgroundPosition: "-0px 4px",
                          // radial mask
                          WebkitMaskImage:
                            "radial-gradient(circle at 50% 100%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
                        }}
                        className={`w-full h-full absolute inset-0 transition duration-[1000ms] ${
                          loading || error
                            ? "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      />
                    </div>
                  )}
                </Color>
                <div className="p-4 pt-8 relative transition ease-in group-hover:-translate-y-[2px]">
                  <div className="absolute -top-8 left-4 ring ring-white min-w-[56px] min-h-[56px] rounded-xl focus:ring-2 outline-none transition">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={
                        course.logo ||
                        "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                      }
                      alt="User profile picture"
                      className="rounded-xl"
                    />
                  </div>
                  <h1 className="text-xl font-medium font-sans">
                    {course.courseName}
                  </h1>
                  <p className="text-sm text-slate-500">{course.endDate}</p>

                  <div className="w-full h-px bg-slate-200 mt-4"></div>
                  <div className="flex space-x-2 mt-4">
                    <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full relative focus:ring-2 outline-none transition">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={
                          course.logo ||
                          "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                        }
                        alt="User profile picture"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-0 overflow-hidden">
                      <p className="text-sm font-dm text-slate-800 whitespace-nowrap truncate max-w-full">
                        {course.endDate}
                      </p>
                      <p className="text-xs text-slate-500 truncate whitespace-nowrap">
                        {course.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  // todo rename AdminLayout
  return <AdminLayout pageTitle="dashboard">{page}</AdminLayout>;
};

export default DashboardPage;
