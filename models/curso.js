module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define("Curso", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Curso.associate = (models) => {
    Curso.hasMany(models.Aluno, {
      foreignKey: "cursoId", // chave estrangeira na tabela de alunos
      as: "alunos",
    });

    Curso.hasMany(models.Materia, {
      foreignKey: "cursoId",
      as: "materias",
    });
  };

  return Curso;
};
