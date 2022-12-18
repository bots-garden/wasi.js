#!/bin/bash
go mod tidy
tinygo build -o hello-people.wasm -scheduler=none -target wasi ./hello-people.go

ls -lh *.wasm
