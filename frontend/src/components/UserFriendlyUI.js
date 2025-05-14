Sure, here is a simple component named "UserFriendlyUI". Please note that this is a basic component and can be extended based on the requirement.

1. The complete component code:
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './UserFriendlyUI.css';

/**
 * A simple and user-friendly UI component
 * @param {string} message The message to display to the user
 */
const UserFriendlyUI = ({ message }) => {
  // Error handling and loading state can be implemented if required, depending on the functionality

  return (
    <div className="UserFriendlyUI">
      <h1>{message}</h1>
    </div>
  );
}

export default UserFriendlyUI;
```

2. Any necessary CSS/styling:
```css
/* UserFriendlyUI.css */
.UserFriendlyUI {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  color: #333;
}
```
3. PropTypes or TypeScript interfaces:
```jsx
UserFriendlyUI.propTypes = {
  message: PropTypes.string.isRequired
};
```
4. Basic unit test setup:
```jsx
// UserFriendlyUITest.js
import React from 'react';
import { render } from '@testing-library/react';
import UserFriendlyUI from './UserFriendlyUI';

test('renders message', () => {
  const { getByText } = render(<UserFriendlyUI message="Hello, User!" />);
  const messageElement = getByText(/Hello, User!/i);
  expect(messageElement).toBeInTheDocument();
});
```
Please note that this is a very basic component and can be extended based on the requirement. For complex UI, you might need to add state management, conditional rendering and error boundaries.