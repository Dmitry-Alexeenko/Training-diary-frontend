import React from 'react';
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

class CardContent extends React.Component {

    subtitle;
    state = {
        modalIsOpen: true,
        bool: false
    };


    changeNameBoard = (e) => {
        //setNameNewBoard(e.target.value);
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    addNewBoard = () => {
        //this.setState({bool: true});
        console.log("dorow")
        //setIsOpen(false);
        //props.addNewBoard(nameNewBoard);
        //setNameNewBoard("");
    };

    closeModal = () => {

        this.setState({modalIsOpen: false});
        //setNameNewBoard("");
    };

    componentWillUnmount() {
        this.setState({bool: false});
    }

    render() {
        return (
            <div>
                {/*this.state.bool
                    ? <div><Redirect to={"/b/1"}/></div>

                    : null}*/}

                <button onClick={this.openModal}>кнопка</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={_subtitle => (this.subtitle = _subtitle)}>Добавить</h2>
                    <div>Название</div>
                    <div>Описание</div>

                    <form>
                        <input
                            type={"text"}
                            placeholder={"Добавить заголовок доски"}
                            onChange={(e) => {
                                this.changeNameBoard(e)
                            }}
                            autoFocus={true}
                        />
                        <button  onClick={this.addNewBoard}>
                            <NavLink to={'/b/' + 0} >
                                X
                            </NavLink>
                        </button>

                    </form>
                </Modal>
            </div>
        );

    }


}

const mapStateToProps = (state) => {

};

export default compose(
    connect(mapStateToProps, {}),
    withRouter)(CardContent)
