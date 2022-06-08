const sortOrder = (order) => {
    const sortable = Object.entries(order)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    return sortable
}
export default {
    sortOrder
}