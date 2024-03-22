import { Container, Grow, Paper } from '@mui/material';
import React from 'react';
import MovingLetters from '../MovingLetters/MovingLetters';

const Home = () => {
  return (
    <Grow in>
      <Container component="main" maxWidth="xl">
        <Paper elevation={3} style={{ minHeight: '500px' }}>
          <div>
            <MovingLetters />
          </div>
        </Paper>
      </Container>
    </Grow>
  );
}

export default Home;
