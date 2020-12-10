const { types } = require("../Type/types");

/////

const uiOpenModalAction = () => ( { type : types.uiOpenModal } );

const uiCloseModalAction = () => ( { type : types.uiCloseModal } );

/////

export { uiOpenModalAction, uiCloseModalAction };