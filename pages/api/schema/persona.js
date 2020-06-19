export const typeDef = `
    type Persona {
        id: ID,
        nombres: String,
        apellidos: String,
        direccion: String,
        ciudad: String,
        provincia: String,
    }
`;

export const resolvers = {
    Persona: {
        id: (persona, args, _context) => persona.id,
    }
};