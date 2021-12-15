import React from 'react';
import './App.css';
import Button from '@mui/material/Button';

import CounterComponent from './Counter';

function App() {


  return (
    <div className="App">
      <section>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Global Counter
        </Button>
        <CounterComponent></CounterComponent>
      </section>
    </div>
  );
}

export default App;
