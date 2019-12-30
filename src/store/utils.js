const selectVisibleItems = (sortedList, visibleCount) => sortedList.slice(0, visibleCount);

const sortData = (data) =>
    Object.keys(data)
        .map((index) => data[index])
        .sort(({ id: idA, order: orderA } = {}, { id: idB, order: orderB } = {}) => {
            const compareA = orderA || Number(idA);
            const compareB = orderB || Number(idB);
            if (compareA > compareB) return -1;
            if (compareA < compareB) return 1;
            return 0;
        });

const updateObject = (state, payload) => ({
    ...state,
    ...Object.assign(...Object.keys(payload).map((index) => ({ [index]: { ...state[index], ...payload[index] } })))
});

export { updateObject, sortData, selectVisibleItems };
