interface ISnackBarConfig {
  [type: string]: string;
}

/* Needs to be the same as modules reducer
 * remember to update as necessary
 * format: reducerName/actionName
 * ex: modules/requestModulesSuccess
 * TODO:
 *  Take error code into consideration
 *  Take error message into consideration
 */

export const AlertMsg: ISnackBarConfig = {
  "modules/requestModulesFailure": "Failed to get modules from database",
  "modules/requestNewModuleSuccess": "Module created successfully",
  "modules/requestNewModuleFailure": "Module creation failed",
  "modules/requestModifyModuleSuccess": "Module modified successfully",
};
