import { useCallback } from 'react';
import ReactFlow, {
    Background,
    MiniMap,
    Controls,
    ReactFlowProvider,
    addEdge,
    useReactFlow,
    applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from '../Nodes/TextNode';
import CustomEdge from '../Buttons/DeleteConnector';
import useFlowStore from '../../store/useFlowStore';
import styles from '../../styles/AppLayout.module.css';


// Register node types
const nodeTypes = {
    text: TextNode,
};

// Register edge types
const edgeTypes = {
    custom: CustomEdge,
};

// Unique ID generator for new nodes
let id = 0;
const getId = () => `node_${id++}`;

const PipelineCanvas = () => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedNodeId,
        setSelectedNodeId,
    } = useFlowStore();

    const { project } = useReactFlow();

    // Handles node position updates when dragging
    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    // Handles creating new connections (edges) between nodes
    const onConnect = useCallback(
        (params) => {
            const alreadyConnected = edges.some((e) => e.source === params.source);
            if (!alreadyConnected) {
                setEdges((eds) =>
                    addEdge(
                        {
                            ...params,
                            type: 'custom',
                            data: {
                                // Pass delete handler to the custom edge
                                onDelete: (id) =>
                                    setEdges((prev) => prev.filter((e) => e.id !== id)),
                            },
                            style: {
                                stroke: '#9e9e9e',
                                strokeWidth: 1,
                                strokeDasharray: '5 5',
                            },
                        },
                        eds
                    )
                );
            }
        },
        [edges, setEdges]
    );

    // Handles dropping new nodes onto the canvas
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/reactflow');
            if (!type) return;

            const bounds = event.target.getBoundingClientRect();
            const position = project({
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { text: '' },
            };

            setNodes((prev) => [...prev, newNode]);
        },
        [project, setNodes]
    );

    // Allows the drop operation
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    return (
        <div className={styles.canvasWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onConnect={onConnect}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

// Wraps canvas in a ReactFlowProvider to provide context
const WrappedCanvas = () => (
    <ReactFlowProvider>
        <PipelineCanvas />
    </ReactFlowProvider>
);

export default WrappedCanvas;
