module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define("Materia", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Materia.associate = (models) => {
    Materia.belongsTo(models.Curso, {
      foreignKey: "cursoId",
      as: "Curso",
    });

    Materia.belongsTo(models.Professor, {
      foreignKey: "professorId",
      as: "Professor",
    });
  };

  return Materia;
};
