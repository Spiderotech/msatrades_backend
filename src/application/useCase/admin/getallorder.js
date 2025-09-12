

const getallorder =async (repositories) => {

    try {

        const orderdata =await repositories.getorders()

        console.log(orderdata);
        return { status: true,orderdata};

    } catch (err) {
        return { message: 'Error getting selection of all orderdata', status: false, err };
    }
 
}

export default getallorder
