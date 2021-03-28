export const ACTION = "ACTION";
export const action = (payload) => ({
    type: ACTION,
    payload
})

export const SAGA_ACTION = "SAGA_ACTION";
export const sagaAction = (payload) => ({
    type: SAGA_ACTION,
    payload
})



