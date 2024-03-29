
enum Env {
  PROD = "Prod",
  STAGE = "Stage",
  INT = "Int",
};

const prodConfig = {
  monoServiceUrl: 'http://ec2-3-95-180-146.compute-1.amazonaws.com',
}

const stageConfig = {
  monoServiceUrl: 'https://peaceful-stream-33484-ea18a8974d0f.herokuapp.com',
}

const intConfig = {
  monoServiceUrl: 'http://localhost:5000',
}

const config = {
  [Env.PROD]: prodConfig,
  [Env.STAGE]: stageConfig,
  [Env.INT]: intConfig,
}

export const environment = Env.STAGE;

export function getConfig(){
  const res = config[environment]
  return res;
}
