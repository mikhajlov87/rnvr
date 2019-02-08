/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {any} payload
 */

/**
 * Create action
 * @param {string} actionType Type of the action
 * @param {any|undefined} actionPayload Payload of the action
 * @returns {Action} Redux Action
 */
export function actionCreator(actionType, actionPayload = undefined) {
  return {
    type: actionType,
    payload: actionPayload,
  };
}
