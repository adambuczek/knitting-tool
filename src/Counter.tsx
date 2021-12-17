import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Close';

import { Counter, GLOBAL_COUNTER_ID } from './counter-state';

interface CounterComponentProps {
  counter: Counter;
  increment?: (id: Counter['id']) => void;
  decrement?: (id: Counter['id']) => void;
  edit?: (id: Counter['id']) => void;
  remove?: (id: Counter['id']) => void;
}

function CounterComponent({ counter, increment, decrement, edit, remove }: CounterComponentProps) {
  const counterSize = !(increment && decrement) ? 'h1' : 'h3';
  const [viewRemoveButton, setViewRemoveButton] = useState(false);

  const isGlobal = counter.id === GLOBAL_COUNTER_ID;

  const toggleRemoveButton = () => setViewRemoveButton(!viewRemoveButton);

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
        <Box
          sx={{ position: 'relative' }}
          onClick={() => toggleRemoveButton()}
        >
          <Typography
            variant={counterSize}
            component="div"
            onDoubleClick={() => edit && edit(counter.id)}
          >
            {counter.value.toString().padStart(3, '0')}
          </Typography>
          {!isGlobal && viewRemoveButton && (
            <IconButton
              color="error"
              size="small" 
              sx={{
                position: 'absolute',
                top: '50%',
                left: '110%',
                transform: 'translateY(-50%)',
              }}
              onClick={() => remove && remove(counter.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
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