const express = require("express");
const Resturant = require("../models/resturant")

const router = express.Router();



router.route("/add").post(async (req, res) => {
    const { resturantName, address, telephoneNo } = req.body;

    try {
        const newResturant = new Resturant({
            resturantName,
            address,
            telephoneNo,
        });

        await newResturant.save();
        res.json({ message: "Resturant is created" });
    } catch (err) {
        console.log("Error adding new resturant", err);
        res.status(500).json({ status: "error", message: "Failed to add the resturant" });
    }
})

//view resturants
router.route("/").get((req, res) => {
    Resturant.find().then((resturant) => {
        res.json(resturant)
    }).catch((err) => {
        console.log(err)
    })
})

//update resturant details
router.route("/update/:id").put(async (req, res) => {
    let resturantId = req.params.id;

    const { resturantName, address, telephoneNo } = req.body;

    

    const updateResturant = {
        resturantName,
        address,
        telephoneNo,
    }
    const update = await Resturant.findByIdAndUpdate(resturantId, updateResturant)
        .then(() => {
            res.status(200).send({ status: "Resturant details updated" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with updating the resturant" })
        })
})

//delete resturant
router.route("/delete/:id").delete(async (req, res) => {
    let resturantId = req.params.id;

    await Resturant.findByIdAndDelete(resturantId).then(() => {
        res.status(200).send({ status: "Resturant successfully deleted" })
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({ status: "Resturant cannot be deleted" })
    })
})

//get details of a resturant
router.route("/get/:id").get(async (req, res) => {
    let resturantId = req.params.id;
    try {
        const resturant = await Resturant.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({ status: "Resturant not found" });
        }
        res.status(200).send({ status: "Resturant fetched", resturant: resturant });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching the resturant" });
    }
})

module.exports = router;