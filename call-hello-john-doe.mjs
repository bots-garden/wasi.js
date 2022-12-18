"use strict";

import * as fs from 'fs';


import { WASI } from 'wasi';

const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./wasm_modules/hello-john-doe/hello-john-doe.wasm")
);
  const instance =
    await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);

  // 🖐 Prepare the string parameter
  const stringParameter = "John Doe 😮";
  const bytes =
    new TextEncoder("utf8").encode(stringParameter);

  // © Completely inspired by:
  // https://radu-matei.com/blog/practical-guide-to-wasm-memory/
  // Copy the contents of the string into the module's memory
  const ptr = instance.exports.alloc(bytes.length);
  const mem = new Uint8Array(
    instance.exports.memory.buffer, ptr, bytes.length
  );
  mem.set(new Uint8Array(bytes));


  // call hello
  // get a kind of pair of value
  const helloPointerSize = instance.exports.hello(ptr, bytes.length);

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

  console.log(str);

})();

