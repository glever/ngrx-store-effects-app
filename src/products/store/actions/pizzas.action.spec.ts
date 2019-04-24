import * as fromPizzas from "./pizzas.actions";

describe("Pizzas Actions", () => {

  describe("LoadPizzas Actions", () => {

    describe("LoadPizzas", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzas();
        // have to spread the action to a new object in order to match the expected object below
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS
        });
      });
    });

    describe("LoadPizzasFail", () => {
      it("should create an action", () => {
        let payload = 'Load Error';
        const action = new fromPizzas.LoadPizzasFail(payload);
        // have to spread the action to a new object in order to match the expected object below
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload
        });
      });
    });

    describe("LoadPizzasSuccess", () => {
      it("should create an action", () => {
        let payload = [
          {
            "name": "Seaside Surfin'",
            "toppings": [
              {
                "id": 6,
                "name": "mushroom"
              },
              {
                "id": 7,
                "name": "olive"
              },
              {
                "id": 2,
                "name": "bacon"
              },
              {
                "id": 3,
                "name": "basil"
              },
              {
                "id": 1,
                "name": "anchovy"
              },
              {
                "id": 8,
                "name": "onion"
              },
              {
                "id": 11,
                "name": "sweetcorn"
              },
              {
                "id": 9,
                "name": "pepper"
              },
              {
                "id": 5,
                "name": "mozzarella"
              }
            ],
            "id": 2
          },
          {
            "name": "Plain Ol' Pepperoni",
            "toppings": [
              {
                "id": 10,
                "name": "pepperoni"
              }
            ],
            "id": 3
          }
        ];
        const action = new fromPizzas.LoadPizzasSuccess(payload);
        // have to spread the action to a new object in order to match the expected object below
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        });
      });
    });

  });
});
