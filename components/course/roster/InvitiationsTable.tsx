import { useCancelInvitation } from "hooks/invitations/useCancelInvitation";
import { useGetCourseInvitations } from "hooks/invitations/useGetCourseInvitations";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  COURSE_ROLES,
  CourseInvitation,
  CourseRole,
} from "hooks/invitations/useGetUserInvitations";
import TableLoading from "./TableLoading";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { camelCaseToSpacedTitleCase } from "@/lib/textUtils";
import { useUpdateInvitationRole } from "hooks/invitations/useUpdateInvitationRole";
import TableError from "./TableError";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { RosterControls } from "pages/courses/[courseId]/roster";
import { Skeleton } from "@/components/ui/skeleton";

type InvitationTableDisplay = {
  email: string;
  role: JSX.Element;
  actions: JSX.Element;
};

const InvitiationsTable = () => {
  const {
    data: invitationsData,
    isFetching: invitationsFetching,
    isError: invitationsError,
  } = useGetCourseInvitations();

  const { mutate: updateRole, isLoading: updateRoleLoading } =
    useUpdateInvitationRole();

  const { mutate: cancelInvitation, isLoading: cancelInvitationLoading } =
    useCancelInvitation();

  // column definitions for the invitations table
  const columns: ColumnDef<InvitationTableDisplay>[] = [
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
      header: "",
      accessorKey: "actions",
      cell(props) {
        return <div>{props.getValue()}</div>;
      },
    },
  ];

  const roleSelect = (invitation: CourseInvitation) => (
    <Select
      value={invitation.role}
      onValueChange={(value) => {
        updateRole({ invitationId: invitation.id, role: value as CourseRole });
      }}
    >
      <SelectTrigger className="w-[180px]">
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

  const actions = (invitation: CourseInvitation) => (
    <div className="flex gap-2 justify-end w-full">
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div
            onClick={() => {
              cancelInvitation(invitation.id);
            }}
            className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-red-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full"
          >
            <CircleBackslashIcon
              className="text-red-500 w-4 h-4"
              strokeWidth={1.5}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent align="center">Cancel Invitation</TooltipContent>
      </Tooltip>
    </div>
  );

  const tableData = invitationsData?.map((invitation) => ({
    email: invitation.email,
    role: roleSelect(invitation),
    actions: actions(invitation),
  })) as InvitationTableDisplay[];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (invitationsError) {
    return <TableError />;
  }
  if (invitationsFetching || !table) {
    return <TableLoading />;
  }
  return (
    <div className="space-y-2">
      <p className="text-base font-dm font-semibold whitespace-nowrap">
        {invitationsData ? (
          `${invitationsData.length} pending invitation${
            invitationsData.length === 1 ? "" : "s"
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

export default InvitiationsTable;
