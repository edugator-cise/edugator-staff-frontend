import AdminLayout from "components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import {
  DownloadIcon,
  Pencil2Icon,
  PlusIcon,
  ReloadIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useGetCourseStructure } from "hooks/course/useGetCourseStructure";
import { setAdminContentSidebarHidden } from "state/interfaceControls.slice";
import { useEffect } from "react";
import { Trash, UsersThree } from "phosphor-react";
import ActionButton from "components/shared/Buttons/ActionButton";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Download } from "tabler-icons-react";

const RosterPage = () => {
  const { data: courseStructureData, isFetching: courseStructureFetching } =
    useGetCourseStructure({
      admin: true,
    });

  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const { course } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    console.log("course", course);
  }, [course]);

  return (
    <div className="h-screen pb-12 min-h-screen w-full text-slate-800 bg-slate-100 relative">
      <div className="w-full h-[3.5rem] py-3 px-4 flex justify-between items-center bg-slate-50 border-b">
        <div />
        <div className="w-8 h-8 bg-gradient-to-b from-indigo-400 to-blue-400  shadow-md rounded-full"></div>
      </div>
      <div className="p-6 lg:p-12 w-full h-full !overflow-y-auto">
        <div className="w-full max-w-7xl flex flex-col">
          <div className="flex space-x-6 items-center">
            <div className="w-14 h-14 rounded-md bg-slate-300 ring-1 flex items-center justify-center ring-offset-1 ring-offset-slate-200 ring-slate-400/70 shadow-inner">
              <UsersThree
                size={36}
                weight="duotone"
                className="text-slate-100"
              />
            </div>
            <div className="flex flex-col space-y-[2px] justify-center">
              <h1 className="text-[26px] font-medium font-dm">Roster</h1>
              <p className="font-dm text-slate-600 text-sm max-w-4xl text-left">
                Manage your course roster and view student progress.
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-slate-200 mt-8" />
          <div className="w-full flex flex-col justify-between items-start space-y-2 sm:flex-row sm:items-center !mt-8 mb-4">
            <h1 className="text-xl font-medium font-dm">Students</h1>
            <div className="flex space-x-2">
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="w-fit">
                      <ActionButton
                        disabled={false}
                        color="gray"
                        onClick={() => {}}
                        className="!px-2"
                      >
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                      </ActionButton>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={5}
                      align="center"
                      className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                    >
                      Download Roster
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <ActionButton color="blue" onClick={() => {}}>
                <UpdateIcon />
                <p>Sync Roster</p>
              </ActionButton>
              <ActionButton color="green" onClick={() => {}}>
                <PlusIcon />
                <p>Add Students</p>
              </ActionButton>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-sm">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400 border ">
              <thead className="font-dm text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {/* Actions */}
                  </th>
                </tr>
              </thead>
              <tbody className="[&>*:last-child]:border-none font-dm">
                {Array.from(Array(8).keys()).map((i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 last:bg-red-500"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4  font-medium text-slate-900 whitespace-nowrap dark:text-white"
                    >
                      Phillip Phan
                    </th>
                    <td className="px-6 py-2">studentemail@ufl.edu</td>
                    <td className="px-6 py-2">Student</td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-2 justify-end w-full">
                        <Tooltip.Provider delayDuration={100}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-blue-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full">
                                <Pencil2Icon
                                  className="text-slate-500 w-4 h-4"
                                  strokeWidth={1.5}
                                />
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={5}
                                align="center"
                                className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                              >
                                Edit Student
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                        <Tooltip.Provider delayDuration={100}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-red-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full">
                                <Trash
                                  className="text-red-500 w-4 h-4"
                                  strokeWidth={1.5}
                                />
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={5}
                                align="center"
                                className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                              >
                                Remove Student
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-white dark:bg-slate-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
                  >
                    Phillip Phan
                  </th>
                  <td className="px-6 py-2">studentemail@ufl.edu</td>
                  <td className="px-6 py-2">TA</td>
                  <td className="px-6 py-2">
                    <div className="flex space-x-2 justify-end w-full">
                      <Tooltip.Provider delayDuration={100}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-blue-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full">
                              <Pencil2Icon
                                className="text-slate-500 w-4 h-4"
                                strokeWidth={1.5}
                              />
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              align="center"
                              className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                            >
                              Edit Student
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      <Tooltip.Provider delayDuration={100}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div className="rounded-md p-2 relative cursor-pointer after:inset-0 after:w-full after:hover:bg-red-500/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full">
                              <Trash
                                className="text-red-500 w-4 h-4"
                                strokeWidth={1.5}
                              />
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              align="center"
                              className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                            >
                              Remove Student
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

RosterPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Roster">{page}</AdminLayout>
);

export default RosterPage;
