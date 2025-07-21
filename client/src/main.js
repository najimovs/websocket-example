import "./main.css"
import { io } from "socket.io-client"

run()

function run() {

	let symbol = "0"

	const buttons = document.querySelectorAll( "#game-matrix button" )
	const select = document.querySelector( "select" )

	select.onchange = () => symbol = select.value

	buttons.forEach( ( button, index ) => {

		button.onclick = e => {

			if ( symbol === "x" || symbol === "y" ) {

				button.textContent = symbol
			}
		}
	} )
}

// const socket = io( "http://localhost:3000" )
// socket.emit( "new ")

// socket.on( "receive_message", message => {

// 	const li = document.createElement( "li" )
// 	li.textContent = message
// 	ul.appendChild( li )
// } )

// input.onkeyup = e => {

// 	if ( e.keyCode === 13 ) {

// 		socket.emit( "send_message", input.value )
// 	}
// }
