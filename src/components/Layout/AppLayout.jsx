import NodesPanel from '../Sidebar/NodesPanel';
import SettingsPanel from '../Sidebar/SettingsPanel';
import PipelineCanvas from '../Canvas/PipelineCanvas';
import useFlowStore from '../../store/useFlowStore';
import { validateFlow } from '../../utils/validators';
import applayoutStyles from '../../styles/AppLayout.module.css';

const AppLayout = () => {
    // Access state values and functions from the global flow store
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const validationError = useFlowStore((s) => s.validationError);
    const validationSuccess = useFlowStore((s) => s.validationSuccess);
    const setValidationError = useFlowStore((s) => s.setValidationError);
    const setValidationSuccess = useFlowStore((s) => s.setValidationSuccess);

    // Handle "Save Changes" click
    const handleSave = () => {
        const error = validateFlow(nodes, edges); // validate the current flow
        if (error) {
            setValidationError('Cannot Save Flow'); // set error toast
        } else {
            setValidationSuccess('Flow Saved Successfully'); // set success toast
        }
    };

    return (
        <>
            {/* Top Navbar with Save button and conditional toast messages */}
            <div className={applayoutStyles.topNavbar}>
                {validationError && (
                    <div className={`${applayoutStyles.toast} ${applayoutStyles.toastError}`}>
                        {validationError}
                    </div>
                )}
                {validationSuccess && (
                    <div className={`${applayoutStyles.toast} ${applayoutStyles.toastSuccess}`}>
                        {validationSuccess}
                    </div>
                )}
                <button className={applayoutStyles.saveButton} onClick={handleSave}>
                    Save Changes
                </button>
            </div>

            {/* Main Layout with Canvas and Sidebar */}
            <div className={applayoutStyles.appLayout}>
                <main className={applayoutStyles.canvasArea}>
                    <div className={applayoutStyles.canvasWrapper}>
                        <PipelineCanvas />
                    </div>
                </main>
                <aside className={applayoutStyles.sidebar}>
                    {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
                </aside>
            </div>
        </>
    );
};

export default AppLayout;
