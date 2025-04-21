const express = require('express');
const router = express.Router();
const { Materia, Curso } = require('../models');

// Listar todas as matérias
router.get("/", async (req, res) => {
    const materias = await Materia.findAll({ include: "Curso" });
    res.render("base", {
        title: "Listar Matérias",
        view: "materias/show",
        materias,
    });
});

// Formulário para adicionar matéria
router.get("/add", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Adicionar Matéria",
        view: "materias/add",
        cursos,
    });
});

// Adicionar nova matéria ao banco de dados
router.post("/add", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Materia.create({ nome, valor, cursoId });
    res.redirect("/materias");
});

// Formulário para editar matéria
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

// Atualizar matéria no banco de dados
router.post("/edit/:id", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Materia.update(
        { nome, valor, cursoId },
        { where: { id: req.params.id } }
    );
    res.redirect("/materias");
});

// Excluir matéria
router.post("/delete/:id", async (req, res) => {
    await Materia.destroy({ where: { id: req.params.id } });
    res.redirect("/materias");
});

module.exports = router;
