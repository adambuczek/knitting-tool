import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export class Counter {
  name: string;
  max: number;
  id: string;

  value = 1;
  children: Record<string, Counter> = {};

  constructor(name: string, max: number) {
    this.name = name;
    this.max = max;
    this.id = `${name}-${Math.random()}`;
  }

  addChild(child: Counter) {
    this.children[child.id] = child;
  }

  removeChild(child: Counter) {
    delete this.children[child.id];
  }

  increment() {
    let newValue = this.value + 1;

    if (this.max) {
      newValue = (this.value >= this.max) ? 1 : newValue;
    }
    this.value = newValue;

    Object.values(this.children).forEach(child => child.increment());
  }

  decrement() {
    let newValue = this.value - 1;

    if (this.max) {
      newValue = (this.value <= 1) ? this.max : newValue;
    }
    this.value = newValue;

    Object.values(this.children).forEach(child => child.decrement());
  }
}

function CounterComponent() {
  const [counter, setCounter] = React.useState<Counter>(new Counter('Counter', 10));

  const increment = () => {
    counter.increment();
    setCounter(counter);
  };

  const decrement = () => {
    counter.decrement();
    setCounter(counter);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button onClick={decrement}>-</Button>
      <Typography variant="h1" component="div">
        {counter.value}
      </Typography>
      <Button onClick={increment}>+</Button>
    </Box>
  );
}

export default CounterComponent;