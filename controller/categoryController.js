import schema from "../models/category.js";
import crypto from "crypto";

import { createItem, readItem, updateItem, deleteItem, getAllItems } from "./services.js";

export const getCategories = async(req, res)  => {}
export const getCategoryById = async(req, res)  => {}
export const addCategory = async(req, res)  => {

    const { name } = req.body;
    const id = crypto.createHash("md5")
        .update(name)
        .digest("hex");
    const payload = { id, name };
    const result = await createItem(payload, schema);
    res.status(200).json(result);
}
