#!/bin/bash
go mod tidy
tinygo build -o hello-jane-doe.wasm -target wasi ./hello-jane-doe.go

ls -lh *.wasm
