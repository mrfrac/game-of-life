import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/index.ts",
        output: {
            name: "GameOfLife",
            file: pkg.browser,
            format: "umd"
        },
        plugins: [
            typescript(),
            uglify(),
        ],
    }, {
        input: "src/index.ts",
        external: ["ms"],
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es", }
        ],
        plugins: [
            typescript()
        ],
    }
];
