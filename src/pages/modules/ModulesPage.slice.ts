import { createSlice } from '@reduxjs/toolkit';
import {
    getModules, getModulesEnd, getModulesFail,
    addModule, addModuleEnd, addModuleFail,
} from './moduleActions';
import {
    IModuleState//, Iaction, actions
} from './types';

const initialModuleState: IModuleState = {
    modules: [],
    isLoading: true,
    errorMessage: null,
};

/**
 * Returns state elements as arguments
 */
export function getInitialModuleState(): IModuleState {
    return { ...initialModuleState };
}



// requestModules(state, action: PayloadAction<IRequestModulesAction>)

export const moduleSlice = createSlice({
    name: "modules",
    initialState: getInitialModuleState(),
    reducers: {
        /* GET Request Modules */
        requestModules: getModules,
        requestModulesSuccess: getModulesEnd,
        requestModulesFailure: getModulesFail,
        /* PUT Request Modules */
        requestNewModule: addModule,
        requestNewModuleSuccess: addModuleEnd,
        requestNewModuleFailure: addModuleFail,
        /* POST Request Modules */

        /* DELETE Request Modules */

    },
});

export const {
    requestModules,
    requestModulesSuccess,
    requestModulesFailure,
    requestNewModule,
    requestNewModuleSuccess,
    requestNewModuleFailure,
} = moduleSlice.actions;

export default moduleSlice;
