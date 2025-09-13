

const getallcategorydata =async (repositories) => {

    try {

        const categorydata =await repositories.getcategory()

        return { status: true,categorydata};

    } catch (err) {
        return { message: 'Error getting selection of all categorydata', status: false, err };
    }
 
}

export default getallcategorydata
