"use strict";

import * as fs from 'fs';


import { WASI } from 'wasi';

const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./wasm_modules/hello-people/hello-people.wasm")
);
  const instance =
    await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);

  // call hello
  // get a kind of pair of value
  const helloPointerSize = instance.exports.hello();

  const memory = instance.exports.memory;

  const completeBufferFromMemory =
    new Uint8Array(memory.buffer);

  const MASK = (2n**32n)-1n;

  // extract the values of the pair
  const ptrPosition = Number(helloPointerSize >> BigInt(32));
  const stringSize = Number(helloPointerSize & MASK);

  const extractedBuffer = completeBufferFromMemory.slice(
    ptrPosition, ptrPosition+stringSize
  );

  const str =
    new TextDecoder("utf8").decode(extractedBuffer);

  console.log(str); // "hello people"

})();

