import { createGraphqlSchema } from "mongo-graphql-starter";
import projectSetup from "./mgsMeta";

import path from "path";

createGraphqlSchema(projectSetup, path.resolve("./"));