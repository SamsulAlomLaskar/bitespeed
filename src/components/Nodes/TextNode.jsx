import { MessageSquare } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import BaseNode from './BaseNode';
import useFlowStore from '../../store/useFlowStore';

// This component represents a "Send Message" node in the flow editor
const TextNode = ({ id }) => {
  // Zustand store actions
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const deleteNode = useFlowStore((s) => s.deleteNode);

  // Get the current node data from the store by ID
  const node = useFlowStore((s) => s.nodes.find((n) => n.id === id));
  const text = node?.data?.text || '';

  // Handle selecting the node (opens settings panel)
  const handleClick = (e) => {
    e.stopPropagation(); // prevent event from bubbling up to parent
    setSelectedNodeId(id);
  };

  // Handle node deletion
  const handleDelete = (e) => {
    e.stopPropagation(); // prevent selection when deleting
    deleteNode(id);
  };

  return (
    <div onClick={handleClick}>
      {/* BaseNode is a reusable wrapper that handles layout, icons, handles, and delete button */}
      <BaseNode
        id={id}
        label="Send Message"
        icon={<MessageSquare size={12} />} // Left icon
        rightIcon={<FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25D366' }} />} // Right icon (WhatsApp)
        onDelete={handleDelete}
      >
        {/* Display the message text or a placeholder if empty */}
        <div >{text || 'No message'}</div>
      </BaseNode>
    </div>
  );
};

export default TextNode;
