export const typeDef = `
    type Usuario {
        id: ID,
        nombres: String,
        apellidos: String,
        email: String,
        pass: String,
        lugarAcesso: String,
        dispositivo: String,
        ultimoAccesoFecha: String,
        ultimoAccesoHora: String,
    }
`;

export const resolvers = {
    Usuario: {
        id: (usuario, args, _context) => usuario.id,
    }
};