

const getsingleorderdata =async (id,repositories) => {

    try {

        const orderdata =await repositories.getsingleorder(id)

        console.log(orderdata);
        return { status: true,orderdata};

    } catch (err) {
        return { message: 'Error getting selection of all productdata', status: false, err };
    }
 
}

export default getsingleorderdata
