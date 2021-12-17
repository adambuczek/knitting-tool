import React, { useReducer, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddLinkIcon from '@mui/icons-material/AddLink';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { 
  Counter,
  CountersStateActions,
  GLOBAL_COUNTER_ID,
  countersReducer,
  countersState
} from './counter-state';

import CounterComponent from './Counter';
import CounterEditDialog from './CounterEditDialog';
import Stopwatch from './Stopwatch';

function App() {
  const [state, dispatch] = useReducer(countersReducer, countersState);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeCounter, setActiveCounter] = useState<Counter|null>(null);
  const [time, setTime] = React.useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const resetTime = () => {
    setTime(0);
  };

  const incrementGlobal = () => {
    resetTime();
    dispatch({ type: CountersStateActions.INCREMENT_GLOBAL });
  };

  const decrementGlobal = () => {
    resetTime();
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

  const editCounter = (counter: Partial<Counter>) => {
    dispatch({ type: CountersStateActions.EDIT_COUNTER, payload: counter });
  }

  const openEditDialog = (id: Counter['id']) => {
    const counter = state[id];
    setEditDialogOpen(true);
    setActiveCounter(counter);
  }

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setActiveCounter(null);
  }

  const darkTheme = useMemo(
    () => createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#ff4081',
        },
        secondary: {
          main: '#5c6bc0',
        },
        error: {
          main: '#d50000',
        },
        warning: {
          main: '#ffab40',
        },
      },
      typography: {
        fontWeightLight: 100,
        fontWeightRegular: 200,
        fontWeightMedium: 300,
        fontWeightBold: 400,
      },
    }), []
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 5, mb: 10 }}>
          <Stopwatch time={time} />
          <CounterComponent
            counter={state[GLOBAL_COUNTER_ID]}
            edit={(id) => openEditDialog(id)}
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
                edit={(id) => openEditDialog(id)}
              />
            );
          })}
        </Box>
        <CounterEditDialog
          isOpen={editDialogOpen}
          close={closeEditDialog}
          counter={activeCounter}
          save={editCounter}
        />
        <Box sx={{
          pb: 2,
          position: 'fixed',
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
      </Container>
    </ThemeProvider>
  );
}

export default App;
