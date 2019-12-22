const updateObject = (state, payload) => ({
    ...state,
    ...Object.assign(...Object.keys(payload).map((index) => ({ [index]: { ...state[index], ...payload[index] } })))
});

export { updateObject };
