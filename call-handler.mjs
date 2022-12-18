"use strict";

import {WasmHelper, WasmModule} from './src/main.mjs'
//import process from "node:process";

(async () => {
  const wasm = await WasmHelper.compile("./wasm_modules/hello-jane-doe/hello-jane-doe.wasm")
  /*
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./wasm_modules/hello-jane-doe/hello-jane-doe.wasm")
  );
  */
  let wasmModule = new WasmModule(wasm)

  let success = await wasmModule.initialize()

  // 🖐 Prepare the string parameter
  const stringParameter = "Jane Doe";
  const bytes =
    new TextEncoder("utf8").encode(stringParameter)

  let result = wasmModule.callHandlerWithBytes(bytes)
  //const str = new TextDecoder("utf8").decode(result.buffer)

  if(result.isError) {
    console.log("😡", result.toString())
  } else {
    console.log("🙂", result.toString())
  }

  let anotherResult = wasmModule.callHandlerWithString("Jane")
  if(anotherResult.isError) {
    console.log("😡", anotherResult.toString())
  } else {
    console.log("🙂", anotherResult.toString())
  }

  let aResultAgain = wasmModule.callHandlerWithJson({name:"Jane"})
  if(aResultAgain.isError) {
    console.log("😡", aResultAgain.toString())
  } else {
    console.log("🙂", aResultAgain.toString())
  }
})();

