import { getBezierPath } from 'reactflow';
import { Trash } from 'lucide-react';
import styles from '../../styles/NodesPanel.module.css';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    markerEnd,
    data,
}) => {
    // Generate a smooth bezier path between source and target nodes
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // Handler to delete the edge when the delete button is clicked
    const handleDelete = (e) => {
        e.stopPropagation(); // Prevents event from affecting other parts like dragging
        data?.onDelete?.(id); // Calls the onDelete callback passed through edge data
    };

    return (
        <>
            {/* Render the edge path */}
            <path
                id={id}
                d={edgePath}
                className="react-flow__edge-path"
                style={style}
                markerEnd={markerEnd}
            />

            {/* Place a foreignObject at the center of the edge to hold the delete button */}
            <foreignObject
                width={40}
                height={40}
                x={labelX - 20} // Center horizontally
                y={labelY - 20} // Center vertically
                className={styles.edgeForeignObject}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div className={styles.edgeButtonWrapper}>
                    {/* Delete icon button */}
                    <button onClick={handleDelete} className={styles.edgeDeleteButton}>
                        <Trash size={16} />
                    </button>
                </div>
            </foreignObject>
        </>
    );
};

export default CustomEdge;
