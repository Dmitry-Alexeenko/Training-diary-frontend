import Modal from "react-modal";
import React from "react";
import styles from '../../styles/ModalComponent.module.scss';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

function ModalComponent(props){
    let name = props.children;
    let subtitle;

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [nameNewBoard,setNameNewBoard] = React.useState("");

    function changeNameBoard(e) {
        setNameNewBoard(e.target.value);
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'rgba(0, 0, 0, 0.37)';
    }

    function addNewBoard(){
        setIsOpen(false);
        props.addNewBoardItem(nameNewBoard);
        setNameNewBoard("");
    }

    function closeModal(){
        setIsOpen(false);
        setNameNewBoard("");
    }

    return (
        <div>
            <div onClick={openModal} className={styles.btn}>
                <span  >{name}</span>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Добавить</h2>

                <form>
                    <input
                        type={"text"}
                        placeholder={"Добавить заголовок доски"}
                        onChange={(e) => {changeNameBoard(e)}}
                        value={nameNewBoard}
                        autoFocus={true}
                    />
                    <button onClick={addNewBoard}  disabled={nameNewBoard.length < 1}>Создать</button>
                </form>
            </Modal>
        </div>
    );
}

export  default ModalComponent;
