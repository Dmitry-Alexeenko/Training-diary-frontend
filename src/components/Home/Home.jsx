import React, {useEffect} from 'react';
import {connect} from "react-redux";
import styles from '../../styles/home.module.scss';
import ModalComponent from "../ModalComponent/ModalComponent";
import {addNewBoardItem, getBoardItems, removeBoardItem} from "../../redux/main-reducer";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const Home = (props) => {
    const {boards} = props;
    const {addNewBoardItem, removeBoardItem, getBoardItems} = props;

    useEffect(() => {
        getBoardItems()
    }, [getBoardItems]);

    let boardsItems = boards.map(i =>
        (<div key={i.id} className={styles.boardItem}>
            <NavLink to={'/b/' + i.id}>
                {i.name.length > 23
                    ? i.name.substring(0, 24) + "..."
                    : i.name
                }
            </NavLink>
            <div onClick={() => {
                removeBoardItem(i.id)
            }} className={styles.boardItem__btn}>
                <span>x</span>
            </div>
        </div>)
    );

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board__title}>
                <span>Персональные доски</span>
            </div>
            <div className={styles.board__content}>
                {boardsItems}
                <div className={styles.boardItem}>
                    <ModalComponent addNewBoardItem={addNewBoardItem}>
                        Создать доску
                    </ModalComponent>
                </div>
            </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        boards: state.mainReducer.boards
    }
};

export default compose(
    connect(mapStateToProps, {addNewBoardItem, removeBoardItem, getBoardItems}),
    withAuthRedirect
)(Home);
