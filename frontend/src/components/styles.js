Here is a simple implementation of a "Game Over" component. This component accepts a "gameOver" prop, which is a boolean indicating whether the game is over or not. When the game is over, it displays a "Game Over" message and a "Play Again" button. 

```jsx
import React, { PropTypes } from 'react';

// CSS-in-JS styling
const styles = {
    gameOver: {
        fontSize: '2em',
        color: 'red',
        textAlign: 'center',
    },
    button: {
        fontSize: '1em',
        marginTop: '20px',
    }
};

// GameOver component
const GameOver = ({ gameOver, onPlayAgain }) => {
    if (!gameOver) {
        return null;
    }

    return (
        <div style={styles.gameOver}>
            <p>Game Over</p>
            <button style={styles.button} onClick={onPlayAgain}>Play Again</button>
        </div>
    )
};

// Prop types for the GameOver component
GameOver.propTypes = {
    gameOver: PropTypes.bool.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
};

export default GameOver;
```

Now, let's write a basic unit test setup for the GameOver component using Jest and Enzyme:

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import GameOver from './GameOver';

describe('<GameOver />', () => {
    it('renders without crashing', () => {
        shallow(<GameOver gameOver={true} onPlayAgain={() => {}} />);
    });

    it('does not render anything if game is not over', () => {
        const wrapper = shallow(<GameOver gameOver={false} onPlayAgain={() => {}} />);
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('renders game over message and play again button if game is over', () => {
        const wrapper = shallow(<GameOver gameOver={true} onPlayAgain={() => {}} />);
        expect(wrapper.text()).toContain('Game Over');
        expect(wrapper.find('button').length).toBe(1);
    });

    it('calls onPlayAgain when play again button is clicked', () => {
        const onPlayAgain = jest.fn();
        const wrapper = shallow(<GameOver gameOver={true} onPlayAgain={onPlayAgain} />);
        wrapper.find('button').simulate('click');
        expect(onPlayAgain).toHaveBeenCalled();
    });
});
```

This test suite checks the basic functionality of the GameOver component, including the "Play Again" button click event.