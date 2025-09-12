
import adminRouter from "./admin/admin.js"
import commonservice from "./commonservice.js"

const  routes=( app,express)=>{

    app.use('/api/v1/service',commonservice(express))
    app.use('/api/v1/admin',adminRouter(express))

    
    

}
export default routes