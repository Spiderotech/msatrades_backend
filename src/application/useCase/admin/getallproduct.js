

const getallproduct =async (repositories) => {

    try {

        const productdata =await repositories.getproducts()

        return { status: true,productdata};

    } catch (err) {
        return { message: 'Error getting selection of all products', status: false, err };
    }
 
}

export default getallproduct
