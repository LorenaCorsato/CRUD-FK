module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define("Aluno", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Aluno.associate = (models) => {
      // O alias deve ser 'Categoria' para corresponder ao alias na consulta
      Aluno.belongsTo(models.Curso, {
        foreignKey: "cursoId",
        as: "Curso", // Use o alias consistente com as consultas
      });
    };
  
    return Aluno;
  };
  
  