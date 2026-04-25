import { productModel } from "../models/productModel.js";
import { generateUniqueSlug } from "../utils/generateSlugForTitle.js";

// get all product from database 
export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find();

        return res.json({ status: true, message: "All Product Fetched Successfully...", products })
    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}

// get product acconding to slug 
export const getProductBySlug = async (req, res) => {
    const slug = req.params.slug
    try {
        const product = await productModel.findOne({ slug });

        if (!product) {
            return res.json({ status: false, message: "Product Not Found !" });
        }

        return res.json({ status: true, message: "Product Found By Slug Successfully...", product })

    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}

// create product 
export const createProduct = async (req, res) => {
    const data = req.body;

    try {

        const slug = await generateUniqueSlug(data.title)

        const result = await productModel.create({
            title: data.title,
            slug: slug,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subcategory: data.subCategory,
            tags: data.tags,
            images: data.images,
            variants: data.variants,
            price: data.price,
            discountType: data.discountType,
            discountValue: data.discountValue,
            stock: data.stock,
            ratingsAverage: data.ratingsAverage,
            ratingsCount: data.ratingsCount,
            reviews: data.reviews,
            isActive: data.isActive,
            isFeatured: data.isFeatured,
            seo: data.seo,
            shipping: data.shipping,
            views: data.views,
            soldCount: data.soldCount
        })

        return res.json({ status: true, message: "Product Created Successfully...", result })

    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}

// update product
export const updateProduct = async (req, res) => {
    const data = req.body;

    try {

        const slug = await generateUniqueSlug(data.title)

        const result = await productModel.updateOne({
            title: data.title,
            slug: slug,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subcategory: data.subCategory,
            tags: data.tags,
            images: data.images,
            variants: data.variants,
            price: data.price,
            discountType: data.discountType,
            discountValue: data.discountValue,
            stock: data.stock,
            ratingsAverage: data.ratingsAverage,
            ratingsCount: data.ratingsCount,
            reviews: data.reviews,
            isActive: data.isActive,
            isFeatured: data.isFeatured,
            seo: data.seo,
            shipping: data.shipping,
            views: data.views,
            soldCount: data.soldCount
        })

        return res.json({ status: true, message: "Product Updated Successfully...", result })

    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const slug = req.params.slug

    try {
        const product = await productModel.updateOne(
            { slug },
            {
                $set: {
                    isActive: false,
                    stock: 0
                }
            }
        )

        console.log(product);

        return res.json({
            status: true,
            message: "Product Deleted Successfully...",
            product
        })
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}

export const addReviews = async(req,res) => {
    // {slug + reviews + rating }
    const data = req.body;
    try {
        const product = await productModel.updateOne(
            {slug:data.slug},
            {
                $set:{
                    reviews:data.reviews
                }
            }
        )
    } catch (error) {
        
    }
}