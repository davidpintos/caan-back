export const typeDef = `
    type Foto {
        id: ID,
        fotoRuta: String,
        persona: Persona,
        implicado: Implicado,
    }
`;

export const resolvers = {
    Foto: {
        id: (foto, args, _context) => foto.id,
    },
};