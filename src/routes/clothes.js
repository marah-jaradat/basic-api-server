"use strict";

const express = require("express");
const { clothes } = require("../models/index");
const router = express.Router();

router.get("/clothes", getClothes);
router.post("/clothes", addClothes);
router.get("/clothes/:id", deleteClothes);
router.put("/clothes/:id", updateClothes);

async function getClothes(req, res) {
  let allClothes = await clothes.findAll();
  res.status(200).json(allClothes);
}

async function addClothes(req, res) {
  let newClothes = req.body;
  let newCloth = await clothes.create(newClothes);
  res.status(202).json(newCloth);
}

async function deleteClothes(req, res) {
  let delId = parseInt(req.params.id);
  let delCloth = await clothes.destroy({ where: { id: delId } });
  res.status(200).json(delCloth);
}

async function updateClothes(req, res) {
  let body = req.body;
  let id = req.params.id;
  let clothesNeeded = await clothes.findOne({ where: { id: id } });
  const updatedClothes = await clothesNeeded.update(body);
  res.status(201).json(updatedClothes);
}

module.exports = router;
