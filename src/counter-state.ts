export interface Counter {
  id: string;
  name?: string;
  value: number;
  max?: number;
}

interface CountersState {
  [key: Counter['id']]: Counter;
};

export enum CountersStateActions {
  INCREMENT_GLOBAL,
  DECREMENT_GLOBAL,
  SET_MAX,
  ADD_COUNTER,
  EDIT_COUNTER,
  INCREMENT,
  DECREMENT
}

export interface CountersStatePayload extends Partial<Counter> {};

export const GLOBAL_COUNTER_ID = 'global';

const countersState: CountersState = {
  [GLOBAL_COUNTER_ID]: {
    id: GLOBAL_COUNTER_ID,
    value: 1
  }
};

function countersReducer(
  state: CountersState,
  action: {
    type: CountersStateActions;
    payload?: CountersStatePayload;
  }) {

  const change = (counter: Counter, amount: number): Counter => {
    const { max, value } = counter;
    let newValue = value + amount;
    if (max) {
      newValue = (value >= max) ? 1 : newValue;
      newValue = (value < 1) ? max : newValue;
    }
    return { ...counter, value: newValue };
  };

  const decrement = (counter: Counter): Counter => {
    return change(counter, -1);
  };

  const increment = (counter: Counter): Counter => {
    return change(counter, 1);
  };

  if (!action.payload) {
    action.payload = {};
  }

  switch (action.type) {
    case CountersStateActions.INCREMENT_GLOBAL:
      return {
        ...state,
        ...Object.entries(state).reduce((acc, [key, counter]) => {
          acc[key] = increment(counter);
          return acc;
        }, {} as typeof state)
      };

    case CountersStateActions.DECREMENT_GLOBAL:
      return {
        ...state,
        ...Object.entries(state).reduce((acc, [key, counter]) => {
          acc[key] = decrement(counter);
          return acc;
        }, {} as typeof state)
      };

    case CountersStateActions.INCREMENT:
      if (action.payload?.id) {
        return {
          ...state,
          [action.payload.id]: increment(state[action.payload.id])
        };
      }
      return state;

    case CountersStateActions.DECREMENT:
      if (action.payload?.id) {
        return {
          ...state,
          [action.payload.id]: decrement(state[action.payload.id])
        };
      }
      return state;

    case CountersStateActions.SET_MAX:
      if (action.payload?.id && action.payload?.max && state[action.payload.id]) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            max: action.payload.max
          }
        };
      };
      return state;
      
    case CountersStateActions.ADD_COUNTER:
      const id = `${action.payload.name}-${Date.now()}`;
      return {
        ...state,
        [id]: {
          id,
          name: action.payload.name,
          value: 1,
          max: action.payload.max
        }
      };

    case CountersStateActions.EDIT_COUNTER:
      if (action.payload?.id && state[action.payload.id]) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload
          }
        };
      }
      return state;

    default:
      throw new Error("Wrong action type");
  }
};

export {
  countersState,
  countersReducer
};