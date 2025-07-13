// This component renders a toolbar section containing the NodesPanel for dragging new nodes

import NodesPanel from '../Sidebar/NodesPanel';

const Toolbar = () => {
    return (
        <div >
            {/* Toolbar heading */}
            <h2>Nodes</h2>

            {/* Panel with draggable node types */}
            <NodesPanel />
        </div>
    );
};

export default Toolbar;
