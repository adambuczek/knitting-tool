import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddLinkIcon from '@mui/icons-material/AddLink';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { Counter } from './counter-hook';
import CounterComponent from './Counter';

const GLOBAL_COUNTER_ID = 'global';

interface CountersState {
  [key: Counter['id']]: Counter;
};

enum CountersStateActions {
  INCREMENT_GLOBAL,
  DECREMENT_GLOBAL,
  SET_MAX,
  ADD_COUNTER,
  INCREMENT,
  DECREMENT
}

interface CountersStatePayload extends Partial<Counter> {};

const countersState: CountersState = {
  [GLOBAL_COUNTER_ID]: {
    id: GLOBAL_COUNTER_ID,
    name: 'global',
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
      if (action.payload?.name) {
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
      }
      return state;

    default:
      throw new Error("Wrong action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(countersReducer, countersState);

  const incrementGlobal = () => {
    dispatch({ type: CountersStateActions.INCREMENT_GLOBAL });
  };

  const decrementGlobal = () => {
    dispatch({ type: CountersStateActions.DECREMENT_GLOBAL });
  };

  const increment = (id: Counter['id']) => {
    dispatch({ type: CountersStateActions.INCREMENT, payload: { id } });
  };

  const decrement = (id: Counter['id']) => {
    dispatch({ type: CountersStateActions.DECREMENT, payload: { id } });
  };

  const addCounter = (name: string, max?: number) => {
    dispatch({ type: CountersStateActions.ADD_COUNTER, payload: { name, max } });
  }

  return (
    <>  
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <CounterComponent
          counter={state[GLOBAL_COUNTER_ID]}
        />
        {Object.values(state).map((counter) => {
          if (counter.id === GLOBAL_COUNTER_ID) {
            return null;
          }
          return (
            <CounterComponent
              key={counter.id}
              counter={counter}
              increment={(id) => increment(id)}
              decrement={(id) => decrement(id)}
            />
          );
        })}
      </Box>
      <Box sx={{
        pb: 2,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <Fab color="primary" onClick={decrementGlobal}><RemoveIcon /></Fab>
        <Fab color="primary" size="small" onClick={() => addCounter('counter')}><AddLinkIcon /></Fab>
        <Fab color="primary" onClick={incrementGlobal}><AddIcon /></Fab>
      </Box>
    </>
  );
}

export default App;
