import "./main.css"
import { io } from "socket.io-client"

run()

function run() {

	let symbol = "0"
	const socket = io( "http://localhost:3000" )

	const buttons = document.querySelectorAll( "#game-matrix button" )
	const select = document.querySelector( "select" )
	const resetButton = document.querySelector( "#app > button" )

	resetButton.onclick = () => {

		socket.emit( "reset" )
	}

	select.onchange = () => {

		symbol = select.value

		buttons.forEach( button => button.removeAttribute( "disabled" ) )

		select.setAttribute( "disabled", "true" )

		socket.emit( "set_symbol", symbol )
	}

	socket.on( "update", ( { index, symbol } ) => {

		buttons[ index ].textContent = symbol
		buttons[ index ].setAttribute( "disabled", "true" )
	} )

	socket.on( "busy_symbol", symbol => {

		[ ...select.children ].forEach( option => {

			if ( option.value === symbol ) {

				option.setAttribute( "disabled", "true" )
			}
		} )
	} )

	socket.on( "reset", () => {

		select.removeAttribute( "disabled" )

		buttons.forEach( button => {

			button.textContent = ""
			button.removeAttribute( "disabled" )
		} )
	} )

	buttons.forEach( ( button, index ) => {

		button.onclick = e => {

			if ( symbol === "x" || symbol === "y" ) {

				socket.emit( "action", { index, symbol } )
			}
		}
	} )
}
