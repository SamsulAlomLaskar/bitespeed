/** 
 * Validates the structure of the flow by checking node connections.
 *
 * @param {Array} nodes - List of all nodes in the flow.
 * @param {Array} edges - List of all edges (connections) between nodes.
 * @returns {string|null} - Returns an error message if invalid, otherwise null.
 */
export function validateFlow(nodes, edges) {
    // If there are no nodes, there's nothing to validate
    if (!nodes || nodes.length === 0) {
        return 'No nodes to validate.';
    }

    // Identify all nodes that have no incoming edges (i.e., no other node points to them)
    const unconnectedNodes = nodes.filter((node) => {
        const hasIncoming = edges.some((edge) => edge.target === node.id);
        return !hasIncoming;
    });

    // A valid flow should have only one unconnected node (usually the starting node)
    if (unconnectedNodes.length > 1) {
        return 'Flow is invalid: multiple nodes are not connected to the flow.';
    }

    return null;
}