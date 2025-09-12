

const productdata=(name, description,category,subcategory,basePrice,stock,discount,discountType,size,images,tags)=>{


    return{
        getname:()=>name,
        getdescription:()=>description,
        getcategory:()=>category,
        getsubcategory:()=>subcategory,
        getbasePrice:()=>basePrice,
        getstock:()=>stock,
        getdiscount:()=>discount,
        getdiscountType:()=>discountType,
        getsizes:()=>size,
        gettags:()=>tags,
        getproductimage:()=>images,
        
       

    }

}
export default productdata