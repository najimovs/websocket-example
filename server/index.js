import { Server } from "socket.io"
import { createServer } from "http"

const clients = []
const state = new Map()
let lastSymbol = null

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

io.on( "connection", client => {

	clients.push( client )

	client.on( "set_symbol", symbol => {

		for ( const client of clients ) {

			client.emit( "busy_symbol", symbol )
		}
	} )

	client.on( "reset", () => {

		lastSymbol = null
		state.clear()

		for ( const client of clients ) {

			client.emit( "reset" )
		}
	} )

	client.on( "action", ( { index, symbol } ) => {

		if ( state.has( index ) ) {

			return
		}

		if ( symbol !== lastSymbol ) {

			lastSymbol = symbol

			state.set( index, symbol )

			for ( const client of clients ) {

				client.emit( "update", { index, symbol } )
			}
		}
	} )
} )
