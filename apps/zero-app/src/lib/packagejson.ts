import packageJSON from "@/root/package.json" with { type: "json" };

export const PACKAGEJSON = {
  ...packageJSON,
  nameVersion: `${packageJSON.name}-${packageJSON.version}`,
};
