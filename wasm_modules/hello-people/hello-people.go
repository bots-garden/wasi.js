package main

import (
  "unsafe"
)

func main() {}

//export hello
func hello() uint64 { // ptrAndSize

  message := "hello people"
  buf := []byte(message)
  bufPtr := &buf[0]
  unsafePtr := uintptr(unsafe.Pointer(bufPtr))

  ptr := uint32(unsafePtr)
  size := uint32(len(buf))

  ret := (uint64(ptr) << uint64(32)) | uint64(size)

  return ret
}
