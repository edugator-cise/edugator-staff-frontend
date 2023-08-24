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
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from "lucide-react";
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
      <div className="relative group flex flex-col gap-y-4 group hover:shadow-md z-10 hover:shadow-black/5 hover:-translate-y-1 max-w-md cursor-pointer w-full rounded-sm hover:border-slate-300 dark:hover:border-white/20 transition border dark:border-white/10 bg-white dark:bg-nav-evendarker/40 backdrop-blur-[2px] p-5">
        <div className="gap-4 flex">
          <div className="flex flex-col relative transition ease-in">
            <div className="min-w-[50px] max-w-[50px] min-h-[50px] mb-2 rounded-lg focus:ring-2 outline-none transition">
              <SuperEllipse
                p1={1}
                p2={32}
                className="min-w-[50px] max-w-[50px] min-h-[50px] shrink-0 relative"
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
            <h1 className="text-xl font-medium font-sans mb-1">
              {enrollment?.courseName}
            </h1>
            <p className="text-[13px]">{enrollment?.courseDescription}</p>
          </div>
        </div>
        {/* <Separator /> */}
        <div className="w-full flex items-center justify-end">
          <div
            style={{
              backgroundColor: primaryColor,
            }}
            className="shrink-0 h-6 w-6 overflow-hidden flex items-center justify-center rounded-md shadow-xl relative"
          >
            <ArrowRightIcon className="h-4 w-4 absolute transition left-1/2 top-1/2 duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] -translate-x-[calc(200%+8px)] group-hover:-translate-x-1/2 -translate-y-1/2 text-white" />
            <ArrowRightIcon className="h-4 w-4 absolute transition left-1/2 top-1/2 duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] -translate-x-1/2 group-hover:translate-x-[calc(200%+8px)] -translate-y-1/2 text-white" />
          </div>
        </div>
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
      <div className="max-w-7xl p-6 lg:p-12 flex flex-col mx-auto">
        <div className="w-full flex items-center justify-between py-2">
          <h1 className="text-2xl font-medium font-sans">Courses</h1>
          <ActionButton color="blue" onClick={() => alert("todo")}>
            <PlusIcon className="h-4 w-4" />
            <p>Create Course</p>
          </ActionButton>
        </div>
        <Separator className="mt-2 mb-6" />
        <div className="dot-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-cols-auto gap-8 w-full mb-8 p-4 rounded-md bg-gray-100 relative dark:bg-nav-darkest border dark:border-slate-900">
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
