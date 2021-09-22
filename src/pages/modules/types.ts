export interface IProblem {
    problemType: string,
    title: string,
    hidden: boolean,
    language: string,
    dueDate: Date,
    code: {
        header: string,
        body: string,
        footer: string,
    },
    fileExtension: string,
    testCases: [{
        input: string,
        expectedOutput: string,
        hint: string,
        visibility: number,
        templatePackage: string,
    }],
    timeLimit: number,
    memoryLimit: number,
    buildCommand: string,
}

export interface IModule {
    name: string,
    number: number,
    problemList: IProblem[],
}

export interface IModuleState {
    modules: IModule[];
    isLoading: boolean;
    errorMessage: string | null;
}

export interface Iaction {
    type: string,
    payload: any,
}

export interface IActions {
    [action: string]: {type: string, payload: {}};
}

export const ModuleActions: IActions = {
    "asdasd": {
        type: "your mother",
        payload: {},
    }
}

export const actions = { 
    GET_MODULES_START: "GET_MODULES_START", 
    GET_MODULES_SUCCESS: "GET_MODULES_SUCCESS",
    GET_MODULES_FAILURE: "GET_MODULES_FAILURE",
};



