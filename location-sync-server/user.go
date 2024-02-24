import(
	"github.com/gorilla/websocket"
)


struct User {
	usedId string
	conn websocket.Conn
	chan []byte
}

