import { getAccessToken } from "../utils/Cookie";
import { IOrdersWebSocketActions } from "../interfaces/middlewares/IOrdersWebSocketActions";
import { RootState } from "../services/reducers/RootReducer";
import { Middleware } from "redux";

const createSocketMiddleware = (wsUrl: string, wsActions: IOrdersWebSocketActions, withToken: boolean = false): Middleware<{}, RootState> => {
  const socketMiddleware: Middleware<{}, RootState> = (store) => {
      let socket: WebSocket | null = null;

      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

        if (type === wsInit) {
          const url: string = withToken ? `${wsUrl}?token=${getAccessToken()}` : wsUrl;
          socket = new WebSocket(url);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onMessage, payload: restParsedData });
          };

          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }

        next(action);
      };
    };

  return socketMiddleware;
};

export default createSocketMiddleware;
