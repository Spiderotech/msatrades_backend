

const adminRepositoryInt = (repository) => {
    const adminExist=(email,password)=>repository.adminExist(email,password);
    const createProduct=(data)=>repository.createProduct(data);
    const getproducts=()=>repository.getproducts()
    const createcategorys=(name, description, isSubCategory,image, parentCategory)=>repository.createcategorys(name, description, isSubCategory,image, parentCategory)
    const getcategory=()=>repository.getcategory()
    const getsingleproduct=(id)=>repository.getsingleproduct(id)
    const getsinglecategory=(id)=>repository.getsinglecategory(id)
    const adduserreviews=(productId,name, email,review,rating)=>repository.adduserreviews(productId,name, email,review,rating)
    const createUserneworder=(products, totalAmount, paymentMethod, billingDetails, paymentStatus)=>repository.createUserneworder(products, totalAmount, paymentMethod, billingDetails, paymentStatus)
    const getorders=()=>repository.getorders()
    const getsingleorder=(id)=>repository.getsingleorder(id)
   
   


  return {
    adminExist,
    createProduct,
    getproducts,
    createcategorys,
    getcategory,
    getsingleproduct,
    getsinglecategory,
    adduserreviews,
    createUserneworder,
    getorders,
    getsingleorder
   

  }
}

export default adminRepositoryInt
