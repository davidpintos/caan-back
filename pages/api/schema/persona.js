export const typeDef = `
    type Persona {
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
        seguimiento: String,
        sexo: String,
        lugarResguardo: LugarResguardo,
        resguardantes: [Resguardante],
    }
`;

export const resolvers = {
    Persona: {
        id: (persona, args, _context) => persona.id,
    },
};