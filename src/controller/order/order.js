import service from "../../service/index.js";
export const createOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { address } = req.body;

    const order = await service.order.createOrderService(userId, address);

    res.status(201).json({
      sucess: true,
      data: order,
    });
  } catch (err) {
    console.log("errorr:", err);
    next(err);
  }
};
export const getUserOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("from controller:", userId);
    const orders = await service.order.getUserOrderService(userId);
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
export const singleOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await service.order.singleOrderService(orderId);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
export const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.param.orderId;
    const order = await service.order.cancelOrderService(orderId);

    res.status(200).json({
      success: true,
      message: "Order Cancelled",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
