import { Handle, Position } from 'reactflow'; // React Flow handles for connections
import styles from '../../styles/BaseNode.module.css'; // Custom styling for nodes

/**
 * Reusable base structure for all custom nodes.
 * Accepts label, icons, content, and a delete callback.
 */
const BaseNode = ({ id, label, icon, rightIcon, children, onDelete }) => {
    return (
        <div className={styles.nodeContainer}>
            {/* Target handle: where connections can come into this node */}
            <Handle type="target" position={Position.Left} />

            {/* Node Header: contains title and action buttons */}
            <div className={styles.nodeHeader}>
                {/* Left side: main icon and label */}
                <div className={styles.nodeTitleLeft}>
                    <span className={styles.nodeIcon}>{icon}</span>
                    <span className={styles.nodeLabel}>{label}</span>
                </div>

                {/* Right side: status icon and delete button */}
                <div className={styles.nodeTitleRight}>
                    {rightIcon && <span className={styles.nodeStatusIcon}>{rightIcon}</span>}
                    <button
                        className={styles.deleteButton}
                        onClick={onDelete}
                        title="Delete Node"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Content body: render custom content passed from node */}
            <div className={styles.nodeContent}>{children}</div>

            {/* Source handle: where connections can start from this node */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default BaseNode;
