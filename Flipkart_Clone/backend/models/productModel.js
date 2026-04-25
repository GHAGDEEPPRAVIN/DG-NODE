import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: String,
        reviewImage: {
            type: [String],
            validate: [(val) => val.length <= 5, "Max 5 images allowed"],
        }
    },
    { timestamps: true }
);

const variantSchema = new mongoose.Schema({
    size: String,
    color: String,
    sku: String,
    price: Number,
    stock: Number,
});

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            index: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },

        tags: [String],

        images: {
            type: [String],
            validate: [(val) => val.length <= 10, "Max 10 images allowed"],
        },

        variants: [variantSchema],

        price: {
            type: Number,
            required: true,
        },

        compareAtPrice: {
            type: Number
        },

        discountType: {
            type: String,
            enum: ["percentage", "flat"],
            default: "percentage",
        },

        discountValue: {
            type: Number,
            default: 0,
        },

        stock: {
            type: Number,
            default: 0,
        },

        ratingsAverage: {
            type: Number,
            default: 0,
        },

        ratingsCount: {
            type: Number,
            default: 0,
        },

        reviews: [reviewSchema],

        isActive: {
            type: Boolean,
            default: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        seo: {
            metaTitle: String,
            metaDescription: String,
            keywords: [String],
        },

        shipping: {
            weight: Number,
            length: Number,
            width: Number,
            height: Number,
            freeShipping: { type: Boolean, default: false },
        },

        views: {
            type: Number,
            default: 0,
        },

        soldCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);