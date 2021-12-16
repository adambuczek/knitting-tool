import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddLinkIcon from '@mui/icons-material/AddLink';

import { Counter } from './counter-hook';
import CounterComponent from './Counter';

const GLOBAL_COUNTER_ID = 'global';

const initialState: Record<Counter['id'], Counter> = {
  [GLOBAL_COUNTER_ID]: {
    id: GLOBAL_COUNTER_ID,
    name: 'global',
    value: 1
  }
};

function reducer(state: typeof initialState, action: { type: string; payload: any }) {

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

  switch (action.type) {
    case 'incrementGlobal':
      return {
        ...state,
        ...Object.entries(state.counters).reduce((acc, [key, counter]) => {
          acc[key] = increment(counter);
          return acc;
        }, {} as typeof initialState)
      };
    case 'decrementGlobal':
      return {
        ...state,
        ...Object.entries(state.counters).reduce((acc, [key, counter]) => {
          acc[key] = decrement(counter);
          return acc;
        }, {} as typeof initialState)
      };
    default:
      throw new Error("Wrong action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>  
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        {/* <CounterComponent counter={globalCounter} /> */}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Fab color="primary" aria-label="add" size="small">
          <AddLinkIcon />
        </Fab>
      </Box>
    </>
  );
}

export default App;
