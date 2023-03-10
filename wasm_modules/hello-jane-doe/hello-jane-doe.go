package main

import (
  "errors"
  "fmt"
  "github.com/bots-garden/wasi.js/gohelpers"
  "os"
  "path/filepath"
)

func main() {
  fmt.Println("🤖 function main")

  fmt.Println(os.Args)

  if filepath.Ext(os.Args[0]) == ".wasm" {
    fmt.Println("🤗 CLI mode", os.Args[1])
    value, _ := Handler([]byte(os.Args[1]))
    fmt.Println(string(value))
  } else {
    fmt.Println("🚀 function mode")
    fmt.Println("MESSAGE=", os.Getenv("MESSAGE"))
    gohelpers.SetHandler(Handler)
  }

}

func Handler(param []byte) ([]byte, error) {

  name := string(param)
  //fmt.Println("🤩", name)
  if name == "Jane" {
    message := "👋 hello " + string(param)
    return []byte(message), nil
  } else {
    return nil, errors.New("bad firstname")
  }

}
