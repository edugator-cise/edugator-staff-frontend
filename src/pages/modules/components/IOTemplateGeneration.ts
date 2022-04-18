import apiClient from "../../../app/common/apiClient";
import { IProblem, IProblemBase } from "../../../shared/types";
import { IAdminModule } from "../types";
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const generateTemplateName = (module: IAdminModule, problem: IProblemBase) => {
    let fileType = '.zip'; 
    let prblms = module.problems;
    for (let i = 0; i < prblms.length; i++) {
        if (prblms[i]._id === problem._id) {
            return module.number.toString() + '-' + (i+1).toString() + fileType;
        }
    }
    return "edugator-template.zip";
};

function generateIOFiles(problem: IProblem, testFolder: JSZip): void {
    for(let i = 0; i < problem.testCases.length; i++){
        console.log(problem.testCases[i]);
        testFolder.file("input" + (i + 1) + ".txt", problem.testCases[i].input);
        testFolder.file("output" + (i + 1) + ".txt", problem.testCases[i].expectedOutput);
    }
}

function generateMakefile(): string {
    let makefile = `run_linux:
	g++ -o studentCode.out src/*
	g++ -o tester.out srcForTemplate/Tester.cpp -lstdc++fs -lboost_system -lboost_filesystem

run_windows:
	g++ -o studentCode.out src/*
	g++ -o tester.out srcForTemplate/Tester.cpp -lstdc++fs -lboost_system -lboost_filesystem -DBOOST_USE_WINDOWS_H -DWIN32_LEAN_AND_MEAN -lwsock32 -DBOOST_NO_CXX11_SCOPED_ENUMS`;
    return makefile;
}

function generateTesterFile(): string {
    let tester = `
    // Necessary code for filesystem usage
    #  if __cplusplus >= 201703L && __has_include(<filesystem>)
    #   include <filesystem>
        namespace fs = std::filesystem;
    #  elif __has_include(<experimental/filesystem>)
    #   include <experimental/filesystem>
        namespace fs = std::experimental::filesystem;
    #  endif
    
    #ifndef __kernel_entry
        #define __kernel_entry
    #endif
    
    // Necessary code for OS determination when running tests
    #ifdef _WIN32
    const int OS = 0;
    #include <winsock2.h>
    #include <windows.h>
    #elif defined __unix__
    #   include <unistd.h>
    #   include <spawn.h>
    #   include <fcntl.h>
    const int OS = 1;
    #endif
    
    
    #include <boost/filesystem.hpp>
    #include <boost/asio.hpp>
    #include <boost/process.hpp>
    #include <iostream>
    #include <fstream>
    #include <string>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <regex>
    #include <algorithm>
    
    
    std::string LoadInFromFile(std::string fileName);
    void compareOutputs(std::string output, std::string expectedOutput);
    short countNumOfTests();
    void runTests(short numOfTests);
    void compileStudentCode();
    
    int main()
    {
        runTests(countNumOfTests());
        return 0;
    }
    
    void runTests(short numOfTests)
    {
      
            for(short i = 1; i <= numOfTests; i++)
            {
                // Store input info for corresponding text case
                std::string inputFile = "test/input" + std::to_string(i) + ".txt";
                std::string outputFile = "test/output" + std::to_string(i) + ".txt";
                std::string input = LoadInFromFile(inputFile);
                std::string desiredOutput = LoadInFromFile(outputFile);
    
                // Launch student executable
                boost::process::ipstream outputStream;
                boost::asio::io_service ios;
                
                boost::process::async_pipe ap(ios);
                boost::process::child c("./studentCode.out", boost::process::std_out > outputStream , boost::process::std_in < ap);
    
                for(unsigned int j = 0; j < input.size(); j++)
                {
                    char arr[1];
                    arr[0] = input[j];
                    boost::asio::async_write(ap, boost::asio::buffer(arr, 1), [](const boost::system::error_code &ec, std::size_t size){});
                    // boost::asio::async_write(ap, boost::asio::buffer(" ", 1), [](const boost::system::error_code &ec, std::size_t size){});
                }
    
                ap.close();
    
                std::string temp = "";
                std::string studentOutput = "";
                while (!outputStream.eof())
                {
                    std::getline(outputStream, temp);
                    if(!temp.empty())
                    {
                        studentOutput += temp;
                        studentOutput += "\\n";
                    }
                }
                c.exit_code();
                // Compare outputs
                std::cout << "-----------------------\\n";
                std::cout << "Test #" << i << std::endl;
                compareOutputs(studentOutput, desiredOutput);
                std::cout << "-----------------------\\n";
            }
    }
    
    std::string LoadInFromFile(std::string fileName)
    {
        std::ifstream t(fileName);
        std::string retValue = "";
        while(!t.eof())
        {
            std::string temp = "";
            std::getline(t, temp);
            if(!temp.empty())
            {
                retValue += temp;
                retValue += "\\n";
            }
        }
        t.close();
        return retValue;
    }
    
    void compareOutputs(std::string output, std::string expectedOutput)
    {
        std::regex newlines("\\r");
        expectedOutput = std::regex_replace(expectedOutput, newlines, "");
        output = std::regex_replace(output, newlines, "");
        std::cout << "Expected Output Size: " << expectedOutput.size() << std::endl;
        std::cout << "Output Size: " << output.size() << std::endl;
        if(output != expectedOutput)
        {
            std::cout << "There was a mismatch between the two.\\n";
            std::cout << "\\nExpected Output:\\n";
            std::cout << "\\"" << expectedOutput << "\\"" << std::endl;
            std::cout << "\\nOutput:\\n";
            std::cout << "\\"" << output << "\\"" << std::endl;
        } else
        {
            std::cout << "Pass.\\n";
        }
        return;
    }
    
    short countNumOfTests()
    {
        short outputFileCount = 0, inputFileCount = 0;
        short max = 0;
        for(auto& file : fs::directory_iterator("test/"))
        {
    
            if((int)file.path().c_str()[5] == 'i')
            {
                int temp = (int)file.path().c_str()[10] - '0';
                if(temp > max)
                {
                    max = temp;
                }
                inputFileCount++;
            } else
            {
                outputFileCount++;
            }
        }
        if(inputFileCount != outputFileCount)
        {
            std::cout << "Number of input files: "  << std::to_string(inputFileCount)  << " != Number of output files: " << std::to_string(outputFileCount) << std::endl;
            exit(0);
        } else if(inputFileCount == 0 || outputFileCount == 0)
        {
            std::cout << "No test files found!\\n";
            exit(0);
        }
        return max;
    }
    `;
    return tester;
}

function generateWindowsBatch(): string {
    let windowsBatch = `curl -L -O https://nuwen.net/files/mingw/mingw-18.0.exe\nstart /wait mingw-18.0.exe /S\nrm mingw-18.0.exe\nMinGW/set_distro_paths.bat`;
    return windowsBatch;
}

function generateUnixScript(): string {
    let unixScript = `sudo apt update\nsudo apt install build-essential\nsudo apt upgrade\nsudo apt install libboost-all-dev`;
    return unixScript;
}

export function IOTemplateGenerator(module: IAdminModule, problem: IProblemBase) {
    apiClient.get<IProblem>(`v1/admin/problem/${problem._id}`).then(response => {
        const { data } = response;
        console.log(data);
        const name = generateTemplateName(module, problem);
        const tst = generateTesterFile();
        const mak = generateMakefile();
        const windowsSetup = generateWindowsBatch();
        const unixSetup = generateUnixScript();

        let zip: JSZip = new JSZip();
        let testFolder = zip.folder("test");
        let testerSrc = zip.folder("srcForTemplate");
        zip.folder("src");
        zip.file("makefile", mak);
        zip.file("windows_setup.bat", windowsSetup);
        zip.file("unix_setup.sh", unixSetup);

        
        if(testerSrc !== null && testFolder !== null)
        {
            console.log("testFolder is not null");
            generateIOFiles(data, testFolder);
            testerSrc.file("Tester.cpp", tst);
        }

        zip.generateAsync({type:"blob"}).then(function(content) {
            FileSaver.saveAs(content, name);
        });
    })
}
