import { orderModel } from "../models/order.js";


export async function getAllorders(req, res) {
  try {
    let data = await orderModel.find();
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot get all orders", message:
        err.message
    })
  }
}


export async function getById(req, res) {
  let { userId } = req.params;
  try {
    let data = await orderModel.find({ userId: userId });
    if (!data)
      return res.status(404).json({
        title: "cannot find by id",
        message: "order  with such id not found "
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
    let data = await prodctModel.findByIdAndUpdate(id, { ...req.body, isGetOff: true }, {
      new: true
    });
    if (!data)
      return res.status(404).json({
        title: "cannot find by id and update ",
        message: "product with such id not found "
      })
    res.json({ ...data, isGetOff: true });
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
    if (data.setOff == true)
      return res.json({ title: "cannot delete ", message: "oredr לרדת" })
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
  if (!body.userId || !body.product || !body.finalPrice)
    return res.json({
      title: "cannot ",
      message: "missing parameters name or price "
    })
  try {
    let newOrder = new orderModel(body);
    let data = await newOrder.save()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(400).json({
      title: "cannot add", message:
        err.message
    })
  }
}
