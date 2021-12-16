import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddLinkIcon from '@mui/icons-material/AddLink';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { 
  Counter,
  CountersStateActions,
  GLOBAL_COUNTER_ID,
  countersReducer,
  countersState
} from './counter-state';

import CounterComponent from './Counter';

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
