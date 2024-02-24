package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

var uidToGps = sync.Map{}

var upgrader = websocket.Upgrader{
    ReadBufferSize: 1024,
    WriteBufferSize: 1024,
}

func hello(w http.ResponseWriter, req *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    fmt.Fprintf(w, "hello\n")
}

/*
func handleCreateWatchparty(w http.ResponseWriter, r *http.Request) {
    requestQuery := r.URL.Query()
    ownerId := requestQuery.Get("ownerId")
    partyId := requestQuery.Get("partyId")
    src := requestQuery.Get("src")

    if ownerId == "" {
        log.Println("Owner ID not provided")
        http.Error(w, "Owner ID not provided", http.StatusForbidden)
        return
    }
    if partyId == "" || src == "" {
        log.Println("Party ID or video source not provided")
        http.Error(w, "Incomplete watchparty details provided\n", http.StatusNotFound)
        return
    }

    party := createParty(partyId, ownerId, src)
    watchparties.Store(partyId, party)
    go party.run()

    fmt.Fprint(w, "Success")
}
*/

func UidToMapCreator(userId string, location *[2]float64) {
    uidToGps.Store(userId, location)
}

func userWebsocketHandler(w http.ResponseWriter, r *http.Request) {
    requestQuery := r.URL.Query()
    userId := requestQuery.Get("userId")

    if userId == "" {
        log.Println("User ID not provided")
        return
    }

    upgrader.CheckOrigin = func(r *http.Request) bool {
        return true
    }
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }

    /*
    if userId != "" {
        client := initClient(userId, conn, party.(*Party))  // Go type assertion
        go client.readPump()
        go client.writePump()
    }
    */
    conn.Close()
}

func adminWebsocketHandler(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool {
        return true
    }
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }

    adminClient := initAdmin("admin", conn)
    adminClient.writePump()
}

func main() {
    mux := http.NewServeMux()

    // mux.HandleFunc("/create", handleCreateWatchparty)
    mux.HandleFunc("/admin", adminWebsocketHandler)
    mux.HandleFunc("/user", userWebsocketHandler)
    mux.HandleFunc("/", hello)

    handler := cors.Default().Handler(mux)
    http.ListenAndServe(":6969", handler)
}
