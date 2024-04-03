import { DiscoveryServiceExternal } from "./DiscoveryServiceExternal";
import { ExtendedGroupEndpoints } from "../../../../../cdk-ts-common/types";
import { App } from "../../../../../cdk-ts-common/deployment/node_modules/aws-cdk-lib";
import * as fs from "fs";
import * as path from "path";
export const extendedGroupEndpoints: ExtendedGroupEndpoints = JSON.parse(fs.readFileSync(path.join(__dirname, "../inputs/inputs.json"), "utf-8"));

const app = new App();

export function main(app: App) {
  let discoveryServiceExternal: DiscoveryServiceExternal = <DiscoveryServiceExternal>{};
  for (const [deploymentGroup, deploymentGroupObj] of Object.entries(extendedGroupEndpoints)) {
    const gatewayName = Object.keys(deploymentGroupObj)[0];
    const { stage } = deploymentGroupObj[gatewayName];
    const { key } = deploymentGroupObj[gatewayName].features.DiscoveryService;
    discoveryServiceExternal = new DiscoveryServiceExternal(app, `${deploymentGroup}-${stage}`, deploymentGroupObj);
  }
  return discoveryServiceExternal;
}
