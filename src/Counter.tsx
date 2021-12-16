import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { Counter } from './counter-hook';

interface CounterComponentProps {
  counter: Counter;
  increment?: (id: Counter['id']) => void;
  decrement?: (id: Counter['id']) => void;
  edit?: (id: Counter['id']) => void;
}

function CounterComponent({ counter, increment, decrement, edit }: CounterComponentProps) {
  const counterSize = !(increment && decrement) ? 'h1' : 'h3';

  return (
    <>
      {counter.name && (
        <Typography variant="overline" component="div">
          {counter.name}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {decrement && (
          <IconButton onClick={() => decrement(counter.id)}>
            <RemoveIcon />
          </IconButton>
        )}
        <Typography variant={counterSize} component="div" onClick={() => edit && edit(counter.id)}>
          {counter.value.toString().padStart(3, '0')}
        </Typography>
        {increment && (
          <IconButton onClick={() => increment(counter.id)}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
}

export default CounterComponent;