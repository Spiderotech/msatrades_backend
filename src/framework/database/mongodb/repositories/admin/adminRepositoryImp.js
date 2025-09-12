import Admin from "../../models/admin/AdminModels.js";
import Product from "../../models/admin/ProductModels.js";
import Category from "../../models/admin/CategoryModels.js";
import Order from "../../models/admin/OrderModels.js";
import mongoose from "mongoose";




// Admin Repository Implementation
const adminRepositoryImp = () => {

    // Check if admin exists
    const adminExist = async (email, password) => {
        try {
          const admin = await Admin.findOne({ email:email });
          console.log(admin);
          
          if (!admin) {
            console.log("Admin not found");
            return null;
          }
          return admin;
        } catch (error) {
          console.error("Error while finding the admin:", error);
          throw new Error("An error occurred while finding the admin.");
        }
      };

    // Create a new product
    const createProduct = async (user) => {
        try {
            const newProduct = new Product({
                name: user?.getname(),
                description: user?.getdescription(),
                category: user?.getcategory(),
                subcategory: user?.getsubcategory(),
                basePrice: user?.getbasePrice(),
                stock: user?.getstock(),
                discount: user?.getdiscount(),
                discountType: user?.getdiscountType() || undefined,
                sizes: user?.getsizes(),
                images: user?.getproductimage(),
                tags: user?.gettags(),
            });
    
            const saved = await newProduct.save();
            return { status: true, data: saved };
        } catch (error) {
            console.error("Error creating product:", error);
            return { status: false, message: "Error creating user product", error };
        }
    };
    


    const createcategorys = async (name, description, isSubCategory, image, parentCategoryId) => {
        try {
            if (isSubCategory) {
                // Subcategory creation
                const subcategory = {
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    description,
                    image,
                };

                const updatedCategory = await Category.findByIdAndUpdate(
                    parentCategoryId,
                    { $push: { subcategories: subcategory } },
                    { new: true, runValidators: true }
                );

                return updatedCategory
                    ? { message: "Subcategory added successfully", data: subcategory }
                    : { error: "Parent category not found" };

            } else {
                // Main category creation
                const newCategory = new Category({
                    name,
                    description,
                    image,
                    subcategories: [],
                });

                const savedCategory = await newCategory.save();
                return { message: "Category created successfully", data: savedCategory };
            }
        } catch (error) {
            console.error("Error in createcategorys:", error);
            return { error: "Failed to create category or subcategory" };
        }
    };

    
    const getcategory = async () => {
        try {
            // Fetch all categories with subcategories
            const categories = await Category.find({}, 'name _id image description subcategories');
    
            // Convert categories to plain objects to modify them
            const updatedCategories = await Promise.all(categories.map(async (category) => {
                const categoryId = category._id.toString();
    
                // Count products for this category
                const productCount = await Product.countDocuments({ category: categoryId });
    
                // Update each subcategory with its product count
                const updatedSubcategories = await Promise.all(category.subcategories.map(async (subcategory) => {
                    const subcategoryId = subcategory._id.toString();
                    const subProductCount = await Product.countDocuments({ subcategory: subcategoryId });
    
                    return {
                        ...subcategory.toObject(),
                        productCount: subProductCount
                    };
                }));
    
                return {
                    ...category.toObject(),
                    productCount,
                    subcategories: updatedSubcategories
                };
            }));
    
            return { success: true, data: updatedCategories };
    
        } catch (error) {
            console.error("Error in getcategory:", error);
            return { success: false, message: "Failed to fetch categories" };
        }
    };
    
    
    


    const getproducts = async () => {
        try {
            const products = await Product.find();
    
            // Fetch all categories once
            const categories = await Category.find();
    
            // Flatten all subcategories for easier lookup
            const subcategoryMap = {};
            categories.forEach(cat => {
                cat.subcategories.forEach(sub => {
                    subcategoryMap[sub._id.toString()] = {
                        _id: sub._id,
                        name: sub.name,
                        image: sub.image
                    };
                });
            });
    
            // Create a map for main categories
            const categoryMap = categories.reduce((acc, curr) => {
                acc[curr._id.toString()] = {
                    _id: curr._id,
                    name: curr.name,
                    image: curr.image
                };
                return acc;
            }, {});
    
            // Add category and subcategory details to each product
            const enrichedProducts = products.map(product => {
                return {
                    ...product._doc,
                    category: categoryMap[product.category] || null,
                    subcategory: subcategoryMap[product.subcategory] || null
                };
            });
    
            return { success: true, data: enrichedProducts };
        } catch (error) {
            console.error("Error fetching products:", error);
            return { success: false, message: "Failed to fetch products", error };
        }
    };

    const getsingleproduct = async (id) => {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return { success: false, message: "Product not found" };
            }
    
            // Fetch all categories
            const categories = await Category.find();
    
            // Flatten all subcategories for easier lookup
            const subcategoryMap = {};
            categories.forEach(cat => {
                cat.subcategories.forEach(sub => {
                    subcategoryMap[sub._id.toString()] = {
                        _id: sub._id,
                        name: sub.name,
                        image: sub.image
                    };
                });
            });
    
            // Create a map for main categories
            const categoryMap = categories.reduce((acc, curr) => {
                acc[curr._id.toString()] = {
                    _id: curr._id,
                    name: curr.name,
                    image: curr.image
                };
                return acc;
            }, {});
    
            const enrichedProduct = {
                ...product._doc,
                category: categoryMap[product.category] || null,
                subcategory: subcategoryMap[product.subcategory] || null
            };
    
            return { success: true, data: enrichedProduct };
        } catch (error) {
            console.error("Error fetching single product:", error);
            return { success: false, message: "Failed to fetch product", error };
        }
    };



    const getsinglecategory = async (id) => {
        try {
            // Try to find as a main category
            const mainCategory = await Category.findById(id).select('name _id description image');
            if (mainCategory) {
                return {
                    success: true,
                    data: {
                        type: "main",
                        category: mainCategory
                    }
                };
            }
    
            // If not found, search in subcategories
            const categories = await Category.find({ 'subcategories._id': id }, {
                'name': 1,
                'subcategories.$': 1 // Only return the matching subcategory
            });
    
            if (categories.length > 0) {
                const parent = categories[0];
                const subcategory = parent.subcategories[0];
                return {
                    success: true,
                    data: {
                        type: "sub",
                        parentCategory: {
                            _id: parent._id,
                            name: parent.name
                        },
                        subcategory: {
                            _id: subcategory._id,
                            name: subcategory.name,
                            description: subcategory.description,
                            image: subcategory.image
                        }
                    }
                };
            }
    
            return { success: false, message: "Category not found" };
    
        } catch (error) {
            console.error("Error in getsinglecategory:", error);
            return { success: false, message: "Failed to fetch category", error };
        }
    };



    const adduserreviews = async (productId, name, email, review, rating) => {
        try {
            // Find the product by ID
            const product = await Product.findById(productId);
    
            if (!product) {
                throw new Error("Product not found");
            }
    
            // Create a new review object
            const newReview = {
                name,
                email,
                review,
                rating,
                createdAt: new Date(),
            };
    
            // Push the new review into the product's reviews array
            product.reviews.push(newReview);
    
            // Save the updated product document
            await product.save();
    
            return { success: true, message: "Review added successfully", product };
        } catch (error) {
            console.error("Error adding review:", error);
            return { success: false, message: error.message };
        }
    };
    

    const createUserneworder = async (products, totalAmount, paymentMethod, billingDetails, paymentStatus) => {
        try {
            // Create and save the new order
            const newOrder = new Order({
                products: products.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity,
                })),
                totalAmount,
                paymentMethod,
                billingDetails,
                paymentStatus,
                status: "Pending", // Default status
            });
    
            const savedOrder = await newOrder.save();
    
            // Decrement stock for each product
            for (const item of products) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.stock = Math.max(0, product.stock - item.quantity); // Ensure stock doesn't go negative
                    await product.save();
                }
            }
    
            return { success: true, message: "Order created successfully", data: savedOrder };
    
        } catch (error) {
            console.error("Error creating new order:", error);
            return { success: false, message: "Failed to create order", error };
        }
    };
    
    


    const getorders = async () => {
        try {
            const orders = await Order.find()
                .populate({
                    path: "products.productId",
                    select: "name images basePrice stock description", // Select relevant product fields
                })
                .sort({ createdAt: -1 }); // Sort by newest orders first
    
            return { success: true, data: orders };
        } catch (error) {
            console.error("Error fetching orders:", error);
            return { success: false, message: "Failed to fetch orders", error };
        }
    };



    const getsingleorder = async (id) => {
        try {
            const order = await Order.findById(id)
                .populate({
                    path: "products.productId",
                    select: "name images basePrice stock description", // Select relevant product fields
                });
    
            if (!order) {
                return { success: false, message: "Order not found" };
            }
    
            return { success: true, data: order };
        } catch (error) {
            console.error("Error fetching order:", error);
            return { success: false, message: "Failed to fetch order", error };
        }
    };
    

    
    
    
    


   

    return {
        adminExist,
        createProduct,
        createcategorys,
        getcategory,
        getproducts,
        getsingleproduct,
        getsinglecategory,
        adduserreviews,
        createUserneworder,
        getorders,
        getsingleorder
    };
};

export default adminRepositoryImp;
