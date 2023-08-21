import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CloudArrowUp } from "phosphor-react";
import ActionButton from "components/shared/Buttons/ActionButton";
import Modal from "components/shared/Modals/Modal";
import Papa from "papaparse";
import { toast } from "react-hot-toast";
import { useInviteCourseMember } from "hooks/invitations/useInviteCourseMember";

export const AddStudentModal = ({
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

  const { mutate, isLoading } = useInviteCourseMember();

  const onAddStudents = () => {
    if (inputType === "text") {
      if (students === "") {
        toast.error("Please enter student emails.");
        return;
      }
      const emails = students.split(/[\s,]+/);
      console.log(emails);
      alert(emails[0]);
      mutate({
        email: emails[0],
        role: "student",
      });
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
          {isLoading ? (
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              <PlusIcon />
              <p>Add Students</p>
            </>
          )}
        </ActionButton>
      </div>
    </Modal>
  );
};
