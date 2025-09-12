


const createcategory = async (name, description, isSubCategory,image, parentCategory,repositories) => {
   

    try {
       
        const category = await repositories.createcategorys(name, description, isSubCategory,image, parentCategory)
        console.log(category,"hhh");
    
        return { status: true,category }

    } catch {
        return { message: 'Error creating category ', status: false };

    }






}
export default createcategory