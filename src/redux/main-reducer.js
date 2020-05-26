import {actions} from "./actions/actions";
import {initialState} from "./initialState";
import {mainReducerAPI} from "../api/api";

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case actions.SET_USER_DATA:
            return {
                ...state,
                isAuth: action.isAuth,
                profile: action.userData.profile,
                lastIdBoard: action.userData.lastIdBoard,
                lastIdList: action.userData.lastIdList,
                lastIdCard: action.userData.lastIdCard,
            };
        case actions.ADD_BOARDS:
            return {
                ...state,
                boards: [...action.boards.boards],
                listCards: [],
                cards: {},
            };
        case actions.ADD_NEW_BOARD:
            return {
                ...state,
                boards: [{name: action.nameBoard, id: state.lastIdBoard}, ...state.boards],
                lastIdBoard: state.lastIdBoard + 1,
            };
        case actions.REMOVE_BOARD:
            delete state.listCards[action.idBoard];
            return {
                ...state,
                boards: state.boards.filter(i => i.id !== action.idBoard),
            };
        case actions.SHOW_CURRENT_BOARD:
            return {
                ...state,
                boards: [...action.boardData.boardItems],
                listCards: [...action.boardData.currentBoardList],
                cards: {...action.boardData.cardItems}
            };
        case actions.ADD_LIST:
            let listId = action.idBoard + "-" + state.lastIdList;
            return {
                ...state,
                listCards: [{
                    name: action.nameList,
                    idList: listId,
                    cards: []
                }, ...state.listCards],
                cards: {...state.cards, [listId]: []},
                lastIdList: state.lastIdList + 1,
            };
        case actions.REMOVE_LIST:
            delete state.cards[action.idList];
            return {
                ...state,
                listCards: state.listCards.filter(i => i.idList !== action.idList),
            };
        case actions.ADD_CARD:
            let idCard = state.lastIdCard + "-" + action.nameCard.split(" ").join("-");
            let currentListCards = [{name: action.nameCard, idCard: idCard, message: ""}, ...state.cards[action.idList]];
            return {
                ...state,
                cards: {...state.cards, [action.idList]: [...currentListCards]},
                lastIdCard: state.lastIdCard + 1,
            };
        case actions.CHANGE_MESSAGE_CARD:
            let upgradeCardItem = state.cards[action.idList];
            upgradeCardItem = upgradeCardItem.map(i => {
                if (i.idCard === action.idCard) {
                    i = {...i,message:action.message};
                }
                return i
            });
            return {
                ...state,
                cards: {...state.cards, [action.idList]: upgradeCardItem}
            };
        case actions.CHANGE_NAME_CARD:
            let upgradeNameCard = state.cards[action.idList];
            upgradeNameCard = upgradeNameCard.map(i => {
                if (i.idCard === action.idCard) {
                    i = {...i,name:action.name};
                }
                return i
            });
            return {
                ...state,
                cards: {...state.cards, [action.idList]: upgradeNameCard}
            };
        case actions.CHANGE_NAME_BOARD:
            return {
                ...state,
                boards: state.boards.map(i => {
                    if (i.id === action.idBoard) {
                        i = {...i, name: action.name};
                    }
                    return i
                })
            };
        case actions.CHANGE_NAME_LIST:
            return {
                ...state,
                listCards: state.listCards.map(i => {
                    if (i.idList === action.idList) {
                        i = {...i, name: action.name};
                    }
                    return i
                })
            };
        case actions.SHOW_CARD:
            return {
                ...state,
                cards: {...state.cards, [action.idList]: action.data}
            };
        case actions.DELETE_CARD:
            let listCards = state.cards[action.idList];
            let newListCards = listCards.filter(i => i.idCard !== action.idCard);
            return {
                ...state,
                cards: {...state.cards, [action.idList]: newListCards}
            };
        default:
            return state;
    }
};
export const test = (name) => ({type: actions.TEST, name: name});
const addBoards = (boards) => ({type: actions.ADD_BOARDS, boards: boards});
const addNewBoard = (nameBoard) => ({type: actions.ADD_NEW_BOARD, nameBoard: nameBoard});
const removeBoard = (idBoard) => ({type: actions.REMOVE_BOARD, idBoard: idBoard});
const showCurrentBoard = (boardData) => ({type: actions.SHOW_CURRENT_BOARD, boardData: boardData});

export const getBoardItems = () => {
    return async (dispatch) => {
        let response = await mainReducerAPI.getBoardsItems();
        if (response.resultCode === 0) {
            dispatch(addBoards(response.data))
        }
    }
};

export const addNewBoardItem = (nameBoard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.addNewBoardItem(nameBoard);
        if (response.resultCode === 0) {
            dispatch(addNewBoard(nameBoard))
        }
    }
};

export const removeBoardItem = (idBoard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.removeBoardItem(idBoard);
        if (response.resultCode === 0) {
            dispatch(removeBoard(idBoard))
        }
    }
};

export const showCurrentBoardItem = (idBoard) => {
    return async (dispatch) => {
        let response = await mainReducerAPI.showCurrentBoardItem(idBoard);
        if (response.resultCode === 0) {
            dispatch(showCurrentBoard({
                currentBoardList: response.currentBoardList,
                cardItems: response.cardItems,
                boardItems: response.boardItems
            }))
        }
    }
};

export default mainReducer;

