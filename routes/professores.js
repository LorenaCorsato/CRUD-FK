const express = require('express');
const router = express.Router();
const { Professor } = require('../models');

// Listar todos os professores
router.get("/", async (req, res) => {
    const professores = await Professor.findAll();
    res.render("base", {
        title: "Listar Professores",
        view: "professores/show",
        professores,
    });
});

// Formulário para adicionar professor
router.get("/add", async (req, res) => {
    res.render("base", {
        title: "Adicionar Professor",
        view: "professores/add",
    });
});

// Adicionar novo professor ao banco
router.post("/add", async (req, res) => {
    await Professor.create({ nome: req.body.nome });
    res.redirect("/professores");
});

// Formulário para editar professor
router.get("/edit/:id", async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    res.render("base", {
        title: "Editar Professor",
        view: "professores/edit",
        professor,
    });
});

// Atualizar professor no banco
router.post("/edit/:id", async (req, res) => {
    await Professor.update(
        { nome: req.body.nome },
        { where: { id: req.params.id } }
    );
    res.redirect("/professores");
});

// Excluir professor
router.post("/delete/:id", async (req, res) => {
    await Professor.destroy({ where: { id: req.params.id } });
    res.redirect("/professores");
});

module.exports = router;
