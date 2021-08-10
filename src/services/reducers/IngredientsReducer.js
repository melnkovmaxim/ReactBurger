import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  DRAG,
  DROP,
  CLEAR_CONSTRUCTOR
} from '../actions/IngredientActions';
import uuid from 'react-uuid'

const initialState = {
  items: [],
  itemsRequestPending: false,
  itemsRequestFailed: false,
  itemsRequestError: '',

  isDragging: false,

  constructorItems: [],
  constructorItemCounts: new Map(),
  constructorBunId: '',
  constructorTotalPrice: 0,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequestPending: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.ingredients,
        itemsRequestPending: false,
        itemsRequestFailed: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsRequestFailed: true,
        error: action.error,
      }
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const addedItem = state.items.find(item => item._id === action.itemId);
      const addedCount = 1;
      const isBun = addedItem.type === "bun";
      const constructorItems = isBun
        ? state.constructorItems.filter(item => item.type !== "bun")
        : [...state.constructorItems];
      const constructorItemCounts = new Map(state.constructorItemCounts);
      let constructorItemCount = state.constructorItems.filter(item => item._id === addedItem._id).length + addedCount;

      if (isBun) {
        constructorItemCounts.delete(state.constructorBunId);
        constructorItemCount = 2;
      }

      constructorItemCounts.set(addedItem._id, constructorItemCount);

      return {
        ...state,
        constructorItems: [{ constructorItemId: uuid(), ...addedItem }, ...constructorItems],
        constructorItemCounts: constructorItemCounts,
        constructorBunId: isBun ? addedItem._id : state.constructorBunId
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      const removedIngredient = state.constructorItems.find(item => item.constructorItemId === action.constructorItemId);
      const removedCount = 1;
      const constructorItemCounts = new Map(state.constructorItemCounts);
      constructorItemCounts.set(removedIngredient._id, removedIngredient.type === "bun"
        ? 0
        : state.constructorItems.filter(item => item._id === removedIngredient._id).length - removedCount);
      return {
        ...state,
        constructorItems: removedIngredient.type === "bun"
          ? [...state.constructorItems.filter(item => item._id !== removedIngredient._id)]
          : [...state.constructorItems.filter(item => item.constructorItemId !== action.constructorItemId)],
        constructorItemCounts: constructorItemCounts
      }
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const draggedItem = state.constructorItems.find(item => item.constructorItemId === action.draggedItemId);
      const draggedItemIndex = state.constructorItems.indexOf(draggedItem);
      const targetItem = state.constructorItems.find(item => item.constructorItemId === action.targetItemId);
      const targetItemIndex = state.constructorItems.indexOf(targetItem);

      const selectedItemsWithoutDragged = [...state.constructorItems];
      selectedItemsWithoutDragged.splice(draggedItemIndex, 1);
      selectedItemsWithoutDragged.splice(action.targetItemIndex ?? targetItemIndex, 0, draggedItem);

      return {
        ...state,
        constructorItems: selectedItemsWithoutDragged
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [],
        constructorItemCounts: new Map(),
        constructorBunId: '',
        constructorTotalPrice: 0,
      }
    }
    case DRAG: {
      return {
        ...state,
        isDragging: true,
      }
    }
    case DROP: {
      return {
        ...state,
        isDragging: false,
      }
    }
    default: {
      return state;
    }
  }
}