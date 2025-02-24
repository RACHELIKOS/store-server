import { productModel } from "./modles/product"

const book=(p)=>{
    return(<div>
        <h2>{p.name}</h2>
        <h3>{p.desception}</h3>
        <input type="button" value="🗑️" onClick={()=>{
            axios.delete(`http://localhost:4000/shop/product${product._id}`)
            .then(result=>{
                console.log(result);
                alert("delete in sucsesfuly")
                remove(p._id)
            }).catch(err=>{
                alert("wrong\n"+err.message)
            })
        }} />
    </div>)

}