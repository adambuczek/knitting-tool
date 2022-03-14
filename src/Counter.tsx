import React, { useState } from 'react';

import {
  Typography,
  IconButton,
  Box,
} from '@mui/material';

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

const RANGE_SEPARATOR = '-';

function CounterComponent({ counter, increment, decrement, edit, remove }: CounterComponentProps) {
  const counterSize = !(increment && decrement) ? 'h1' : 'h5';
  const [viewRemoveButton, setViewRemoveButton] = useState(false);

  const isGlobal = counter.id === GLOBAL_COUNTER_ID;

  const toggleRemoveButton = () => setViewRemoveButton(!viewRemoveButton);

  const stringToRange = (value: string) => {
    const [min, max] = value.split(RANGE_SEPARATOR).map(v => parseInt(v, 10));
    return { min, max };
  }

  const getLabelForValue = (counter: Counter, value: number): string => {
    const { labelMap } = counter;
    if (labelMap) {
      const exactLabel = [labelMap[value]];
      const rangeLabels = Object.keys(labelMap)
        .filter((key: string) => {
          if (key.includes(RANGE_SEPARATOR)) {
            const { min, max } = stringToRange(key);
            return min <= value && value <= max;
          }
          return false;
        })
        .map(key => labelMap[key]);
      const label = [...exactLabel, ...rangeLabels].filter(Boolean);
      if (label.length) {
        return label.join(', ');
      }
    }
    return value.toString().padStart(3, '0');
  }

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
          onDoubleClick={() => edit && edit(counter.id)}
        >
          <Box sx={{ width: '66vw' }}>
            <Typography
              variant={counterSize}
              component="div"
            >
              { getLabelForValue(counter, counter.value) }
            </Typography>
          </Box>
          {!isGlobal && viewRemoveButton && (
            <IconButton
              color="error"
              size="small" 
              sx={{
                position: 'absolute',
                top: '50%',
                left: '66%',
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