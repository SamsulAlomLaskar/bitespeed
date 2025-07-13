import { MessageSquare } from 'lucide-react';
import styles from '../../styles/NodesPanel.module.css';

// Sidebar panel that allows users to drag nodes into the canvas
const NodesPanel = () => {
    // Handle drag start: store node type in the drag data transfer
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType); // store node type
        event.dataTransfer.effectAllowed = 'move'; // show move cursor
    };

    return (
        <div className={styles.nodesPanel}>
            {/* Draggable item representing a "Message" node */}
            <div
                // className="draggable-node"
                className={styles.draggableNode}
                onDragStart={(event) => onDragStart(event, 'text')} // when dragging starts, set type to 'text'
                draggable // enable drag
            >
                {/* Node icon and label */}
                <MessageSquare size={16} style={{ marginRight: '6px' }} />
                Message
            </div>
        </div>
    );
};

export default NodesPanel;
