export const typeDef = `
    type Implicado {
        id: ID,
        nombres: String,
        apellidos: String,
        direccion: String,
        ciudad: String,
        provincia: String,
        telefono: String,
        telefonoAlternativo: String,
        dni: String,
        edad: String,
        sexo: String,
        parentezco: String,
        personas: [Persona],
        expediente: String,
        antecedentes: String,
        evidencias: [Evidencia],
    }
`;

export const resolvers = {
    Implicado: {
        id: (implicado, args, _context) => implicado.id,
    }
};