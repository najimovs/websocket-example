import { io } from "socket.io-client"

const socket = io( "http://localhost:3000" )

const input = document.querySelector( "input" )
const ul = document.querySelector( "ul" )

socket.on( "receive_message", message => {

	const li = document.createElement( "li" )
	li.textContent = message
	ul.appendChild( li )
} )

input.onkeyup = e => {

	if ( e.keyCode === 13 ) {

		socket.emit( "send_message", input.value )
	}
}
