export const createItem = async(payload, schema) => {
    return await schema.create(payload);
}

export const readItem = async(id, schema) => {
    return await schema.findOne({ id });
}

export const updateItem = async(payload, schema) => {
    const query = { id: payload.id };
    return await schema.updateOne(query, {
        $set: { ...payload }
    })
}

export const deleteItem = async(id, schema) => {
    return await schema.deleteOne({ id });
}

export const getAllItems = async(schema) => {
    return await schema.find({});
}
