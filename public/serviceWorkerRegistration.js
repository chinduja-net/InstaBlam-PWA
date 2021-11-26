
//Registrera service worker
async function registerSW() {
	if( 'serviceWorker' in navigator ) {
		try {
			await navigator.serviceWorker.register('./serviceworker.js')
			console.log('Service worker är registrerad.')
		} catch(error) {
			console.log('Kunde inte registrera service worker: ' + error.message);
		}
	
	} else {
		console.log('Service worker finns inte i den här webbläsaren');
		// Kanske göra saker i appen annorlunda
	}
}

registerSW(); 

/*
window.addEventListener('load', () => {
	// denna körs efter att DOM har laddats
	// nuförtiden använder vi hellre DEFER i script-taggen i head i stället
})
*/