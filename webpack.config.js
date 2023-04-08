/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const CheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

require("dotenv").config();

const resolve = path.resolve.bind(path, __dirname);

let bundleAnalyzerPlugin;
let speedMeasureWrapper = fn => fn;
const analyze = process.env.ANALYZE;
if (!!analyze) {
  const smp = new SpeedMeasurePlugin();
  speedMeasureWrapper = smp.wrap;
  bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
}

const pathsPlugin = new TsconfigPathsPlugin({
  configFile: "./tsconfig.json"
});

const checkerPlugin = new CheckerPlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  favicon: "./assets/images/favicon.png",
  filename: "index.html",
  hash: true,
  template: "./src/index.html",
  templateParameters: {
    // URI is kept for backwards compatibility.
    API_URL: process.env.API_URI,
    APP_MOUNT_URI: process.env.APP_MOUNT_URI
  }
});
const environmentPlugin = new webpack.EnvironmentPlugin({
  DEMO_MODE: false,
  ENVIRONMENT: "",
  GTM_ID: "",
  SENTRY_DSN: "",
  SW_INTERVAL: "300", // Fetch SW every 300 seconds
  IS_CLOUD_INSTANCE: false
});
const environmentVariables = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  "process.env.APP_MOUNT_URI": JSON.stringify(process.env.APP_MOUNT_URI),
  "process.env.API_URL": JSON.stringify(process.env.API_URL),
  "process.env.API_URI": JSON.stringify(process.env.API_URI),
  "process.env.GTM_ID": JSON.stringify(process.env.GTM_ID),
  "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN)
});

const appBuildPath = "build/";

module.exports = speedMeasureWrapper((env, argv) => {
  const devMode = argv.mode !== "production";

  let fileLoaderPath;
  let output;

  if (!process.env.API_URI) {
    // throw new Error("Environment variable API_URI not set");
  }

  const publicPath = process.env.STATIC_URL || "/";
  if (!devMode) {
    output = {
      chunkFilename: "[name].[chunkhash].js",
      filename: "[name].[chunkhash].js",
      path: resolve(appBuildPath),
      publicPath
    };
    fileLoaderPath = "file-loader?name=[name].[hash].[ext]";
  } else {
    output = {
      chunkFilename: "[name].js",
      filename: "[name].js",
      path: resolve(appBuildPath),
      publicPath
    };
    fileLoaderPath = "file-loader?name=[name].[ext]";
  }

  // Create release if sentry config is set
  let sentryPlugin;
  if (
    !devMode &&
    process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_DSN &&
    process.env.SENTRY_AUTH_TOKEN
  ) {
    sentryPlugin = new SentryWebpackPlugin({
      include: "./build/",
      urlPrefix: process.env.SENTRY_URL_PREFIX
    });
  }

  let manifestPlugin;
  if (!devMode) {
    manifestPlugin = new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js",
      maximumFileSizeToCacheInBytes: 5000000,
      webpackCompilationPlugins: [checkerPlugin]
    });
  }

  return {
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, appBuildPath),
      // historyApiFallback: true,
      historyApiFallback: {
        disableDotRule: true
      },
      hot: true,
      port: 3001
    },
    devtool: devMode ? "cheap-module-source-map" : "source-map",
    entry: {
      app: "./src/index.tsx"
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          use: [
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                target: "es2015"
              }
            }
          ]
        },
        {
          test: /\.(s[ac]ss?|css?)$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          // include: [
          //   resolve("node_modules"),
          //   resolve("assets/fonts"),
          //   resolve("assets/images"),
          //   resolve("assets/favicons"),
          // ],
          test: /\.(eot|otf|png|svg|jpg|ttf|woff|woff2)(\?v=[0-9.]+)?$/,
          use: [
            {
              loader: fileLoaderPath
            }
          ]
        }
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: "file-loader",
        //     },
        //   ],
        // },
      ]
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    output,
    plugins: [
      checkerPlugin,
      environmentPlugin,
      environmentVariables,
      htmlWebpackPlugin,
      sentryPlugin,
      manifestPlugin,
      bundleAnalyzerPlugin
    ].filter(Boolean),
    resolve: {
      // Resolve macaw ui's peer dependencies to our own node_modules
      // to make it work with npm link
      alias: {
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom")
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [pathsPlugin]
    }
  };
});
