export const typeDef = `
    type Riesgo {
        id: ID!,
        tipo: String!,
        persona: Persona,
    }
`;

export const resolvers = {
    Riesgo: {
        id: (riesgo, args, _context) => riesgo.id,
        persona: (riesgo, args, {loader}) => {
            // return db.select("*")
            // .from("personas")
            // .where({id: riesgo.idNino})
            // .first();
            return loader.persona.load(riesgo.idNino);
        },
    },
};