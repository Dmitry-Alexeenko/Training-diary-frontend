import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {showCurrentBoardItem} from "../../redux/main-reducer";
import styles from '../../styles/board.module.scss';
import CardsList from "./CardsList/CardsList";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {addCardItem, addList, changeNameBoardItem, deleteList} from "../../redux/thunkCreators/mainTC";
import {boardItem} from "../../redux/selectors";
import ComponentForChangeName from "../common/componentForChangeName";


const Board = (props) => {

    const {showCurrentBoardItem, addList, deleteList, addCardItem, changeNameBoardItem} = props;
    const {listCards} = props;
    let boardId = parseInt(props.match.params.boardId);

    const boardName = useSelector(boardItem(boardId));

    const [nameNewList, setNameNewList] = useState("");

    const [nameBoard, setNameBoard] = useState(boardName);

    useEffect(() => {
        showCurrentBoardItem(boardId)
    }, [boardId, showCurrentBoardItem]);

    useEffect(() => {
        setNameBoard(boardName)
    }, [boardName, setNameBoard]);

    const saveNewNameBoard = () => {
        changeNameBoardItem({boardId, nameBoard})
    };

    const saveNewList = () => {
        addList(nameNewList, boardId);
    };
    const delList = (idList) => {
        deleteList(idList, boardId)
    };

    return (
        <div className={styles.board}>
            <ComponentForChangeName nameElement={nameBoard} updateElement={setNameBoard}
                                    saveElement={saveNewNameBoard}/>
            <CardsList boardId={boardId} listCards={listCards} addCardItem={addCardItem} deleteList={delList}
                       setNameNewList={setNameNewList} saveNewList={saveNewList} nameNewList={nameNewList}/>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        listCards: state.mainReducer.listCards,
    }
};

export default compose(
    connect(mapStateToProps, {showCurrentBoardItem, addList, addCardItem, deleteList, changeNameBoardItem}),
    withRouter,
    withAuthRedirect)(Board)