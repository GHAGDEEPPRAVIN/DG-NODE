import slugify from "slugify";
import { productModel } from "../models/productModel.js";

export const generateUniqueSlug = async (title) => {
    const now = new Date();

    const datePart = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const seconds = now.getSeconds();

    let baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });

    // add date + seconds
    baseSlug = `${baseSlug}-${datePart}-${seconds}`;

    let slug = baseSlug;
    let counter = 1;

    // check if slug exists
    let exists = await productModel.findOne({ slug });

    while (exists) {
        slug = `${baseSlug}-${counter}`;
        exists = await productModel.findOne({ slug });
        counter++;
    }

    return slug;
};