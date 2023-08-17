import AdminLayout from "components/layouts/AdminLayout";
import Image from "next/image";
import React from "react";
import { FidgetSpinner } from "tabler-icons-react";
import Link from "next/link";
import SuperEllipse from "react-superellipse";
import { usePalette } from "react-palette";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  CourseEnrollment,
  useGetUserEnrollments,
} from "hooks/enrollments/useGetUserEnrollments";
import { useGetUserInvitations } from "hooks/invitations/useGetUserInvitations";
import { CheckmarkIcon } from "react-hot-toast";
import { XCircle } from "phosphor-react";
import { useAcceptInvitation } from "hooks/invitations/useAcceptInvitation";
import { placeholderAvatar } from "constants/coverImageData";

// dashboard for students and instructor.
// accessible only if authenticated and has active session.
// all info dependent on permissions in organization is fetched in client hook

const CourseCard = ({
  enrollment,
}: {
  enrollment: CourseEnrollment | undefined;
}) => {
  const {
    data: colors,
    loading: colorLoading,
    error: colorError,
  } = usePalette(enrollment ? enrollment?.courseLogo : "");

  const primaryColor = colors.vibrant || colors.lightVibrant || "#000";

  return (
    <Link
      href={`/courses/${enrollment?.courseId}`}
      key={`${enrollment?.courseId}-${enrollment?.userId}`}
    >
      <div className="relative w-full flex flex-col rounded-md border border-slate-200 bg-white hover:border-slate-300 duration-300 transition hover:shadow-md hover:shadow-black/5 cursor-pointer group">
        <div className="absolute z-10 top-2 right-2 border rounded-sm bg-gray-100 text-gray-500 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 cursor-pointer transition">
          <DotsHorizontalIcon className="w- h-" />
        </div>
        <div
          className="w-full h-28 rounded-t-[5px] overflow-hidden relative bg-nav-dark"
          style={{
            backgroundColor: primaryColor,
          }}
        ></div>
        <div className="p-4 pt-8 relative transition ease-in group-hover:-translate-y-[1px]">
          <div className="absolute -top-8 left-4 min-w-[56px] min-h-[56px] rounded-lg focus:ring-2 outline-none transition">
            <SuperEllipse
              p1={3}
              p2={30}
              className="min-w-[56px] min-h-[56px] bg-gray-100 flex items-center justify-center drop-shadow-2xl"
            >
              <SuperEllipse
                p1={1}
                p2={32}
                className="min-w-[52px] min-h-[52px]"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={enrollment?.courseLogo || placeholderAvatar}
                  alt="User profile picture"
                  className="rounded-xl"
                />
                <div className="w-full h-full bg-blue-500"></div>
                {/* children */}
              </SuperEllipse>
            </SuperEllipse>
          </div>
          <h1 className="text-xl font-medium font-sans mb-1">
            {enrollment?.courseName}
          </h1>
          <p className="text-[13px] text-gray-500">
            {enrollment?.courseDescription}
          </p>

          <div className="w-full h-px bg-gray-200 mt-4"></div>
          {enrollment?.instructors.map((instructor) => (
            <div className="flex space-x-2 mt-4">
              <div
                style={{
                  backgroundColor: primaryColor,
                }}
                className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full relative focus:ring-2 outline-none transition"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={instructor.image || placeholderAvatar}
                  alt="User profile picture"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-0 overflow-hidden">
                <p className="text-sm font-dm text-slate-800 whitespace-nowrap truncate max-w-full">
                  {instructor.name}
                </p>
                <p className="text-xs text-slate-500 truncate whitespace-nowrap">
                  Instructor
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

const DashboardPage = () => {
  const {
    data: enrollmentsData,
    isFetching: enrollmentsFetching,
    isError: enrollmentsError,
  } = useGetUserEnrollments();

  const {
    data: invitationsData,
    isFetching: invitationsFetching,
    isError: invitationsError,
  } = useGetUserInvitations();

  const { mutate, isLoading } = useAcceptInvitation();

  return (
    <div className="w-full h-full bg-slate-100">
      <div className="max-w-7xl p-8 flex flex-col">
        <h1 className="text-2xl font-medium font-sans mb-8">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-cols-auto gap-8 w-full mb-8">
          {enrollmentsData?.map((enrollment) => {
            return <CourseCard enrollment={enrollment} />;
          })}
        </div>
        <h1 className="text-xl font-medium font-sans mb-8">Invites</h1>
        {invitationsData?.map((invitation) => {
          return (
            <div className="w-96 flex items-center border space-x-2 shadow-lg p-4">
              <p>{invitation.courseId}</p>
              <p>{invitation.role}</p>
              <button
                onClick={() => {
                  alert(JSON.stringify(invitation));
                  mutate(invitation.id);
                }}
                className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-full"
              >
                {isLoading ? (
                  <FidgetSpinner className="animate-spin" />
                ) : (
                  <CheckmarkIcon />
                )}
              </button>
              <XCircle />
            </div>
          );
        })}
      </div>
    </div>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  // todo rename AdminLayout
  return <AdminLayout pageTitle="dashboard">{page}</AdminLayout>;
};

export default DashboardPage;
