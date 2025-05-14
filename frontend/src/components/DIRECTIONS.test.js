Your test setup looks fine. However, it's quite challenging to test the internal state of a component directly or to test the effects of the key press. Instead, you might want to test the final output – the rendered component.

Because your component doesn't output much that can be easily verified (it only outputs a grid of divs), you may want to refactor your component to make it more testable. For instance, you could add a data attribute to each cell div that indicates whether it's a snake cell or not. Then in your test, you could check whether the correct cells have the snake attribute after a key press. 

Here's an example of how you might do that:

```jsx
// Component code
<div className={...} data-is-snake-cell={isSnakeCell(i, j)} />

// Test code
const { container } = render(<SnakeMovement gridSize={10} />);
fireEvent.keyDown(container, { key: 'ArrowRight', code: 'ArrowRight' });
expect(container.querySelector('[data-is-snake-cell="true"]')).not.toBeNull();
```

But even with this improvement, testing this component thoroughly would still be quite tricky because it involves timing and user interaction. You might need to use a more powerful testing tool like Cypress to do a full end-to-end test. 

Here is an example of how you can extend your test:

```jsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import SnakeMovement from './SnakeMovement';

test('changes direction when arrow keys are pressed', async () => {
    const { container, getAllByTestId } = render(<SnakeMovement gridSize={10} />);
    
    fireEvent.keyDown(container, { key: 'ArrowRight', code: 'ArrowRight' });
    
    // wait for the snake to move
    await waitFor(() => {
        const cells = getAllByTestId('cell');
        const snakeCells = cells.filter(cell => cell.getAttribute('data-is-snake-cell') === 'true');
        // make sure the snake has moved to the right cell
        expect(snakeCells[0].style.transform).toBe('translate(30px, 0)');
    });
});
```

In the test, we first render the component and simulate a right arrow key press. We then wait for the snake to move, and finally, we check that the snake has indeed moved to the correct cell.