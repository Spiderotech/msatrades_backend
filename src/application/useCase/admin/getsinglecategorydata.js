

const getsinglecategorydata =async (id,repositories) => {

    try {

        const categorydata =await repositories.getsinglecategory(id)

        console.log(categorydata);
        return { status: true,categorydata};

    } catch (err) {
        return { message: 'Error getting selection of all categorydata', status: false, err };
    }
 
}

export default getsinglecategorydata
