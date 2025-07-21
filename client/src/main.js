import { io } from "socket.io-client"

const socket = io( "http://localhost:3000" )

console.log( socket )

socket.emit( "event_a" )

socket.on( "event_b", () => console.log( "Event B fired" ) )
