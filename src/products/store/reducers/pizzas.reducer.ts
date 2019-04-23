import * as fromPizzas from "../actions/pizzas.actions";
import { Pizza } from "../../models/pizza.model";

type PizzaEntities = { [id: number]: Pizza };

export interface PizzaState {
  entities: PizzaEntities;
  loaded: boolean;
  loading: boolean;
}
export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      const initialValue = { ...state.entities };
      const reduceCallback = (entities: PizzaEntities, pizza: Pizza) => {
        return { ...entities, [pizza.id]: pizza };
      };
      const entities = pizzas.reduce(reduceCallback, initialValue);

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromPizzas.UPDATE_PIZZA_SUCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };
      return {
        ...state,
        entities
      };
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      // destructure: ...entities will be all except the 'removed'
      const { [pizza.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

// reducer functions, return a piece of the state, used by selectors
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
