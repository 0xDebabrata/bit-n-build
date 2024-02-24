package main

import (
    "time"
    "log"

	"github.com/gorilla/websocket"
)

const (
    writeWait = 5 * time.Second    // Time allowed to write message to a peer.
    refreshPeriod = 1 * time.Second   // Delay b/w ping messages to peers.
)

type Admin struct {
    id          string
    conn        *websocket.Conn
    send        chan []byte
}

func initAdmin(id string, conn *websocket.Conn) *Admin {
    return &Admin{
        id: id,
        conn: conn,
        send: make(chan []byte),
    }
}

func (a *Admin) writePump() {
    ticker := time.NewTicker(refreshPeriod)
    defer func() {
        ticker.Stop()
        a.conn.Close()
    }()

    for {
        select {
        case message, ok := <-a.send:
            a.conn.SetWriteDeadline(time.Now().Add(writeWait))
            if !ok {
                a.conn.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }

            w, err := a.conn.NextWriter(websocket.TextMessage)
            if err != nil {
                log.Printf("Error creating next writer %v\n", err)
                return
            }
            w.Write(message)

            if err := w.Close(); err != nil {
                log.Printf("Error closing writer %v\n", err)
                return
            }
        case <-ticker.C:
            a.conn.SetWriteDeadline(time.Now().Add(writeWait))

            w, err := a.conn.NextWriter(websocket.TextMessage)
            if err != nil {
                log.Printf("Error creating next writer %v\n", err)
                return
            }

            test := "A"
            w.Write([]byte(test))

            if err := w.Close(); err != nil {
                log.Printf("Error closing writer %v\n", err)
                return
            }
        }
    }
}

