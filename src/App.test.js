import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App component', () => {
  afterEach(cleanup);
  test('renders App component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

});


