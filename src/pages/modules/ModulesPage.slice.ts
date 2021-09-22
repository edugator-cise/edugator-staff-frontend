import { createSlice } from '@reduxjs/toolkit';
import {
    IModuleState//, Iaction, actions
} from './types';

const initialModuleState: IModuleState = {
    modules: [{
        name: "",
        number: 0,
        problemList: [],
    }],
    isLoading: true,
    errorMessage: null,
};

/**
 * Returns state elements as arguments
 */
export function getInitialModuleState(): IModuleState {
    return { ...initialModuleState };
}

export interface IRequestModulesAction { }

// requestModules(state, action: PayloadAction<IRequestModulesAction>)

export const moduleSlice = createSlice({
    name: "modules",
    initialState: getInitialModuleState(),
    reducers: {
        requestModules(state, action) {
            state.isLoading = true;
            return state;
        },
        requestModulesSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                modules: action.payload.modules,
            };
        },
        requestModulesFailure(state, action) {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.errorMessage,
            };
        },
    },
});

/*
const moduleSlice = (state = initialModuleState, action: Iaction) => {
    switch (action.type) {
        case actions.GET_MODULES_START:
            return {
                ...state,
                isLoading: true,
            };
        case actions.GET_MODULES_SUCCESS:
            return {
                ...state,
                modules: action.payload.modules,
                isLoading: false,
            };
        case actions.GET_MODULES_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.error,
                isLoading: false,
            };
        default:
            return {
                ...state,
            };
    }
}
*/

export const { 
    requestModules, 
    requestModulesSuccess, 
    requestModulesFailure, 
} = moduleSlice.actions;

export default moduleSlice;
