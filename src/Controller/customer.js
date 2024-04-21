import { Customer } from "../Models/customer.js";
import cloudinary from "cloudinary";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    if (name == null || email == null || username == null) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please upload a profile picture",
      });
    }
    let profilePicture = req.files.profilePicture;
    await cloudinary.v2.uploader
      .upload(profilePicture?.tempFilePath, {
        folder: "customers",
      })
      .then((e) => {
        profilePicture = e;
      })
      .catch((err) => {
        console.log("error while uploading picture on cloudinary", err);
      });

    const newCustomer = await Customer.create({
      name,
      email,
      username,
      profilePicture,
    });
    if (!newCustomer) {
      return res.status(404).send({
        success: false,
        message: "Customer not created",
      });
    }
    res.status(200).send({
      success: true,
      message: "Customer created successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { column, type } = req.query;
    let orderType = type === "asc" ? 1 : -1;
    let customers
    if (column !== "") {
      customers = await Customer.find().sort({ [column]: orderType });
    }else{
      customers = await Customer.find().sort({ createdAt: -1 });
    }
    res.status(200).send({
      success: true,
      message: "All customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const getSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide customer id",
      });
    }
    const customer = await Customer.findById(id);
    res.status(200).send({
      success: true,
      message: "Single customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide customer id",
      });
    }
    const { name, email, username } = req.body;
    if (name == null || email == null || username == null) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (req?.files) {
      let { profilePicture } = req.files;
      await cloudinary.v2.uploader
        .upload(profilePicture.tempFilePath, {
          folder: "customers",
        })
        .then((e) => {
          profilePicture = e;
        })
        .catch((err) => {
          console.log("error while uploading picture on cloudinary", err);
        });
      await Customer.findByIdAndUpdate(
        id,
        { name, email, username, profilePicture },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Customer updated successfully",
      });
    }
    await Customer.findByIdAndUpdate(
      id,
      { name, email, username },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Customer updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide customer id",
      });
    }
    const customer = await Customer.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
