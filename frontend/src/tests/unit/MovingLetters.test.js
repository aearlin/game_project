// MovingLetters.test.js
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { fetchLetters } from '../../api';
import MovingLetters from '../../components/MovingLetters/MovingLetters';
import reducers from '../../reducers';

jest.mock('../../api');

describe('MovingLetters component', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducers, compose(applyMiddleware(thunk)));
  });

  test('renders correctly', async () => {
    const lettersArray = ['A', 'B', 'C'];

    fetchLetters.mockResolvedValueOnce({ data: { lettersArray } });

    let container;

    await act(async () => {
      const { container: renderedContainer } = render(
        <Provider store={store}>
          <MovingLetters />
        </Provider>
      );

      container = renderedContainer;
    });

    await waitFor(() => {
      expect(container.querySelector('.moving-line')).toBeInTheDocument();
    });

    expect(fetchLetters).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.moving-line')).toHaveTextContent(lettersArray.join(''));
  });
});
