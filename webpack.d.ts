declare module "*.jpg";
declare module "*.png";
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.eot";
declare module "*.svg" {
  const content: any;
  export default content;
}
