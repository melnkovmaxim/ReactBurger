let lastAction = null;
export const getLastAction = () => lastAction;

export const lastActionMiddleware = store => next => action => {
 lastAction = action;
 return next(action);
}