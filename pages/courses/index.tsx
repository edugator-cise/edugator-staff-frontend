import AdminLayout from "components/layouts/AdminLayout";
import Image from "next/image";
import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import {
  setAdminContentSidebarHidden,
  setAdminMainSidebarHidden,
  setContentSidebarHidden,
} from "state/interfaceControls.slice";
import { Button } from "@/components/ui/button";
import ActionButton from "components/shared/Buttons/ActionButton";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      <div
        style={{
          borderLeftColor: primaryColor,
        }}
        className="relative w-full p-5 flex flex-col space-y-4 border-l hover:border-l-4 rounded-lg ring-1 ring-transparent hover:ring-offset-2 dark:ring-offset-nav-evendarker dark:hover:ring-slate-700 hover:ring-blue-400 bg-slate-100 dark:bg-nav-darker  duration-300 transition-all hover:shadow-md hover:shadow-black/5 cursor-pointer group"
      >
        <div className="gap-4 flex">
          {/* <div className="absolute z-10 top-2 right-2 border rounded-sm bg-gray-100 text-gray-500 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 cursor-pointer transition">
          <DotsHorizontalIcon className="w- h-" />
        </div> */}
          {/* <div
          className="w-full h-28 rounded-t-[5px] overflow-hidden relative bg-nav-dark"
          style={{
            backgroundColor: primaryColor,
          }}
        ></div> */}
          <div className="min-w-[50px] min-h-[50px] rounded-lg focus:ring-2 outline-none transition">
            <SuperEllipse
              p1={1}
              p2={32}
              className="min-w-[50px] min-h-[50px] shrink-0 relative"
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={enrollment?.courseLogo || placeholderAvatar}
                alt="User profile picture"
                className="rounded-xl"
              />
              {/* children */}
            </SuperEllipse>
          </div>
          <div className="flex flex-col relative transition ease-in">
            <h1 className="text-xl font-medium font-sans mb-1">
              {enrollment?.courseName}
            </h1>
            <p className="text-[13px]">{enrollment?.courseDescription}</p>
          </div>
        </div>
        {/* <Separator /> */}
      </div>
    </Link>
  );
};

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminMainSidebarHidden(true));
    dispatch(setAdminContentSidebarHidden(true));
    dispatch(setContentSidebarHidden(true));
  }, []);

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
    <div className="w-full h-full bg-white dark:bg-nav-evendarker">
      <div className="max-w-7xl p-8 flex flex-col">
        <div className="w-full flex items-center justify-between py-2">
          <h1 className="text-2xl font-medium font-sans">Courses</h1>
          <ActionButton color="blue" onClick={() => alert("todo")}>
            <PlusIcon className="h-4 w-4" />
            <p>Create Course</p>
          </ActionButton>
        </div>
        <Separator className="mt-2 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-cols-auto gap-8 w-full mb-8">
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
