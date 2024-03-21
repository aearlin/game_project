import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../App';
import { store } from '../../store';

describe('App Component', () => {
  it('renders App component with MovingLetters', async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>);

    await waitFor(() => {
      const movingLettersComponent = container.getElementsByClassName('moving-letters-container')[0];
      expect(movingLettersComponent).toBeInTheDocument();
    });
  });
});
