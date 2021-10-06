import schema from "../models/category.js";
import crypto from "crypto";

import { createItem, readItem, updateItem, deleteItem, getAllItems } from "./services.js";

export const getCategories = async(req, res)  => {
    const result = await getAllItems(schema);
    res.status(200).json(result);
}

export const getCategoryById = async(req, res)  => {
    const { id } = req.params;
    const result = await readItem(id, schema);
    res.status(200).json(result);
}

export const addCategory = async(req, res)  => {
    const { name } = req.body;
    const id = crypto.createHash("md5")
        .update(name)
        .digest("hex");
    const payload = { id, name };
    const result = await createItem(payload, schema);
    res.status(200).json(result);
}
