import React from 'react';
import Box from '@mui/material/Box';

import CounterComponent from './Counter';

function App() {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <CounterComponent name="global" max={10} />
    </Box>
  );
}

export default App;
