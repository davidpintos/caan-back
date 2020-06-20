export const typeDef = `
    type Resguardante {
        id: ID,
        nombres: String,
        apellidos: String,
        direccion: String,
        ciudad: String,
        provincia: String,
        telefono: String,
        telefonoAlternativo: String,
        esAyudante: Boolean,
        edad: String,
        dni: String,
        personas: [Persona],
    }
`;

export const resolvers = {
    Resguardante: {
        id: (resguardante, args, _context) => resguardante.id,
    }
};