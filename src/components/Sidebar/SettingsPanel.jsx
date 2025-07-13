import { ArrowLeft } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';
import styles from '../../styles/SettingsPanel.module.css';

const SettingsPanel = () => {
    // Get necessary state and actions from the flow store
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
    const nodes = useFlowStore((s) => s.nodes);
    const updateNodeData = useFlowStore((s) => s.updateNodeData);
    const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);

    // Find the node currently selected
    const selectedNode = nodes.find((n) => n.id === selectedNodeId);

    // If no node is selected, do not render the panel
    if (!selectedNode) return null;

    // Handle input changes and update the node's text data
    const handleChange = (e) => {
        updateNodeData(selectedNodeId, { text: e.target.value });
    };

    return (
        <div className={styles["settingsPanel"]}>
            {/* Panel header with back button */}
            <div className={styles["settingsHeader"]}>
                <button
                    className={styles.settingsBackButton}
                    onClick={() => setSelectedNodeId(null)} // Close panel on click
                >
                    <ArrowLeft size={15} />
                </button>
                <span className={styles["settingsTitle"]}>Message</span>
            </div>

            {/* Text area for editing the node's message */}
            <span className={styles.settingsLabel}>Text</span>

            <textarea
                value={selectedNode.data.text}
                onChange={handleChange}
                placeholder="Enter message..."
                className={styles.settingsTextarea}
            />
        </div>
    );
};

export default SettingsPanel;
