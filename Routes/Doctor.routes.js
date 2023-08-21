const express = require("express");
const doctorRouter = express.Router();
const { DoctorModel } = require("../Modal/Doctor.modal");

//Doctor Addd
doctorRouter.post("/doctorAdd", async (req, res) => {
  const {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  } = req.body;
  try {
    let doctor = new DoctorModel({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    await doctor.save();
    res.status(200).send({ msg: "Doctor data added Successfully" });
  } catch (err) {
    res.status(400).send({ msg: "Failed Add Data" });
  }
});
//Doctor Get
doctorRouter.get("/doctorGet", async (req, res) => {
  try {
    let doctor = await DoctorModel.find();
    res.status(200).send({ msg: doctor });
  } catch (err) {
    res.status(400).send({ msg: "Something wrong" });
  }
});
//Doctor Delete
doctorRouter.delete("/doctorDelete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DoctorModel.findByIdAndDelete({ _id: id });
    res.status(200).send("data will be deleted");
  } catch (err) {
    res.status(400).send({ msg: "Data Deleted Succesfully" });
  }
});

//Update Data;
doctorRouter.patch("/doctorUpdate/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DoctorModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send("data will be updated");
  } catch (err) {
    res.status(400).send({ msg: "Data is Updated Successfully" });
  }
});

module.exports = { doctorRouter };
