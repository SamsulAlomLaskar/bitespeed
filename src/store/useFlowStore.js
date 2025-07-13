import { create } from 'zustand';

const useFlowStore = create((set, get) => ({
    // === State Variables ===
    nodes: [],                    // List of all nodes on the canvas
    edges: [],                    // List of all connections between nodes
    selectedNodeId: null,        // Currently selected node for editing
    validationError: '',         // Error message shown in toast or navbar
    validationSuccess: '',       // Success message shown in toast or navbar

    // === Node Management ===

    /**
     * Updates the nodes array.
     * Supports both function-style (callback) and direct replacement.
     */
    setNodes: (updater) =>
        set((state) => ({
            nodes: typeof updater === 'function' ? updater(state.nodes) : updater,
        })),

    /**
     * Updates the edges array.
     * Similar to setNodes, supports callback or full array.
     */
    setEdges: (updater) =>
        set((state) => ({
            edges: typeof updater === 'function' ? updater(state.edges) : updater,
        })),

    /**
     * Sets the currently selected node by ID.
     */
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),

    /**
     * Updates the data object of a specific node.
     */
    updateNodeData: (id, newData) => {
        const updated = get().nodes.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
        );
        set({ nodes: updated });
    },

    /**
     * Deletes a node and removes all edges connected to it.
     * Also clears the selected node.
     */
    deleteNode: (id) => {
        const nodes = get().nodes.filter((n) => n.id !== id);
        const edges = get().edges.filter((e) => e.source !== id && e.target !== id);
        set({ nodes, edges, selectedNodeId: null });
    },

    // === Validation Feedback ===

    /**
     * Displays an error message and auto-clears after 3 seconds.
     */
    setValidationError: (msg) => {
        set({ validationError: msg });
        setTimeout(() => set({ validationError: '' }), 3000);
    },

    /**
     * Displays a success message and auto-clears after 3 seconds.
     */
    setValidationSuccess: (msg) => {
        set({ validationSuccess: msg });
        setTimeout(() => set({ validationSuccess: '' }), 3000);
    },
}));

export default useFlowStore;
