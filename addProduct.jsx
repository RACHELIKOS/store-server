import axios from "axios";
import { useForm } from "react-hook-form";

const addProduct=(add)=>{
let {register,handeleSubmit}=useForm()
const save=(data)=>{
    axios.post("http://localhost:4000/shop/product",data)
    .then(result=>{
        console.log(data);
        alert("add in sucsesfuly")
        add(result.data)
    }).catch(err=>{
        alert("wrong\n"+err.message)
    })
}
return (<form className="add-form" onSubmit={handelesubmit(save)}>
    <label>name</label>
    <input type="text" {...register("name")}/>
    <label>descripesion</label>
    <input type="text" {...register("descripesion")}/>
    <label>imj</label>
    <input type="text" {...register("imj")}/>
    <label>price</label>
    <input type="number" {...register("price")}/>
    <label>details</label>
    <input type="text" {...register("details")}/>
    <label>qty</label>
    <input type="number" {...register("qty")}/>
</form>)
}
export default addProduct;