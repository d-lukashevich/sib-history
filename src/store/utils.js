const selectVisibleItems = (sortedList, visibleCount) => sortedList.slice(0, visibleCount);

const sortData = (data) =>
    Object.keys(data)
        .map((index) => data[index])
        .sort(({ order: orderA }, { order: orderB }) => {
            if (orderA > orderB || orderA === undefined || orderB === undefined) return -1;
            if (orderA < orderB) return 1;
            return 0;
        });

const updateObject = (state, payload) => ({
    ...state,
    ...Object.assign(...Object.keys(payload).map((index) => ({ [index]: { ...state[index], ...payload[index] } })))
});

export { updateObject, sortData, selectVisibleItems };
