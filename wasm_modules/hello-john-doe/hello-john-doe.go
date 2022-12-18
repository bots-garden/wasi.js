package main

import (
	"fmt"
	goh "github.com/bots-garden/wasi.js/gohelpers"
)

func main() {
	fmt.Println("🤗")
}

//export hello
func hello(subjectPosition *uint32, length int) uint64 {

	subjectStr := string(goh.Read(subjectPosition, length))

	message := "👋 hello " + subjectStr

	return goh.Pack([]byte(message))

}
