export const typeDef = `
    type Contacto {
        id: ID,
        nombres: String,
        apellidos: String,
        direccion: String,
        ciudad: String,
        provincia: String,
        telefono: String,
        telefonoAlternativo: String,
        institucionQuePertenece: String,
    }
`;

export const resolvers = {
    Contacto: {
        id: (contacto, args, _context) => contacto.id,
    },
};