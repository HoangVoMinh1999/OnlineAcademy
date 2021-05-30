const createAction = (type, payload) => {
    const action = {
        type,
        payload
    };

    return action;
}

export default createAction;