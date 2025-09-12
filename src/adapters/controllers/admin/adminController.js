import login from "../../../application/useCase/admin/login.js"
import createproduct from "../../../application/useCase/admin/createproduct.js"
import getallproduct from "../../../application/useCase/admin/getallproduct.js"
import createcategory from "../../../application/useCase/admin/createcategory.js"
import getallcategorydata from "../../../application/useCase/admin/getallcategorydata.js"
import getsingleproductdata from "../../../application/useCase/admin/getsingleproductdata.js"
import getsinglecategorydata from "../../../application/useCase/admin/getsinglecategorydata.js"
import addUserreviews from "../../../application/useCase/admin/addUserreviews.js"
import addUserneworder from "../../../application/useCase/admin/addUserneworder.js"
import getallorder from "../../../application/useCase/admin/getallorder.js"
import getsingleorderdata from "../../../application/useCase/admin/getsingleorderdata.js"






const adminController = (adminRepositoryInt, adminRepositoryImp, adminServiceInt, adminServiceImp) => {

    const dbrepository = adminRepositoryInt(adminRepositoryImp())
    const authService = adminServiceInt(adminServiceImp())

    const adminLogin = (req, res) => {
        const { email, password } = req.body
        console.log(email, password);
        login(email, password, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const addproduct = (req, res) => {
        const { name, description, category, subcategory, basePrice, stock, discount, discountType, size, images, tags } = req.body
        console.log(name, description, category, subcategory, basePrice, stock, discount, discountType, size, images, tags);


        createproduct(name, description, category, subcategory, basePrice, stock, discount, discountType, size, images, tags, dbrepository).then((response) => {
            console.log(response, "ppp");
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getallproducts = (req, res) => {

        getallproduct(dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }
    const addcategory = (req, res) => {
        const { name, description, isSubCategory, image, parentCategory } = req.body;
        console.log(name, description, isSubCategory, image, parentCategory);


        createcategory(name, description, isSubCategory, image, parentCategory, dbrepository).then((response) => {
            console.log(response, "ppp");
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getallcategory = (req, res) => {

        getallcategorydata(dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getSingleProduct = (req, res) => {

        const { id } = req.params;
        console.log(id, "pooffh");


        getsingleproductdata(id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getSingleCategory = (req, res) => {

        const { id } = req.params;
        console.log(id, "pooffh");


        getsinglecategorydata(id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const addUserReview = (req, res) => {

        const { id } = req.params;
        console.log(id, "pooffh");

        const { name, email,review,rating } = req.body;


        addUserreviews(id,name, email,review,rating, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const addnewOrder = (req, res) => {


        const { products, totalAmount, paymentMethod, billingDetails, paymentStatus } = req.body;

        console.log("Received Order Data:");
        console.log("Products:", products);
        console.log("Total Amount:", totalAmount);
        console.log("Payment Method:", paymentMethod);
        console.log("Billing Details:", billingDetails);
        console.log("Payment Status:", paymentStatus);

        


        addUserneworder(products, totalAmount, paymentMethod, billingDetails, paymentStatus, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getallorders = (req, res) => {

        getallorder(dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getSingleOrder = (req, res) => {

        const { id } = req.params;
        console.log(id, "pooffh");


        getsingleorderdata(id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    return {

        adminLogin,
        addproduct,
        getallproducts,
        addcategory,
        getallcategory,
        getSingleProduct,
        getSingleCategory,
        addUserReview,
        addnewOrder,
        getallorders,
        getSingleOrder



    }
}

export default adminController
