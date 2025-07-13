import styles from '../../styles/NodesPanel.module.css';

export default function SaveButton() {
    return (
        <button className={styles.saveButton} onClick={handleClick}>
            Save Changes
        </button>
    );
}
