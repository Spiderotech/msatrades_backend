import productdata from "../../../entities/admin/product.js";

const createproduct = async (name, description,category,subcategory,basePrice,stock,discount,discountType,size,images,tags,repositories) => {
   

    try {
        const data= productdata(name, description,category,subcategory,basePrice,stock,discount,discountType,size,images,tags)
        console.log(data,"hello");

        const product = await repositories.createProduct(data)
        console.log(product,"hhh");
    
        return { status: true,product }

    } catch {
        return { message: 'Error creating user prduct', status: false };

    }






}
export default createproduct