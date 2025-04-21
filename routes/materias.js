const express = require('express');
const router = express.Router();
const { Materia, Curso } = require('../models');

router.get("/", async (req, res) => {
    const materias = await Materia.findAll({ include: "Curso" });
    res.render("base", {
        title: "Listar Matérias",
        view: "materias/show",
        materias,
    });
});

router.get("/add", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Adicionar Matéria",
        view: "materias/add",
        cursos,
    });
});

router.post("/add", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Materia.create({ nome, valor, cursoId });
    res.redirect("/materias");
});

router.get("/edit/:id", async (req, res) => {
    const materia = await Materia.findByPk(req.params.id);
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Editar Matéria",
        view: "materias/edit",
        materia,
        cursos,
    });
});

router.post("/edit/:id", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Materia.update(
        { nome, valor, cursoId },
        { where: { id: req.params.id } }
    );
    res.redirect("/materias");
});

router.post("/delete/:id", async (req, res) => {
    await Materia.destroy({ where: { id: req.params.id } });
    res.redirect("/materias");
});

module.exports = router;
