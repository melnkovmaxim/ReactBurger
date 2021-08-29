import { CLEAR_CONSTRUCTOR } from "./IngredientActions";
import { getAccessToken } from "../../utils/Cookie";
import { AppThunk } from "../../index";

export const CREATE_ORDER_REQUEST: "CREATE_ORDER" = "CREATE_ORDER";
export const CREATE_ORDER_REQUEST_SUCCESS: "CREATE_ORDER_SUCCESS" = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_REQUEST_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED";

const URL_CREATE_ORDER: string = "https://norma.nomoreparties.space/api/orders";

export function createOrder(bunId: string, ingredientIdList: Array<string>): AppThunk {
  return function (dispatch: (arg: any) => void) {
    if (!bunId) {
      dispatch({ type: CREATE_ORDER_REQUEST_FAILED, error: 'Нельзя заказать бургер без булок' });
      return
    }

    if (!ingredientIdList || ingredientIdList.length === 0) {
      dispatch({
        type: CREATE_ORDER_REQUEST_FAILED,
        error: 'Нельзя заказать бургер только с булками, без ингредиентов'
      });
      return;
    }

    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const pureBunId = bunId ?? null;
    const allIngredients = [...ingredientIdList, pureBunId, pureBunId].filter((id) => id !== "");

    fetch(URL_CREATE_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + getAccessToken()
      },
      body: JSON.stringify({ ingredients: allIngredients }),
    })
      .then(async (response) => {
        const json = await response.json();

        if (response.ok) {
          return json;
        }

        if (json && json.message) {
          return Promise.reject(json.message);
        }

        return Promise.reject(`Ошибка ${ response.status }`);
      })
      .then((json) => {
        if (!json.success) {
          return Promise.reject(json.message);
        }
        dispatch({ type: CLEAR_CONSTRUCTOR });
        dispatch({
          type: CREATE_ORDER_REQUEST_SUCCESS,
          orderNumber: json.order.number,
          burgerName: json.name,
        });
      })
      .catch((error: string) => {
        dispatch({ type: CREATE_ORDER_REQUEST_FAILED, error: error });
      });
  };
}
