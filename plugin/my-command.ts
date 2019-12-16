// find /Users/phalu/Desktop/craft/craft.sketchplugin __my-command_ts '*js' | entr \
// -r /Applications/Sketch.app/Contents/MacOS/Sketch


import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
import sketch from 'sketch/dom'
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote'

declare let AppController:any
declare let NSURL:any


// Naming your webview to accesss it remotely
const webviewIdentifier = 'craft.webview'

export default function () {

	// confirgure your webview
  const options = {
    identifier: webviewIdentifier,
    width: 800,
    height: 600,
    show: false,
    hidesOnDeactivate:false
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message("Yayyyy! It's working")
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL("http://localhost:3000")
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin). we need to close the webview if it's open.
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}

// parse the layers to a specific format
function parseLayers(list: any[]) {

	let newList: any[] = []
	// base case
	if(list.length === 0) {
		return newList
	}

	let currentLayer:any = list[0]
	newList.push({id:currentLayer.id, type:currentLayer.type})

	// check for groups
	if (currentLayer.layers) {
		newList.push(parseLayers(currentLayer.layers))
	}

	// check for symbols
	if (currentLayer.master) {
		newList.push(parseLayers(currentLayer.master.layers))
	}
	// concat and return list
	newList = newList.concat(parseLayers(list.slice(1)))
	return newList
	}


// Notify the plugin when an artboard is selected in sketch
export function onSelectionChanged(context:any) {

	// action-context for selection Changed
	const action = context.actionContext

	let newArtboard = sketch.fromNative(action.newSelection[0]).getParentArtboard()
	let oldArtboard = sketch.fromNative(action.oldSelection[0]).getParentArtboard()


	// Retrieving the Artboard for the selection
	if ( newArtboard.id != oldArtboard.id && newArtboard ) {

			// parse the artboard layers
			let layers  = parseLayers(newArtboard.layers)
			// console.log(layers)
			console.log(sketch.fromNative(action.newSelection[0]));

			// Sending Layer info to the webview
			if (isWebviewPresent('craft.webview')) {
				sendToWebview('craft.webview', `getLayerInfo(${JSON.stringify(layers)})`)
			}
		}
	}


// Starts the plugin on opening sketch
export function onOpen() {
	let app = AppController.sharedInstance();
	let pluginURL = NSURL.fileURLWithPath("/Users/phalu/Desktop/craft/craft.sketchplugin")
	app.runPluginCommandWithIdentifier_fromBundleAtURL("main", pluginURL)
}
