import express from "express";
import AddEmployee from "../../../modals/AddEmployee.js";
import User from "../../../modals/User.js";


export const addEmp = async (req, res) => {
    
  
  try {
      const userId = req.params._id;
      const Name = req.params.name
      const Address = req.params.address;
      const Mobile = req.params.mobile;
      const Email = req.params.email;
      const Wallet = req.params.wallet;
      const Onboard = req.params.isOnboarded;


      const { user,comName, comId } = req.body;
      const newUser = new AddEmployee({ user:userId,comName, comId, Name:Name, Address : Address, Mobile:Mobile, Email:Email, Wallet : Wallet, Onboard : Onboard});
      // const user = await User.findById(req.params._id);
    const newEmployee = await newUser.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};