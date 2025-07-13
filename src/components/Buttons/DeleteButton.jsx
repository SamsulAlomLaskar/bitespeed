import styles from '../../styles/NodesPanel.module.css';
const DeleteButton = ({ onClick }) => {
    return (
        <button className={styles.deleteButton} title="Delete" onClick={onClick}>
            ×
        </button>
    );
};

export default DeleteButton;
