module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define("Professor", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Professor.associate = (models) => {
    Professor.hasMany(models.Materia, {
      foreignKey: "professorId",
      as: "materias",
    });
  };

  return Professor;
};
