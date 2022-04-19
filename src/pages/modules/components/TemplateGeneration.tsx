import apiClient from "../../../app/common/apiClient";
import { IProblem, IProblemBase } from "../../../shared/types";
import { IAdminModule } from "../types";
import { catchFile } from "../../../assets/CatchHpp";
import JSZip from "jszip";
import FileSaver from "file-saver";

const generateTemplateName = (module: IAdminModule, problem: IProblemBase) => {
  let fileType = ".zip";
  let prblms = module.problems;
  for (let i = 0; i < prblms.length; i++) {
    if (prblms[i]._id === problem._id) {
      return module.number.toString() + "-" + (i + 1).toString() + fileType;
    }
  }
  return "edugator-template.zip";
};

function generateSrcFile(problem: IProblem): string {
  let inputSequence = problem.testCases[0].input.replace(/ /g, "\n\t\t");
  let outputSequence = problem.testCases[0].expectedOutput.replace(
    / /g,
    "\n\t\t"
  );
  let file = `/*\n\tSample Input:\n\t\t${inputSequence}\n\n\tSample Output:\n\t\t${outputSequence}\n*/\n\n\n`;
  file += problem.code.body;
  return file;
}

function parseFunctionName(problem: IProblem): string {
  let funcName = problem.code.body;
  funcName = funcName.substring(0, funcName.indexOf("("));
  funcName = funcName.substring(funcName.lastIndexOf("\n")).trim();
  let tempFuncName = funcName.split(" ").pop();
  if (tempFuncName !== undefined) {
    return tempFuncName;
  } else {
    return "func";
  }
}

function generateTestFile(problem: IProblem): string {
  const funcName = parseFunctionName(problem);
  let testFile = `#include "../src/src.h"\n#define CATCH_CONFIG_MAIN\n#include "catch.hpp"\n`;
  for (let i = 0; i < problem.testCases.length; i++) {
    let output = "";
    let prefix = "";
    switch (problem.testCases[i].visibility) {
      case 2:
        output = problem.testCases[i].expectedOutput;
        break;
      case 1:
        output = "?";
        prefix = "// ";
        break;
      default:
        continue;
    }
    let inputSequence = problem.testCases[i].input.trim().replace(/ /g, ", ");
    testFile += `\n${prefix}TEST_CASE("Function: ${funcName} ${i}", "[visibility: ${problem.testCases[i].visibility}]") {\n${prefix}\tREQUIRE(${funcName}(${inputSequence}) == ${output});\n${prefix}}\n`;
  }
  return testFile;
}

function generateMakefile(): string {
  let file = `CXX := g++\n\nSRC_DIR := ./src\nSRC := src.h\nSRC_FILE := $(SRC:%=$(SRC_DIR)/%)\n\nTEST_DIR := ./test\nTEST = test.cpp\nTEST_FILE := $(TEST:%=$(TEST_DIR)/%)\n\nBUILD_DIR := ./build\nOBJECT := $(TEST:%=$(BUILD_DIR)/%)\nOBJECT_FILE := $(OBJECT:.cpp=.o)\nTARGET := test\nTARGET_EXEC:= $(TARGET:%=$(BUILD_DIR)/%)\n\n\${TARGET_EXEC}: \${OBJECT_FILE}\n\t\${CXX} \${OBJECT_FILE} -o \${TARGET_EXEC}\n\n\${OBJECT_FILE}: \${TEST_FILE} \${SRC_FILE}\n\t\${CXX} -c \${TEST_FILE} -o \${OBJECT_FILE}\n\n.PHONY: clean\nclean:\n\tdel /q "\${BUILD_DIR}"\\*`;
  return file;
}

function generateCatchFile(): string {
  return catchFile;
}

function generateREADMEFile(): string {
  const file = `PREREQUISITES:
	g++ installed on system
	mingw32 or gnu make installed on system
		https://sourceforge.net/projects/mingw/files/MinGW/Extension/make/mingw32-make-3.80-3/
		-or-
		https://www.opensourceforu.com/2012/06/gnu-make-in-detail-for-beginners/, https://stackoverflow.com/a/32127632
	Open template folder in VSCode
	Implement function found in src.h

ADDING A NEW TEST CASE:
	Copy and paste an existing, uncommented test case to the end of test.cpp
	Update the "Function: " field of the new test case (increment the value following the function name)
	Update the I/O of the new test case (Within the REQUIRE clause)

RUNNING UNIT TESTS
	Open a new terminal
	Inside terminal, input: "mingw32-make" or "make" (compile code)
		Former if installed mingw32 or latter if installed gnu make
	Inside terminal, input "cd build" (cd into build directory)
	Inside terminal, input: test (run the executable)

	Note: To clean build directory (remove executables and object files):
		Inside terminal, input "cd .." (cd into root directory)
		Inside terminal, input "make clean" or "mingw32-make clean"
			Former if installed mingw32 or latter if installed gnu make

	Note: should repeat this process everytime src.h or test.cpp is updated
`;
  return file;
}

export function TemplateGenerator(module: IAdminModule, problem: IProblemBase) {
  apiClient
    .get<IProblem>(`v1/admin/problem/${problem._id}`)
    .then((response) => {
      const { data } = response;

      const name = generateTemplateName(module, problem);
      const src = generateSrcFile(data);
      const test = generateTestFile(data);
      const make = generateMakefile();
      const ctch = generateCatchFile();
      const readme = generateREADMEFile();
      let zip: JSZip = new JSZip();

      zip.file("makefile", make);
      zip.file("README.txt", readme);
      zip.folder("build");
      const srcF = zip.folder("src");
      const testF = zip.folder("test");
      if (srcF !== null && testF !== null) {
        srcF.file("src.h", src);
        testF.file("test.cpp", test);
        testF.file("catch.hpp", ctch);
      }

      zip.generateAsync({ type: "blob" }).then(function (content) {
        FileSaver.saveAs(content, name);
      });
    });
}
