"use strict";

import * as fs from 'fs';


import { WASI } from 'wasi';

const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./wasm_modules/hello-world/hello-world.wasm")
);
  const instance =
    await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);

  const helloStringPosition = instance.exports.hello();

  const memory = instance.exports.memory;

  const extractedBuffer =
    new Uint8Array(memory.buffer, helloStringPosition, 11);
  // 11 == length of "hello world"

  const str =
    new TextDecoder("utf8").decode(extractedBuffer);

  console.log(str); // "hello world"

})();
