import { queryUtilities, processHook, dbHelpers } from "mongo-graphql-starter";
import hooksObj from "../hooks";
const { decontructGraphqlQuery, parseRequestedFields, getMongoProjection, newObjectFromArgs, getUpdateObject, constants } = queryUtilities;
import { ObjectId } from "mongodb";
import NisaCollectionMetadata from "./NisaCollection";

export async function loadNisaCollections(db, queryPacket, root, args, context, ast) {
  let { $match, $project, $sort, $limit, $skip } = queryPacket;

  let aggregateItems = [
    { $match }, 
    $sort ? { $sort } : null, 
    { $project },
    $skip != null ? { $skip } : null, 
    $limit != null ? { $limit } : null
  ].filter(item => item);

  await processHook(hooksObj, "NisaCollection", "queryPreAggregate", aggregateItems, root, args, context, ast);
  let NisaCollections = await dbHelpers.runQuery(db, "nisa_collection", aggregateItems);
  await processHook(hooksObj, "NisaCollection", "adjustResults", NisaCollections);
  return NisaCollections;
}

export const NisaCollection = {


}

export default {
  Query: {
    async getNisaCollection(root, args, context, ast) {
      await processHook(hooksObj, "NisaCollection", "queryPreprocess", root, args, context, ast);
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      context.__mongodb = db;
      let queryPacket = decontructGraphqlQuery(args, ast, NisaCollectionMetadata, "NisaCollection");
      await processHook(hooksObj, "NisaCollection", "queryMiddleware", queryPacket, root, args, context, ast);
      let results = await loadNisaCollections(db, queryPacket, root, args, context, ast);

      return {
        NisaCollection: results[0] || null
      };
    },
    async allNisaCollections(root, args, context, ast) {
      await processHook(hooksObj, "NisaCollection", "queryPreprocess", root, args, context, ast);
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      context.__mongodb = db;
      let queryPacket = decontructGraphqlQuery(args, ast, NisaCollectionMetadata, "NisaCollections");
      await processHook(hooksObj, "NisaCollection", "queryMiddleware", queryPacket, root, args, context, ast);
      let result = {};

      if (queryPacket.$project) {
        result.NisaCollections = await loadNisaCollections(db, queryPacket, root, args, context, ast);
      }

      if (queryPacket.metadataRequested.size) {
        result.Meta = {};

        if (queryPacket.metadataRequested.get("count")) {
          let countResults = await dbHelpers.runQuery(db, "nisa_collection", [{ $match: queryPacket.$match }, { $group: { _id: null, count: { $sum: 1 } } }]);  
          result.Meta.count = countResults.length ? countResults[0].count : 0;
        }
      }

      return result;
    }
  },
  Mutation: {
    async createNisaCollection(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      context.__mongodb = db;
      let newObject = await newObjectFromArgs(args.NisaCollection, NisaCollectionMetadata, { db, dbHelpers, hooksObj, root, args, context, ast });
      let requestMap = parseRequestedFields(ast, "NisaCollection");
      let $project = requestMap.size ? getMongoProjection(requestMap, NisaCollectionMetadata, args) : null;

      if ((newObject = await dbHelpers.processInsertion(db, newObject, { typeMetadata: NisaCollectionMetadata, hooksObj, root, args, context, ast })) == null) {
        return { NisaCollection: null };
      }
      let result = $project ? (await loadNisaCollections(db, { $match: { _id: newObject._id }, $project, $limit: 1 }, root, args, context, ast))[0] : null;
      return {
        success: true,
        NisaCollection: result
      }
    },
    async updateNisaCollection(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      context.__mongodb = db;
      let { $match, $project } = decontructGraphqlQuery(args._id ? { _id: args._id } : {}, ast, NisaCollectionMetadata, "NisaCollection");
      let updates = await getUpdateObject(args.Updates || {}, NisaCollectionMetadata, { db, dbHelpers, hooksObj, root, args, context, ast });

      if (await processHook(hooksObj, "NisaCollection", "beforeUpdate", $match, updates, root, args, context, ast) === false) {
        return { NisaCollection: null };
      }
      if (!$match._id) {
        throw "No _id sent, or inserted in middleware";
      }
      await dbHelpers.runUpdate(db, "nisa_collection", $match, updates);
      await processHook(hooksObj, "NisaCollection", "afterUpdate", $match, updates, root, args, context, ast);
      
      let result = $project ? (await loadNisaCollections(db, { $match, $project, $limit: 1 }, root, args, context, ast))[0] : null;
      return {
        NisaCollection: result,
        success: true
      };
    },
    async updateNisaCollections(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      context.__mongodb = db;
      let { $match, $project } = decontructGraphqlQuery({ _id_in: args._ids }, ast, NisaCollectionMetadata, "NisaCollections");
      let updates = await getUpdateObject(args.Updates || {}, NisaCollectionMetadata, { db, dbHelpers, hooksObj, root, args, context, ast });

      if (await processHook(hooksObj, "NisaCollection", "beforeUpdate", $match, updates, root, args, context, ast) === false) {
        return { success: true };
      }
      await dbHelpers.runUpdate(db, "nisa_collection", $match, updates, { multi: true });
      await processHook(hooksObj, "NisaCollection", "afterUpdate", $match, updates, root, args, context, ast);
      
      let result = $project ? await loadNisaCollections(db, { $match, $project }, root, args, context, ast) : null;
      return {
        NisaCollections: result,
        success: true
      };
    },
    async updateNisaCollectionsBulk(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      let { $match } = decontructGraphqlQuery(args.Match, ast, NisaCollectionMetadata);
      let updates = await getUpdateObject(args.Updates || {}, NisaCollectionMetadata, { db, dbHelpers, hooksObj, root, args, context, ast });

      if (await processHook(hooksObj, "NisaCollection", "beforeUpdate", $match, updates, root, args, context, ast) === false) {
        return { success: true };
      }
      await dbHelpers.runUpdate(db, "nisa_collection", $match, updates, { multi: true });
      await processHook(hooksObj, "NisaCollection", "afterUpdate", $match, updates, root, args, context, ast);

      return { success: true };
    },
    async deleteNisaCollection(root, args, context, ast) {
      if (!args._id) {
        throw "No _id sent";
      }
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      let $match = { _id: ObjectId(args._id) };
      
      if (await processHook(hooksObj, "NisaCollection", "beforeDelete", $match, root, args, context, ast) === false) {
        return false;
      }
      await dbHelpers.runDelete(db, "nisa_collection", $match);
      await processHook(hooksObj, "NisaCollection", "afterDelete", $match, root, args, context, ast);
      return true;
    }
  }
};