import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddLinkIcon from '@mui/icons-material/AddLink';

function CounterComponent({ name, max = 10 }: { name: string, max: number }) {
  const [counter, setCounter] = React.useState<number>(1);

  const id = `${name}-${Date.now()}`;

  const increment = () => {
    let newValue = counter + 1;
    if (max) {
      newValue = (counter >= max) ? 1 : newValue;
    }
    setCounter(newValue);
  };

  const decrement = () => {
    let newValue = counter - 1;
    if (max) {
      newValue = (counter <= 1) ? max : newValue;
    }
    setCounter(newValue);
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }} data-counter-id={id}>
      <Button onClick={decrement}>-</Button>
      <Typography variant="h1" component="div">
        {counter}
      </Typography>
      <Button onClick={increment}>+</Button>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }} data-counter-id={id}>
      <Fab color="primary" aria-label="add" size="small">
        <AddLinkIcon />
      </Fab>
    </Box>
    </>
  );
}

export default CounterComponent;