import { prodctModel } from "../models/product.js";


export async function getAllproduct(req, res) {
  try {
    let data = await prodctModel.find();
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot get all product", message:
        err.message
    })
  }
}


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

export async function update(req, res) {
  let { id } = req.params;
  try {
    let data = await prodctModel.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!data)
      return res.status(404).json({
        title: "cannot find by id and update ",
        message: "product with such id not found "
      })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot update product ", message:
        err.message
    })
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
