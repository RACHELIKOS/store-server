import { prodctModel } from "../models/product.js";



export async function getAllproduct(req, res) {
  let l = parseInt(req.query.limit) || 8;
  let page = parseInt(req.query.currentPage) || 1;
  try {
    let totalProducts = await prodctModel.countDocuments(); // סופרים את כל הפריטים
    let totalPages = Math.ceil(totalProducts / l); // חישוב מספר עמודים
    let data = await prodctModel.find().skip((page - 1) * l).limit(l);
    
    res.json({ products: data, totalPages: totalPages }); // החזרת הנתונים יחד עם מספר העמודים
  } catch (err) {
    console.log(err);
    res.status(400).json({
      title: "cannot get all products",
      message: err.message
    });
  }}


//במונגו יש פונקצית סקיפ לדילוג כמות תוצאות וכן לימיט להגבלת כמות התוצאות



export async function getById(req, res) {
  let { id } = req.params;
  try {
    let data = await prodctModel.findById();
    if (!data)
      return res.status(404).json({
        title: "cannot find by id",
        message: "product  with such id not found "
      })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot find By Id", message:
        err.message
    })
  }
}

// export async function update(req, res) {
//   let { id } = req.params;
//   try {
//     let data = await prodctModel.findByIdAndUpdate(id, req.body, {
//       new: true
//     });
//     if (!data)
//       return res.status(404).json({
//         title: "cannot find by id and update ",
//         message: "product with such id not found "
//       })
//     res.json(data);
//   }
//   catch (err) {
//     console.log(err)
//     res.status(400).json({
//       title: "cannot update product ", message:
//         err.message
//     })
//   }
// }
// API בשרת - עדכון מוצר
export async function update(req, res) {
  let { id } = req.params;  // שליפת ה-ID מה-URL
  try {
    let data = await prodctModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!data)
      return res.status(404).json({
        title: "Cannot find product with such ID",
        message: "Product not found"
      });
    res.json(data);  // מחזירים את המוצר לאחר העדכון
  } catch (err) {
    console.log(err);
    res.status(400).json({
      title: "Cannot update product",
      message: err.message
    });
  }
}

export const deleteById = async (req, res) => {
  let { id } = req.params
  try {
    let data = await prodctModel.findByIdAndDelete(id)
    if (!data)
      return res.status(404).json({
        title: "cannot delete by id",
        message: "product with such id not found"
      })
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot delete", message:
        err.message
    })
  }
}
export const add = async (req, res) => {
  let { body } = req;
  if (!body.name || !body.price)
    return res.json({
      title: "cannot ",
      message: "missing parameters name or price "
    })
  try {
    let newProduct = new prodctModel(body);
    let data = await newProduct.save()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot add", message:
        err.message
    })
  }
}

export const getTotalCount = async (req, res) => {
  let l = req.query.limit || 10;


  //במונגו יש פונקצית סקיפ לדילוג כמות תוצאות וכן לימיט להגבלת כמות התוצאות
  try {
      let data = await prodctModel.countDocuments();

      res.json({
          totalCount: data,
          pages: Math.ceil(data / l),
          limit: l
      })
  }
  catch (err) {
      console.log(err)
      res.status(400).json({ title: "cannot get all", message: err.message })
  }
}

//שליפת כל המוצרים
// export const getAllproduct = async (req, res) => {
//   let { limit = 2, page = 1 } = req.query;
//   try {
//       let data = await productModel.find().skip((page - 1) * limit).limit(limit);
//       res.json(data);
//   }
//   catch (err) {
//       console.log(err);
//       res.status(400).json({ title: "cannot get all product", message: err.message })

//   }
// }

// //שליפת סה"כ עמודי מוצר
// export const getTotalCount = async (req, res) => {
//   let { limit = 2 } = req.query;
//   try {
//       let data = await productModel.countDocuments()
//       let total = Math.ceil(data / limit);
//       res.json(total);
//   }
//   catch (err) {
//       console.log(err);
//       res.status(400).json({ title: "cannot get total pages", message: err.message })
//   }
// }