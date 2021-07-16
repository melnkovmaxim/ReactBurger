export const CREATE_ORDER_REQUEST = 'CREATE_ORDER';
export const CREATE_ORDER_REQUEST_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_REQUEST_FAILED = 'CREATE_ORDER_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const URL_CREATE_ORDER = 'https://norma.nomoreparties.space/api/orders';

export function createOrder(bunId, ingredientIdList) {
    return function(dispatch) {
        if (bunId && ingredientIdList && ingredientIdList.length > 0) {
            dispatch({
                type: CREATE_ORDER_REQUEST
            });
    
            fetch(URL_CREATE_ORDER, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ingredients: [ ...ingredientIdList, bunId, bunId ]}) 
                })
                .then(response => { 
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(`Ошибка ${response.status}`);
                })
                .catch(error => { console.log(error); dispatch({ type: CREATE_ORDER_REQUEST_FAILED, error: error })})
                .then(json => { 
                    if (!json.success) {
                        return Promise.reject(json.message);
                    }
                    dispatch({ type: CREATE_ORDER_REQUEST_SUCCESS, orderNumber: json.order.number, burgerName: json.name })
                })
                .catch(error => { console.log(error); dispatch({ type: CREATE_ORDER_REQUEST_FAILED, error: error })});
        }
    }
}