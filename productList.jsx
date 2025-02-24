import product from "./product";
const productList=(arr,deleteFromArr)=>{
return(<>
{arr.length ==0 ? status=="finish" ? <h1>no product</h1> :
<p>loading...</p>:<ul>
    {arr.map(item => <li key={item._id})}</ul>}
</>)

}
export default productList;