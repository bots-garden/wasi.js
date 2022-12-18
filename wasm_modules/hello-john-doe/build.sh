#!/bin/bash
go mod tidy
tinygo build -o hello-john-doe.wasm -scheduler=none -target wasi ./hello-john-doe.go

ls -lh *.wasm
