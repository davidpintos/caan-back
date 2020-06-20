import {gql, ApolloServer} from "apollo-server-micro";
import { makeExecutableSchema } from 'graphql-tools';
import {merge} from "lodash";
import Dataloader from "dataloader";
import Cors from "micro-cors";

import knex from "knex";

import { typeDef as Contacto, resolvers as contactoResolvers } from './schema/contacto';
import { typeDef as Evidencia, resolvers as evidenciaResolvers } from './schema/evidencia';
import { typeDef as Foto, resolvers as fotoResolvers } from './schema/foto';
import { typeDef as Implicado, resolvers as implicadoResolvers } from './schema/implicado';
import { typeDef as LugarResguardo, resolvers as lugarResguardoResolvers } from './schema/lugarResguardo';
import { typeDef as Persona, resolvers as personaResolvers } from './schema/persona';
import { typeDef as Resguardante, resolvers as resguardanteResolvers } from './schema/resguardante';
import { typeDef as Riesgo, resolvers as riesgoResolvers } from './schema/riesgo';
import { typeDef as Usuario, resolvers as usuarioResolvers } from './schema/usuario';

const db = knex({
  client: "pg",
  connection: 'postgres://davidp@localhost:5432/caan',
  debug: true, // to see queries to the DB
});

const cors = Cors({
    allowMethods: ["POST", "OPTIONS"]
});

const typeDefs = gql`
    type Query {
        riesgos(first: Int = 25, skip: Int = 0): [Riesgo!]!
    },

    type Mutation {
        createPersona(nombres: String, apellidos: String): Persona,
        deletePersona(id: Int): Boolean,
    }
`;

const resolvers = {
    Query: {
        riesgos: (parent, args, context) => {
            return db.select("*")
            .from("riesgos")
            .orderBy("tipo", "asc")
            .limit(Math.min(args.first, 50))
            .offset(args.skip);

        },
    },

    Mutation: {
        createPersona: async (parent, {
            nombres, apellidos,
        }) => {
            const [personaId] = await db.insert({
                nombres: nombres,
                apellidos: apellidos,
            }).returning('id').into('personas');


            return {
                id: personaId,
                nombres,
                apellidos,
            }
        },
        deletePersona: async (parent, {
            id,
        }) => {
            const result = await db.del().where({id: id}).from('personas');


            return result;
        }
    }
}


const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        Contacto,
        Evidencia,
        Foto,
        Implicado,
        LugarResguardo,
        Resguardante,
        Riesgo,
        Persona,
        Usuario,
    ],
    resolvers: merge(
        resolvers,
        contactoResolvers,
        evidenciaResolvers,
        fotoResolvers,
        implicadoResolvers,
        lugarResguardoResolvers,
        personaResolvers,
        resguardanteResolvers,
        riesgoResolvers,
        usuarioResolvers,
    ),
});

const loader = {
    persona: new Dataloader(ids => {
        return db
            .select("*")
            .from("personas")
            .whereIn("id", ids)
            .then(rows => ids.map(id => rows.find(row => row.id === id)))
    })
}


const apolloServer = new ApolloServer({
    schema,
    context: () => {
        return { loader };
    },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });


export const config = {
    api: {
        bodyParser: false,
    }
}

export default cors(handler);
