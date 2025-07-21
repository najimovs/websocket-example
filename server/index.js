import { Server } from "socket.io"
import { createServer } from "http"

const httpServer = createServer()
const io = new Server( httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ],
	}
} )

httpServer.listen( 3_000, () => {
	console.log( "Server listening on port 3000" )
} )

io.on( "connection", socket => {

	console.log( "New connection" )
} )
