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
} from '../../actions/IngredientActions';
import { v4 as uuidv4 } from 'uuid'
import {IIngredientsReducerState} from "../../../interfaces/services/reducers/IngredientsReducer/IIngredientsReducerState";
import {IIngredientsReducerAction} from "../../../interfaces/services/reducers/IngredientsReducer/IIngredientsReducerAction";
import { IIngredient } from "../../../interfaces/models/IIngredient";
import { IConstructorIngredient } from "../../../interfaces/models/IConstructorIngredient";

const initialState: IIngredientsReducerState = {
  items: [],
  itemsRequestPending: false,
  itemsRequestFailed: false,
  itemsRequestError: '',

  isDragging: false,

  constructorItems: [],
  constructorItemCounts: new Map<string, number>(),
  constructorBunId: '',
  constructorTotalPrice: 0,
}

export const ingredientsReducer = (state: IIngredientsReducerState = initialState, action: IIngredientsReducerAction): IIngredientsReducerState => {
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
        items: action.ingredients ?? new Array<IIngredient>(),
        itemsRequestPending: false,
        itemsRequestFailed: false,
        itemsRequestError: '',
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsRequestPending: false,
        itemsRequestFailed: true,
        itemsRequestError: action.error ?? '',
      }
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const addedItem: IIngredient = state.items.find(item => item._id === action.itemId) as IIngredient;
      const addedCount: number = 1;
      const isBun: boolean = addedItem.type === "bun";
      const constructorItems: Array<IConstructorIngredient> = isBun
        ? state.constructorItems.filter(item => item.type !== "bun")
        : [...state.constructorItems];
      const constructorItemCounts: Map<string, number> = new Map(state.constructorItemCounts);
      let constructorItemCount = state.constructorItems.filter(item => item._id === addedItem._id).length + addedCount;

      if (isBun) {
        constructorItemCounts.delete(state.constructorBunId);
        constructorItemCount = 2;
      }

      constructorItemCounts.set(addedItem._id, constructorItemCount);

      return {
        ...state,
        constructorItems: [{ constructorItemId: uuidv4(), ...addedItem }, ...constructorItems],
        constructorItemCounts: constructorItemCounts,
        constructorBunId: isBun ? addedItem._id : state.constructorBunId
      }
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      const removedIngredient: IConstructorIngredient = state.constructorItems.find(item => item.constructorItemId === action.constructorItemId) as IConstructorIngredient;
      const removedCount: number = 1;
      const constructorItemCounts: Map<string, number> = new Map(state.constructorItemCounts);
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
      const draggedItem: IConstructorIngredient = state.constructorItems.find(item => item.constructorItemId === action.draggedItemId) as IConstructorIngredient;
      const draggedItemIndex: number = state.constructorItems.indexOf(draggedItem);
      const targetItem: IConstructorIngredient = state.constructorItems.find(item => item.constructorItemId === action.targetItemId) as IConstructorIngredient;
      const targetItemIndex: number = state.constructorItems.indexOf(targetItem);

      const selectedItemsBeforeDragging = [...state.constructorItems];
      selectedItemsBeforeDragging.splice(draggedItemIndex, 1);
      selectedItemsBeforeDragging.splice(action.targetItemIndex ?? targetItemIndex, 0, draggedItem);

      return {
        ...state,
        constructorItems: selectedItemsBeforeDragging
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