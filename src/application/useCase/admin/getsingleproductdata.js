

const getsingleproductdata =async (id,repositories) => {

    try {

        const productdata =await repositories.getsingleproduct(id)

        return { status: true,productdata};

    } catch (err) {
        return { message: 'Error getting selection of all productdata', status: false, err };
    }
 
}

export default getsingleproductdata
