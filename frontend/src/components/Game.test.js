You have already provided the code for the unit test. Here's how you might expand it to test the "No more food left!" alert, assuming the global alert function has been mocked:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

// Mock global alert function
global.alert = jest.fn();

test('clicking "Eat" button increases score and decreases food', () => {
  const { getByText } = render(<Game startingFood={5} />);
  
  // Click "Eat" button 5 times
  for (let i = 0; i < 5; i++) {
    fireEvent.click(getByText('Eat'));
  }
  
  // Score should be 5 and no food should be left
  expect(getByText('Score: 5')).toBeInTheDocument();
  expect(getByText('Food left: 0')).toBeInTheDocument();
  
  // Click "Eat" button one more time
  fireEvent.click(getByText('Eat'));
  
  // Alert should have been called
  expect(global.alert).toHaveBeenCalledWith('No more food left!');
});
```

This test first clicks the "Eat" button 5 times, checking that the score increases and the food count decreases as expected. It then clicks the "Eat" button one more time, when no food should be left, and checks that the alert function was called with the correct message.