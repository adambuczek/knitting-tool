import React from 'react';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <section>
        <h1>Hello World</h1>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
      </section>
    </div>
  );
}

export default App;
