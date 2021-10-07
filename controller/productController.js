import schema from "../models/product.js";
import crypto from "crypto";

import {
    createItem,
    readItem,
    updateItem,
    deleteItem,
    getAllItems,
    existCategory,
    changeCountProduct
} from "./services.js";

export const getProducts = async(req, res) => {
    const result = await getAllItems(schema);
    res.status(200).json(result);
}
export const getProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await readItem(id, schema);
        res.status(200).json(result);
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ error })
    }
}

export const editProduct = async(req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const { name, price, category } = req.body;
            if (await existCategory(category)) {
                const payload = { name, price, category, id };
                const result = await updateItem(payload, schema);
                return res.status(200).json(result);    
            }
            throw "Category doesn't exist";
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export const addProduct = async(req, res) => {
    try {
        const { name, price, category } = req.body;
        const id = crypto.createHash("md5")
            .update(name.concat(new Date().getTime()))
            .digest("hex");
        if (await existCategory(category)) {
            const payload = { id, name, price, category };
            const result = await createItem(payload, schema);
            if (result) {
                await changeCountProduct(category, true);
                return res.status(200).json(result);
            }
            throw "Impossibile create a new product";
        }
        
        throw "Category doesn't exist";
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ error })
    }


}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await readItem(id, schema);
        const result = await deleteItem(id, schema);
        if (result) {
            const { modifiedCount } = await changeCountProduct(item.category, false);
            if (modifiedCount) {
                return res.status(200).json(result);
            }
        }
        throw "Impossible to delete this product";
    } catch(error) {
        console.log({ error });
        return res.status(500).json({ error });
    }
}
