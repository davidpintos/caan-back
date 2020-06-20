export const typeDef = `
    type LugarResguardo {
        id: ID,
        nombreDelLugar: String,
        direccion: String,
        ciudad: String,
        provincia: String,
        telefono: String,
        nombreResponsable: String,
    }
`;

export const resolvers = {
    LugarResguardo: {
        id: (lugarResguardo, args, _context) => lugarResguardo.id,
    }
};