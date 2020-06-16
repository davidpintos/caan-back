import {gql, ApolloServer} from "apollo-server-micro";
import Dataloader from "dataloader";
import Cors from "micro-cors";

import knex from "knex";

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
    }

    type Riesgo {
        id: ID!,
        tipo: String!,
        persona: Persona,
    }

    type Persona {
        id: ID,
        nombres: String,
        apellidos: String,
        direccion: String,
        ciudad: String,
        provincia: String,
    }
`;

const resolvers = {
    Query: {
        riesgos: (_parent, args, _context) => {
            return db.select("*")
            .from("riesgos")
            .orderBy("tipo", "asc")
            .limit(Math.min(args.first, 50))
            .offset(args.skip);

        },
    },

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

    Persona: {
        id: (persona, args, _context) => persona.id,
    }
}

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
    typeDefs,
    resolvers,
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
