import { useDrag } from 'react-dnd';
import styles from '../../styles/NodesPanel.module.css';

const DraggableNode = ({ type, label }) => {
    // Set up drag behavior using the `useDrag` hook
    const [{ isDragging }, drag] = useDrag(() => ({
        // This type is used to categorize draggable items
        type: 'node',

        // The item data passed during the drag operation
        item: { type },

        // Collect function allows us to monitor drag state
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // true while dragging
        }),
    }));

    return (
        <div
            ref={drag} // Attach drag ref to make this element draggable
            className={styles.draggableNode}
            style={{
                opacity: isDragging ? 0.5 : 1, // Fade while dragging
                cursor: 'move', // Show move cursor
            }}
        >
            {label} {/* Display label like "Message" or node type */}
        </div>
    );
};

export default DraggableNode;
