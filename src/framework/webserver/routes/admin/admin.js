import adminController from "../../../../adapters/controllers/admin/adminController.js";
import adminRepositoryImp from "../../../database/mongodb/repositories/admin/adminRepositoryImp.js";
import adminRepositoryInt from "../../../../application/repositories/admin/adminRepositoryInt.js";
import adminServiceImp from "../../../services/admin/adminServiceImp.js";
import adminServiceInt from "../../../../application/services/admin/adminServiceInt.js";

const adminRouter=(express)=>{
    const router=express.Router()

    const controller=adminController(adminRepositoryInt,adminRepositoryImp,adminServiceInt,adminServiceImp)

    router.route('/login').post(controller.adminLogin)
    router.route('/addproductdata').post(controller.addproduct)
    router.route('/categoriesadd').post(controller.addcategory)
    router.route('/allproductdata').get(controller.getallproducts)
    router.route('/allcategorydata').get(controller.getallcategory)
    router.route('/product/:id').get(controller.getSingleProduct);
    router.route('/category/:id').get(controller.getSingleCategory);
    router.route('/add-review/:id').post(controller.addUserReview);
    router.route('/add-neworder').post(controller.addnewOrder);
    router.route('/allorderdata').get(controller.getallorders)
    router.route('/order/:id').get(controller.getSingleOrder);


   
   

    return router;

}
export default adminRouter ;