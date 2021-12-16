import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Counter } from './counter-hook';

interface CounterComponentProps {
  counter: Counter;
  increment: (id: Counter['id']) => void;
  decrement: (id: Counter['id']) => void;
}

function CounterComponent({ counter, increment, decrement }: CounterComponentProps) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="outlined" onClick={() => decrement(counter.id)}>-</Button>
        <Typography variant="h1" component="div">
          {counter.value.toString().padStart(3, '0')}
        </Typography>
        <Button variant="outlined" onClick={() => increment(counter.id)}>+</Button>
      </Box>
    </>
  );
}

export default CounterComponent;