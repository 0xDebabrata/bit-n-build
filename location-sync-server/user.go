package main

import(
	"github.com/gorilla/websocket"
)

type User struct {
	usedId string
	conn *websocket.Conn
	send chan []byte
}
