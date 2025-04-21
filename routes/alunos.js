const express = require('express');
const router = express.Router();
const { Aluno, Curso } = require('../models');

router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll({ include: 'Curso' });
    res.render("base", {
        title: "Listar Alunos",
        view: "alunos/show",
        alunos,
    });
});

router.get("/add", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Adicionar Aluno",
        view: "alunos/add",
        cursos,
    });
});

router.post("/add", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Aluno.create({ nome, valor, cursoId });
    res.redirect("/alunos");
});

router.get("/edit/:id", async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    const cursos = await Curso.findAll();
    res.render("base", {
        title: "Editar Aluno",
        view: "alunos/edit",
        aluno,
        cursos,
    });
});

router.post("/edit/:id", async (req, res) => {
    const { nome, valor, cursoId } = req.body;
    await Aluno.update(
        { nome, valor, cursoId },
        { where: { id: req.params.id } }
    );
    res.redirect("/alunos");
});

router.post("/delete/:id", async (req, res) => {
    await Aluno.destroy({ where: { id: req.params.id } });
    res.redirect("/alunos");
});

module.exports = router;
