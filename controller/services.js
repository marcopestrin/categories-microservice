import categorySchema from "../models/category.js";

// GENERIC QUERY
export const createItem = async(payload, schema) => {
    return await schema.create(payload);
}

export const readItem = async(id, schema) => {
    return await schema.findOne({ id }).select("-_id -__v -createdAt -updatedAt");
}

export const updateItem = async(payload, schema) => {
    const query = { id: payload.id };
    return await schema.findOneAndUpdate(query, {
        $set: { ...payload }
    })
}

export const deleteItem = async(id, schema) => {
    return await schema.deleteOne({ id });
}

export const getAllItems = async(schema) => {
    return await schema.find({}).select("-_id -__v -createdAt -updatedAt");
}

// HELPERS
export const existCategory = async(category) => {
    return await categorySchema.findOne({ name: category });
}