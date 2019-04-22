import * as fromToppings from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

type ToppingEntities = { [id: number]: Topping };

export interface ToppingsState {
  entities: ToppingEntities;
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;

      const initialValue = { ...state.entities };
      const reduceCallback = (entities: ToppingEntities, topping: Topping) => {
        return { ...entities, [topping.id]: topping };
      };

      const entities = toppings.reduce(reduceCallback, initialValue);

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
