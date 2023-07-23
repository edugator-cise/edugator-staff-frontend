import AdminLayout from "components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Pencil2Icon, PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useGetCourseStructure } from "hooks/course/useGetCourseStructure";
import { useEffect, useState } from "react";
import { CloudArrowUp, Trash, UsersThree } from "phosphor-react";
import ActionButton from "components/shared/Buttons/ActionButton";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Download } from "tabler-icons-react";
import Modal from "components/shared/Modals/Modal";
import AnimateHeight from "react-animate-height";
import Papa from "papaparse";
import { toast } from "react-hot-toast";

const AddStudentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [students, setStudents] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [parsedStudents, setParsedStudents] = useState<string[]>([]);

  const onAddStudents = () => {
    if (inputType === "text") {
      if (students === "") {
        toast.error("Please enter student emails.");
        return;
      }
      const emails = students.split(/[\s,]+/);
      console.log(emails);
      setParsedStudents(emails);
    } else {
      if (file === null) {
        toast.error("Please upload a file.");
        return;
      }
      Papa.parse(file, {
        delimiter: ",",
        complete: function (results) {
          const emails = results.data.flat();
          setParsedStudents(emails as string[]);
          console.log(emails);
        },
      });
    }
    toast.success("Students added successfully.");
    setTimeout(() => {
      setStudents("");
      setFile(null);
      setInputType("text");
    }, 200);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add Students"
      onClose={() => {
        setTimeout(() => {
          setInputType("text");
          setStudents("");
          setFile(null);
        }, 200);
      }}
    >
      <ul className="relative font-dm flex w-full mb-4 rounded-md ring-offset-1 ring-offset-slate-200 ring-slate-400/70 bg-slate-200 shadow-inner ring-1 ring-slate-800">
        <div
          className={`pointer-events-none absolute top-0 z-0 h-full w-1/2 transition-all ${
            inputType === "file" ? "translate-x-full p-1" : "translate-x-0 p-1"
          }`}
        >
          <div className="h-full w-full rounded-[5px] bg-white border border-slate-300 shadow-sm"></div>
        </div>
        <li className="z-10 w-full">
          <input
            type="radio"
            id="text"
            name="inputType"
            checked={inputType === "text"}
            onChange={() => setInputType("text")}
            className="peer hidden"
            required
          />
          <label
            htmlFor="text"
            className="inline-flex w-full cursor-pointer items-center justify-center p-3 text-gray-500 transition rounded-l-[9px] hover:text-gray-600 hover:bg-slate-500/10 peer-checked:text-gray-600 peer-checked:hover:bg-transparent"
          >
            <div className="block">
              <div className="w-full text-sm">Text</div>
            </div>
          </label>
        </li>
        <li className="z-10 w-full">
          <input
            type="radio"
            id="file"
            name="inputType"
            checked={inputType === "file"}
            onChange={() => setInputType("file")}
            className="peer hidden"
          />
          <label
            htmlFor="file"
            className="inline-flex w-full cursor-pointer items-center justify-center p-3 text-gray-500 transition rounded-r-[9px] hover:text-gray-600 hover:bg-slate-500/10 peer-checked:text-gray-600 peer-checked:hover:bg-transparent"
          >
            <div className="block">
              <div className="w-full text-sm">File</div>
            </div>
          </label>
        </li>
      </ul>
      <p className="text-slate-500 mt-2 mb-4 text-sm leading-normal font-dm">
        {inputType === "text"
          ? "Type or paste in student's emails here. For multiple students, separate emails with a comma or newline."
          : "Upload a CSV file containing student emails.  "}
      </p>

      {inputType === "file" ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {file ? (
            <div className="flex flex-col space-y-2 items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Attached: {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Click to change file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudArrowUp
                className="w-6 h-6 text-gray-500 mb-2"
                strokeWidth={1.5}
              />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload file</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={(e) => {
              console.log(e.target.files);
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>
      ) : (
        <textarea
          className="w-full h-32 p-2 bg-gray-50 border rounded-md max-h-[250px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
          placeholder="mdiaz@ufl.edu, prayujt@ufl.edu, ..."
          value={students}
          onChange={(e) => setStudents(e.target.value)}
        />
      )}
      <div className="w-full flex items-center justify-end mt-2 space-x-2">
        <button
          className="font-bold transition hover:bg-gray-100 px-4 py-[10px] text-xs rounded-md font-dm text-gray-500"
          disabled={false}
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <ActionButton
          color="green"
          disabled={false}
          onClick={() => {
            onAddStudents();
          }}
        >
          <PlusIcon />
          <p>Add Students</p>
        </ActionButton>
      </div>
    </Modal>
  );
};

const RosterPage = () => {
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  return (
    <div className="h-screen pb-12 min-h-screen w-full text-slate-800 bg-slate-100 relative">
      <AddStudentModal
        open={addStudentModalOpen}
        setOpen={setAddStudentModalOpen}
      />

      <div className="w-full h-[3.5rem] py-3 px-4 flex justify-between items-center bg-white border-b">
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
                Manage your course roster to add students and collaborators.
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
              <ActionButton
                color="green"
                onClick={() => {
                  setAddStudentModalOpen(true);
                }}
              >
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
                    className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 last:border-none"
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
