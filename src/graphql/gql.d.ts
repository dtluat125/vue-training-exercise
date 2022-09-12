declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const MyQuery: DocumentNode;

  export { MyQuery };

  export default defaultDocument;
}
