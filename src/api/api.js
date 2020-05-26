import * as axios from "axios/index";

const instance = axios.create(
    {
        baseURL: "http://localhost:5000/",

    }
);

export const mainReducerAPI = {
    registrationOnService(registerData){
        const {login, password} = registerData
        return (
            instance.post('api/registration', {login, password})
        )

    },
    login(registerData){
        const {login, password} = registerData
        return (
            instance.post('api/login', {login, password})
        )
    },

    authorizeOnService(authorizeData) {
        let state = JSON.parse(localStorage.getItem("state"));
        state.isAuth = true;
        state.profile = authorizeData;
        state = JSON.stringify(state);
        localStorage.setItem("state", state);

        return 0
    },

    logout() {
        let state = JSON.parse(localStorage.getItem("state"));
        state.isAuth = false;
        state.profile = null;
        state = JSON.stringify(state);
        localStorage.setItem("state", state);

        return 0
    },
    setAuthUser() {
        let state = JSON.parse(localStorage.getItem("state"));
        let profile = state.profile;
        let lastIdBoard = state.lastIdBoard;
        let lastIdList = state.lastIdList;
        let lastIdCard = state.lastIdCard;
        let data = {resultCode: 1};

        if (profile) {
            data = {
                resultCode: 0,
                data: {
                    profile: profile,
                    lastIdBoard: lastIdBoard,
                    lastIdList: lastIdList,
                    lastIdCard: lastIdCard
                }
            };
        }
        return data
    },

    getBoardsItems() {
        let state = JSON.parse(localStorage.getItem("state"));
        let boards = state.boards;
        let data = {resultCode: 1};

        if (boards) {
            data = {
                resultCode: 0,
                data: {
                    boards: boards,
                }
            }
        }
        return data
    },

    addNewBoardItem(nameBoard) {
        let state = JSON.parse(localStorage.getItem("state"));
        let newBoardItem = {name: nameBoard, id: state.lastIdBoard};
        state.boards = [newBoardItem, ...state.boards];
        state.lastIdBoard = state.lastIdBoard + 1;
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    removeBoardItem(idBoard) {
        let state = JSON.parse(localStorage.getItem("state"));
        state.boards = state.boards.filter(i => i.id !== idBoard);
        let currentBoardList = state.listCards[idBoard];

        if (currentBoardList) {
            currentBoardList.forEach(function (item, i, arr) {
                delete state.cards[item.idList]
            });
        }
        delete state.listCards[idBoard];

        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },

    showCurrentBoardItem(idBoard) {
        let state = JSON.parse(localStorage.getItem("state"));
        let currentBoardList = state.listCards[idBoard];
        let cardItems = {};
        if (currentBoardList) {
            currentBoardList.forEach(function (item, i, arr) {
                cardItems[item.idList] = state.cards[item.idList];
            });
        }

        let data = {
            resultCode: 0,
            currentBoardList: [],
            cardItems: {},
            boardItems: state.boards
        };
        if (currentBoardList) {
            data.currentBoardList = currentBoardList;
            data.cardItems = cardItems;
        }

        return data
    },

    addList(nameList, idBoard) {
        let state = JSON.parse(localStorage.getItem("state"));

        let currentBoardList = state.listCards[idBoard];
        let idList = idBoard + "-" + state.lastIdList;
        let newElementsList = [{
            name: nameList,
            idList: idList,
            cards: []
        }];
        if (currentBoardList) {
            newElementsList = [...newElementsList, ...currentBoardList];
        }

        state.listCards[idBoard] = newElementsList;
        state.cards[idList] = [];
        state.lastIdList = state.lastIdList + 1;
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    deleteList(idList, idBoard) {
        let state = JSON.parse(localStorage.getItem("state"));
        let currentBoardList = state.listCards[idBoard];
        currentBoardList = currentBoardList.filter(i => i.idList !== idList);
        state.listCards[idBoard] = currentBoardList;
        delete state.cards[idList];
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    addCardItem(nameCard, idList) {
        let state = JSON.parse(localStorage.getItem("state"));
        let idCard = state.lastIdCard + "-" + nameCard.split(" ").join("-");
        let currentListCards = state.cards[idList];
        let newCardElement = [{name: nameCard, idCard: idCard, message: ""}];

        if (currentListCards) {
            newCardElement = [{name: nameCard, idCard: idCard, message: ""}, ...currentListCards];
        }

        state.cards[idList] = newCardElement;
        state.lastIdCard = state.lastIdCard + 1;
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },

    deleteCard(idList, idCard) {
        let state = JSON.parse(localStorage.getItem("state"));
        let currentListCards = state.cards[idList];
        state.cards[idList] = currentListCards.filter(i => i.idCard !== idCard);
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    changeMessageCardItem(cardContent) {
        let state = JSON.parse(localStorage.getItem("state"));
        let upgradeCardItem = [...state.cards[cardContent.cardList]];
        upgradeCardItem = upgradeCardItem.map(i => {
            if (i.idCard === cardContent.cardName) {
                i.message = cardContent.contentCard
            }
            return i
        });
        state.cards = {...state.cards, [cardContent.idList]: upgradeCardItem};
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    changeNameCardItem(cardContent) {
        let state = JSON.parse(localStorage.getItem("state"));
        let upgradeCardItem = [...state.cards[cardContent.cardList]];
        upgradeCardItem = upgradeCardItem.map(i => {
            if (i.idCard === cardContent.cardName) {
                i.name = cardContent.nameCard
            }
            return i
        });
        state.cards = {...state.cards, [cardContent.idList]: upgradeCardItem};
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    changeNameBoardItem(boardItem) {
        let state = JSON.parse(localStorage.getItem("state"));
        state.boards = state.boards.map(i => {
            if (i.id === boardItem.boardId) {
                i = {...i, name: boardItem.nameBoard};
            }
            return i
        });
        localStorage.setItem("state", JSON.stringify(state));

        return {resultCode: 0}
    },
    changeNameListItem(listItem) {
        //debugger
        let state = JSON.parse(localStorage.getItem("state"));
        let updateList = state.listCards[listItem.boardId];
        let newListItem = updateList.map(i => {
            if (i.idList === listItem.idList) {
                i = {...i, name: listItem.newName};
            }
            return i
        });
        let newState = {
            ...state,
            listCards: {...state.listCards, [listItem.boardId]: newListItem}
        };
        localStorage.setItem("state", JSON.stringify(newState));

        return {resultCode: 0}
    },
    showCurrentCard(cardList) {
        let state = JSON.parse(localStorage.getItem("state"));
        return {
            resultCode: 0,
            data: state.cards[cardList]
        }
    }
};