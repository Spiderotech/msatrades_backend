

const addUserreviews =async (id,name, email,review,rating,repositories) => {

    try {

        const reviewdata =await repositories.adduserreviews(id,name, email,review,rating)

        console.log(reviewdata);
        return { status: true,reviewdata};

    } catch (err) {
        return { message: 'Error getting selection of all categorydata', status: false, err };
    }
 
}

export default addUserreviews
