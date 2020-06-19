import {gql, ApolloServer} from "apollo-server-micro";
import { makeExecutableSchema } from 'graphql-tools';
import {merge} from "lodash";
import Dataloader from "dataloader";
import Cors from "micro-cors";

import knex from "knex";

import {
    typeDef as Persona,
    resolvers as personaResolvers,
} from './schema/persona';
import {
    typeDef as Riesgo,
    resolvers as riesgoResolvers,
} from './schema/riesgo';

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
}


const schema = makeExecutableSchema({
    typeDefs: [ typeDefs, Riesgo, Persona ],
    resolvers: merge(resolvers, personaResolvers, riesgoResolvers),
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
