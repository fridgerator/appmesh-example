import { App } from "aws-cdk-lib";
import { AppMeshStack } from "../lib/stack";

const app = new App()
new AppMeshStack(app, 'MyAppmeshStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
