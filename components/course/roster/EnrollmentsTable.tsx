import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "phosphor-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  COURSE_ROLES,
  CourseRole,
} from "hooks/invitations/useGetUserInvitations";
import { getPaginationRowModel } from "@tanstack/react-table";

import { useGetCourseEnrollments } from "hooks/enrollments/useGetCourseEnrollments";
import { useDeleteEnrollment } from "hooks/enrollments/useDeleteEnrollment";
import { CourseEnrollment } from "hooks/enrollments/useGetUserEnrollments";
import TableLoading from "./TableLoading";
import { camelCaseToSpacedTitleCase, toTitleCase } from "@/lib/textUtils";
import { ArrowUpDown } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateEnrollment } from "hooks/enrollments/useUpdateEnrollment";
import TableError from "./TableError";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { RosterControls } from "pages/courses/[courseId]/roster";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type EnrollmentTableDisplay = {
  name: JSX.Element;
  email: string;
  role: JSX.Element;
  status: JSX.Element;
  actions: JSX.Element;
};

const EnrollmentsTable = () => {
  const {
    data: enrollmentsData,
    isFetching: enrollmentsFetching,
    isError: enrollmentsError,
    error: enrollmentsErrorData,
  } = useGetCourseEnrollments();

  const { mutate: updateRole, isLoading: updateRoleLoading } =
    useUpdateEnrollment();

  const { mutate: deleteEnrollment, isLoading: deleteEnrollmentLoading } =
    useDeleteEnrollment();

  // column definitions for the enrollments table
  const columns: ColumnDef<EnrollmentTableDisplay>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell(props) {
        return <div>{props.getValue()}</div>;
      },
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <div>Email</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell(props) {
        return <div>{props.getValue()}</div>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell(props) {
        return <div>{props.getValue()}</div>;
      },
    },
    {
      header: "",
      accessorKey: "actions",
      cell(props) {
        return <div>{props.getValue()}</div>;
      },
    },
  ];

  const statusBadge = (enrollment: CourseEnrollment) => {
    const status = enrollment.status;

    return (
      <Badge
        variant={
          status === "removed"
            ? "destructive"
            : status === "pending"
            ? "secondary"
            : "default"
        }
      >
        {toTitleCase(status)}
      </Badge>
    );
  };

  const avatar = (enrollment: CourseEnrollment) => (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-7 h-7 border rounded-full overflow-hidden">
        <img src={enrollment.avatar} alt={enrollment.name} />
      </div>
      <p>{enrollment.name}</p>
    </div>
  );

  const roleSelect = (enrollment: CourseEnrollment) => (
    <Select
      value={enrollment.role}
      onValueChange={(value) => {
        updateRole({ userId: enrollment.userId, role: value as CourseRole });
      }}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(COURSE_ROLES).map((role) => (
            <SelectItem value={role}>
              {camelCaseToSpacedTitleCase(role)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  const actions = (enrollment: CourseEnrollment) => (
    <div className="flex gap-2 justify-end w-full">
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div
            onClick={() => {
              deleteEnrollment(enrollment.userId);
            }}
            className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-red-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full"
          >
            <Trash className="text-red-500 w-4 h-4" strokeWidth={1.5} />
          </div>
        </TooltipTrigger>
        <TooltipContent align="center">Remove Student</TooltipContent>
      </Tooltip>
    </div>
  );

  const tableData = enrollmentsData?.map((enrollment) => ({
    name: avatar(enrollment),
    email: enrollment.email,
    role: roleSelect(enrollment),
    status: statusBadge(enrollment),
    actions: actions(enrollment),
  })) as EnrollmentTableDisplay[];

  const table = useReactTable({
    data: tableData,
    columns,
    initialState: {
      pagination: {
        pageSize: 1,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (enrollmentsError) {
    return <TableError />;
  }
  if (enrollmentsFetching || !table) {
    return <TableLoading />;
  }
  return (
    <div className="space-y-2">
      <p className="text-base font-dm font-semibold text-slate-700 whitespace-nowrap">
        {enrollmentsData ? (
          `${enrollmentsData.length} student${
            enrollmentsData.length === 1 ? "" : "s"
          }`
        ) : (
          <Skeleton className="w-24 h-3" />
        )}
      </p>

      <DataTable
        columns={columns}
        data={tableData}
        controls={<RosterControls />}
      />
    </div>
  );
};

export default EnrollmentsTable;
