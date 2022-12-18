#!/bin/bash
go mod tidy
tinygo build -o hello-somebody.wasm -scheduler=none -target wasi ./hello-somebody.go

ls -lh *.wasm
