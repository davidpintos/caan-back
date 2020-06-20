export const typeDef = `
    type Evidencia {
        id: ID,
        fecha: String,
        hora: String,
        tipo: String,
        documentoRuta: String,
        descripcion: String,
    }
`;

export const resolvers = {
    Evidencia: {
        id: (evidencia, args, _context) => evidencia.id,
    },
};