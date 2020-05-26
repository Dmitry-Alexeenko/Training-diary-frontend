import {mainReducerAPI} from "../../api/api";
import {actions} from "../actions/actions";

const addNewList = (nameList, idBoard) => ({type: actions.ADD_LIST, nameList: nameList, idBoard: idBoard});
const removeList = (idList) => ({type: actions.REMOVE_LIST, idList: idList});
const addNewCard = (nameCard, idList) => ({type: actions.ADD_CARD, nameCard: nameCard, idList: idList});
const changeMessageCard = ({cardList, cardName, contentCard}) => ({
    type: actions.CHANGE_MESSAGE_CARD,
    idList: cardList,
    idCard: cardName,
    message: contentCard
});

const changeNameCard = ({cardList, cardName, nameCard}) => ({
    type: actions.CHANGE_NAME_CARD,
    idList: cardList,
    idCard: cardName,
    name: nameCard
});

const changeNameBoard = ({boardId, nameBoard}) => ({
    type: actions.CHANGE_NAME_BOARD,
    idBoard: boardId,
    name: nameBoard
});

const changeNameList = ({newName, idList, boardId}) => ({
    type: actions.CHANGE_NAME_LIST,
    boardId: boardId,
    name: newName,
    idList: idList
});

const showCurrentCard = (cardList, data) => ({
    type: actions.SHOW_CARD,
    data: data,
    idList: cardList,
});

const deleteCard = (idList, idCard) => ({
    type: actions.DELETE_CARD,
    idCard: idCard,
    idList: idList,
});


export const addList = (nameList, idBoard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.addList(nameList, idBoard);
        if (response.resultCode === 0) {
            dispatch(addNewList(nameList, idBoard))
        }
    }
};

export const deleteList = (idList, idBoard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.deleteList(idList, idBoard);
        if (response.resultCode === 0) {
            dispatch(removeList(idList))
        }
    }
};

export const addCardItem = (nameCard, idList) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.addCardItem(nameCard, idList);
        if (response.resultCode === 0) {
            dispatch(addNewCard(nameCard, idList))
        }
    }
};

export const changeMessageCardItem = (cardContent) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.changeMessageCardItem(cardContent);
        if (response.resultCode === 0) {
            dispatch(changeMessageCard(cardContent))
        }
    }
};

export const changeNameCardItem = (cardContent) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.changeNameCardItem(cardContent);
        if (response.resultCode === 0) {
            dispatch(changeNameCard(cardContent))
        }
    }
};

export const changeNameBoardItem = (BoardItem) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.changeNameBoardItem(BoardItem);
        if (response.resultCode === 0) {
            dispatch(changeNameBoard(BoardItem))
        }
    }
};

export const changeNameListItem = (listItem) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.changeNameListItem(listItem);
        if (response.resultCode === 0) {
            dispatch(changeNameList(listItem))
        }
    }
};

export const ShowCurrentCardItem = (cardList) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.showCurrentCard(cardList);
        if (response.resultCode === 0) {
            dispatch(showCurrentCard(cardList, response.data))
        }
    }
};

export const deleteCardItem = (idList, idCard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.deleteCard(idList, idCard);
        if (response.resultCode === 0) {
            dispatch(deleteCard(idList, idCard))
        }
    }
};