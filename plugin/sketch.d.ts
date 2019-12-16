// Type definitions for Sketch JavaScript API 2.0.0
// Project: https://developers.google.com/maps/
// Definitions by: Phalguna Yadlapati <https://github.com/phalu>,
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// TypeScript Version: 3.6.3

/*
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


declare module "sketch/dom" {

	// assigning type to buffer
	type Buffer = object

	// assigning type to sketch native object
	export type SketchNativeObject = object

	// stores the global assets
	let globalAssets:GlobalAssets

	// returns an array of documents
	function getDocuments(): Document[] | undefined

	// also exposed on Document
	function getSelectedDocument(): Document

	// Access all the Libraries
	function getLibraries(): Library[]

	// Find a Layer by Id
	function getLayerWithID(layerId: string): Layer | undefined

	// A utility function to get a wrapped object from a native Sketch model object.
	function fromNative(obj: SketchNativeObject):Layer | any

// Import a file as a Layer.
	function createLayerFromData(buffer: Buffer | string, type: string) : Group | Image | Page

	// Find Layers fitting some criteria.
	function find(selector:string, scope?: Group | Document): Layer

	//sketch export function - Name changed to exportSketch and can be used as a type
	 type exportSketch = (objectToExport: Layer | Layer[] | Page | Page[], opts?: ExportOptions) => undefined | object[] | object | Buffer | Buffer[]

	// Export an object, using the options supplied.
	interface ExportOptions {

		// this is the path of the folder where all exported files are placed (defaults to "~/Documents/Sketch Exports"). If falsey, the data for the objects are returned immediately.
		output: string

		// Comma separated list of formats to export to (png, jpg, svg, json or pdf) (default to "png").
		formats: string

		// Comma separated list of scales which determine the sizes at which the layers are exported (defaults to "1").
		scales: string

		// Name exported images using their id rather than their name (defaults to false).
		"use-id-for-name": boolean

		// Export only layers that are contained within the group (default to false).
		'group-contents-only': boolean

		//Overwrite existing files (if any) with newly generated ones (defaults to false).
		overwriting: boolean

		// Trim any transparent space around the exported image (leaving it undefined will match Sketch’s behavior: trim for layers that do not have a background color).
		trimmed:boolean

		// If exporting a PNG, remove metadata such as the colour profile from the exported file (defaults to false).
		'save-for-web': boolean

		// If exporting a SVG, make the output more compact (defaults to false).
		compact: boolean

		// If exporting a SVG, include extra attributes (defaults to false).
		'include-namespaces': boolean

		// If exporting a JPG, export a progressive JPEG (only used when exporting to jpeg) (defaults to false).
		progressive: boolean

		// If exporting a JPG, the compression level to use fo jpeg (with 0 being the completely compressed, 1.0 no compression) (defaults to 1.0).
		compression: number

	}

  class WrappedObject {
    // creates a new native Sketch model object and returns a wrapped object
    constructor (opts?:object)

    // returns a wrapped object from a native Sketch model object
    static fromNative(obj:WrappedObject): SketchNativeObject

    // return a JSON object that represent the component
    toJSON():JSON

    // returns true if the component is wrapping an immutable version of a native Sketch model object. If that is the case, you won’t be able to mutable the object (setting any property will be a no-op).
    isImmutable():boolean

    // returns a string that represent the type of the component. If it’s undefined, it means that we couldn’t match the native object and that we returned a really lightweight wrapper.
    type: string | undefined
  }

	enum ColorSpace {
		Unmanaged,
		sRGB,
		P3
	}

	enum SaveMode {
		Save,
		SaveAs,
		SaveTo
	}

	interface DocumentSaveOptions {
		saveMode:SaveMode
	}

  export class Document extends WrappedObject {

		// create a new document
		constructor(opts?:object)

		// returns the current document
		static getSelectedDocument():Document

		// returns an array of documents
		static getDocuments(): Document[] | undefined

    // The unique ID of the document.
    id: string

    // The pages of the document.
    pages: Page[]

		// The selected page of the Document.
		selectedPage: Page

		// The Selection of the layers that the user has selected in the currently selected page.
		selectedLayers: Selection

		// The path to the document (or the appcast URL in case of a Document from a remote Library).
		path:string

		// The list of all shared layer styles defined in the document.
		sharedLayerStyles:SharedStyle[]

		// The list of all shared text styles defined in the document.
		sharedTextStyles: SharedStyle[]

		// A list of color assets defined in the document. Mutating the returned array will update the document colors.
		colors: ColorAsset[]

		// A list of gradient assets defined in the document. Mutating the returned array will update the document gradients.
		gradients: GradientAsset[]

		// A list of gradient assets defined in the document. Mutating the returned array will update the document gradients.
		colorSpace:ColorSpace

		// ask the user to select a document
		// A function called after the document is opened. It is called with an Error if opening the Document was unsuccessful and a Document (or undefined).

		open(callback:(err:Error, doc:Document | undefined) => void): void

		// open a sketch document at the specified path
		// The path to the document to open. If undefined, the user will be asked to select one.
		open(path: string, callback:(err:Error, doc:Document | undefined) => void): void

		// Find the first layer in this document which has the given id.
		getLayerWithID(layerId: string): Layer | undefined

		// Find Layers by name
		getLayersNamed(name:string): Layer[]

		// Find a Shared Layer Style
		getSharedLayerStyleWithID(sharedStyleId:string): SharedStyle | undefined

		// Find a Shared Text Style
		getSharedTextStyleWithID(sharedStyleId: string): SharedStyle | undefined

		// Get all the Symbol Masters
		getSymbols(): SymbolMaster []

		// Find a Symbol Master
		getSymbolMasterWithID(symbolId:string): SymbolMaster | undefined

		// Center on Layer
		centerOnLayer(layer:Layer):void

		// save the document
		save():void

		// save the document to path
		save(path:string):void

		// save the document to path and check for error
		save(path:string, action:(error:Error)=>void ):void

		// save the document with options
		save(opts?:DocumentSaveOptions):void

		// save the document to path with options
		save(path:string, opts?:DocumentSaveOptions):void

		// Close the Document
		close():void

		// By default the method assigns a new color space
		changeColorSpace(colorSpace: ColorSpace):void

		// Pass true as an optional second argument
		// to convert instead of assign
		changeColorSpace(colorSpace: ColorSpace, convert:boolean):void

  }

	enum ImportableObjectType {
		Symbol,
		LayerStyle,
		TextStyle,
		Unknown
	}

	// An Object that can imported from a Library. All its properties are read-only.
	class ImportableObject extends WrappedObject {

		// The unique ID of the Object.
		readonly id: string

		// The name of the Object.
		readonly name: string

		// The type of the Object. Will only be Library.ImportableObjectType.Symbol for now.
		readonly objectType: ImportableObjectType

		// The Library the Object is part of.
		readonly library: Library

		// An Importable Object is linked to a Document so importing it will import it in the said Document. If the objectType of the Object is Symbol, it will return a Symbol Master which will be linked to the Library (meaning that if the Library is updated, the Symbol Instances created from the Master will be updated as well).
		import(): ImportableObjectType

	}

	// Enumeration of the types of Library.
	enum LibraryType {
		Internal = 'Internal',
		User = 'User',
		Remote = 'Remote'
	}

	class Library extends WrappedObject {

		// The unique ID of the Library.
    readonly id: string

		// The name of the Library.
		readonly name: string

		// If Sketch has been able to load the Library. If the library is not valid, the methods will often not be available so always check this field before doing something with a library.
		readonly valid: boolean

		// If the user has enabled the Library.
		enabled: boolean

		// The type of Library.
		readonly libraryType: LibraryType

		// The date at which the library was last updated
		readonly lastModifiedAt: Date


		// Access all the Libraries
		static getLibraries(): Library[]

		// Get the library for a local Sketch document. If the Document was already added as a Library, it will simply return it. If it is not already a Library, it will be added. Returns the existing Library at the path or a new Library from the document at the path.
		static getLibraryForDocumentAtPath(path: string): Library

		// Get the remote library for an RSS feed. If the RSS feed was already added as a Library, it will simply return it. If it is not already a Library, it will be added.
		static getRemoteLibraryWithRSS(url:string, callback:(err:Error,library: Library | undefined) => void):void


		// A method to remove an existing library.
		remove(): void

		// A library references a Sketch Document and you can access it with this method. The Document that the Library references. It can throw an error if the Document cannot be accessed.
		getDocument(): Document | undefined

		// To import a symbol from a Library, do not access its Document and look for the SymbolMaster directly. Instead, get the Symbol References of the Library and use those to import them. Those references depends on the document you want to import them into. For example if a document has already imported a symbol, it will reference the local version to keep all the instances in sync. Returns An array of Shareable Object that represents the Symbols which you can import from the Library.
		getImportableSymbolReferencesForDocument(doc: Document): ImportableObjectType[]

		// Importable Object Type
		ImportableObjectType: ImportableObjectType


	}

	// Enumeration of the blending mode.
	enum BlendingMode {
		Normal,
		Darken,
		Multiply,
		ColorBurn,
		Lighten,
		Screen,
		ColorDodge,
		Overlay,
		SoftLight,
		HardLight,
		Difference,
		Exclusion,
		Hue,
		Saturation,
		Color,
		Luminosity
	}

	// Enumeration of the type of a blur.
	enum BlurType {
		Gaussian,
		Motion,
		Zoom,
		Background
	}


	class Blur extends WrappedObject {

		// The type of the blur.
		blurType: BlurType

		// The radius of the blur.
		radius: number

		// The angle of the blur (only used when the blur type is Motion).
		motionAngle: number

		// The center of the blur (only used when the blur type is Zoom.
		center: Point

		// Whether the fill is active or not.
		enabled: boolean


	}

	// Enumeration of the types of fill.
	enum FillType {
		Color = 0,
		Gradient = 1,
		Pattern = 4
	}

	// Enumeration of the type of a Gradient.
	enum GradientType {

		// Linear gradients tend to be the most common, where two colors will appear at opposite points of an object and will blend, or transition into each other.
		Linear,

		//  A radial gradient will create an effect where the transition between color stops will be in a circular pattern.
		Radial,

		// This effect allows you to create gradients that sweep around the circumference (measured by the maximum width or height of a layer) in a clockwise direction.
		Angular

	}

	// An object that represent a Gradient Stop. Each of colors of a Gradient are represented by a Stop. A Gradient can have as many Stops as you’d like.
	class GradientStop extends WrappedObject {

		// The position of the Stop. 0 represents the start of the gradient while 1 represent the end.
		position:number

		// The color of the Stop
		color: string
	}

	// An object that represent a Gradient.
	class Gradient extends WrappedObject {
		// The type of the Gradient.
		gradientType: GradientType

		// The position of the start of the Gradient
		from: Point

		// The position of the end of the Gradient.
		to: Point

		// When the gradient is Radial, the from and to points makes one axis of the ellipse of the gradient while the aspect ratio determine the length of the orthogonal axis (aspectRatio === 1 means that it’s a circle).
		aspectRatio: number

		// The different stops of the Gradient
		stops: GradientStop[]



	}

	// Enumeration of the types of pattern fill.
	enum PatternFillType {
		Tile,
		Fill,
		Stretch,
		Fit
	}

	interface Pattern {

		// How the pattern should fill the layer.
		patternType: PatternFillType

		// The image of tile of the pattern.
		image: ImageData | null

		// The scale applied to the tile of the pattern.
		tileScale:number
	}

	class Fill extends WrappedObject {

		// The type of the fill.
		fillType: FillType

		// A rgba hex-string (#000000ff is opaque black).
		color: string

		// The gradient of the fill.
		gradient: Gradient

		// The pattern of the fill.
		pattern: Pattern

		// Whether the fill is active or not.
		enabled: boolean


	}

	// Enumeration of the positions of a border.
	enum BorderPosition {
		Center,
		Inside,
		Outside,
		Both
	}

	class Border extends WrappedObject {

		// The type of the fill of the border.
		fillType: FillType

		// A rgba hex-string (#000000ff is opaque black).
		color: string

		// The gradient of the fill.
		gradient: Gradient

		// Whether the border is active or not.
		enabled: boolean

		// The position of the border.
		position: BorderPosition

		// The thickness of the border.
		thickness: number

	}

	// Enumeration of the type of the Arrowhead for line layers.
	enum Arrowhead {
		None,
		OpenArrow,
		FilledArrow,
		Line,
		OpenCircle,
		FilledCircle,
		OpenSquare,
		FilledSquare
	 }

	 // Enumeration of the positions of a border.
	 enum LineEnd {
		 // This is the default option that’ll draw the border right to the vector point.
		 Butt,

		 // Creates a rounded, semi-circular end to a path that extends past the vector point.
		 Round,

		 // Similar to the rounded cap, but with a straight edges.
		 Projecting

	 }

	 // Enumeration of the positions of a border.
	 enum LineJoin {

	 // This will simply create an angled, or pointy join. The default setting.
	 Milter,

	 // Creates a rounded corner for the border. The radius is relative to the border thickness.
	 Round,

	 // This will create a chamfered edge on the border corner.
	 Bevel

	 }

	// An object that represent the options that the Borders of the Layer share.
	class BorderOptions extends WrappedObject {

		// The type of the arrow head for the start of the path.
		startArrowhead: Arrowhead

		// The type of the arrow head for the end of the path.
		endArrowhead: Arrowhead

		// The dash pattern of the borders. For example, a dash pattern of 4-2 will draw the stroke for four pixels, put a two pixel gap, draw four more pixels and then so on. A dashed pattern of 5-4-3-2 will draw a stroke of 5 px, a gap of 4 px, then a stroke of 3 px, a gap of 2 px, and then repeat.
		dashPattern: number[]

		// The type of the border ends (if visible).
		lineEnd: LineEnd

		// The type of the border joins (if any).
		lineJoin: LineJoin


	}

	// An object that represent a Shadow.
	class Shadow extends WrappedObject {

		// A rgba hex-string (#000000ff is opaque black).
		color : string

		// The blur radius of the shadow.
		blur: number

		// The horizontal offset of the shadow.
		x: number

		// The vertical offset of the shadow.
		y: number

		// The spread of the shadow.
		spread:number

		// Whether the fill is active or not.
		enabled:boolean

	}

	class Style extends WrappedObject {

		// The opacity of a Layer, between 0 (transparent) and 1 (opaque).
		opacity:number

		// The opacity of a Layer, between 0 (transparent) and 1 (opaque).
		blendingMode: BlendingMode

		// The blur applied to the Layer.
		blur: Blur

		// The fills of a Layer.
		fills: Fill[]

		// The borders of a Layer.
		borders: Border[]

		// The options that the borders share.
		borderOptions: BorderOptions

		// The shadows of a Layer.
		shadows: Shadow[]

		// The inner shadows of a Layer.
		innerShadows: Shadow[]

		// The horizontal alignment of the text of a Text Layer
		alignment: Alignment

		// The vertical alignment of the text of a Text Layer
		verticalAlignment: VerticalAlignment

		// The kerning between letters of a Text Layer. null means that the kerning will be the one defined by the font.
		kerning: number | null

		// The height of a line of text in a Text Layer. null means “automatic”.
		lineHeight : number | null

		// The space between 2 paragraphs of text in a Text Layer.
		paragraphSpacing: number

		// A rgba hex-string (#000000ff is opaque black) of the color of the text in a Text Layer.
		textColor: string

		// The size of the font in a Text Layer.
		fontSize:number

		// The transform applied to the text of a Text Layer.
		textTransform: 'none' | 'uppercase' | 'lowercase'

		// The name of the font family of a Text Layer. 'system' means the font family of the OS ('.SF NS Text' on macOS 10.14).
		fontFamily: string

		// The weight of the font of a Text Layer. Goes from 0 to 12, 0 being the thinest and 12 being the boldest. Not every weight are available for every fonts. When setting a font weight that does not exist for the current font family, the closest weight that exists will be set instead.
		fontWeight: number

		// The style of the font of a Text Layer.
		fontStyle: 'italic' | undefined

		// The variant of the font of a Text Layer.
		fontVariant: 'small-caps' | undefined

		// The size variant of the font of a Text Layer.
		fontStretch: 'compressed' | 'condensed' | 'narrow' | 'expanded' | 'poster' | undefined

		// The underline decoration of a Text Layer.
		// <line-style> [<line-pattern>] ['by-word'] / undefined where <line-style> can be single / thick / double and <line-pattern> can be dot / dash / dash-dot / dash-dot-dot
		textUnderline: string

		// The strikethrough decoration of a Text Layer.
		// <line-style> [<line-pattern>] ['by-word'] / undefined where <line-style> can be single / thick / double and <line-pattern> can be dot / dash / dash-dot / dash-dot-dot
		textStrikethrough: string

		// Get the default line height . When no line height is specified, style.lineHeight will be undefined. You can get the default line height of the font using style.getDefaultLineHeight(). Returns a number if the layer is a Text layer or undefined.
		getDefaultLineHeight(): number | undefined

		// Check if the Style is in sync with a Shared Style. Returns Whether the Style has some differences with a Shared Style.
		isOutOfSyncWithSharedStyle(sharedStyle:SharedStyle): boolean

		// Sync the Style with a Shared Style
		syncWithSharedStyle(sharedStyle: SharedStyle): void

		}

		enum StyleType {
			Text,
			Layer,
			Unknown
		}

		interface SharedStyleOptions {
			name: string
			style: Style
			document:Document

		}

		// A shared style (either a layer style or a text style).
		class SharedStyle extends WrappedObject {

			// Create a new Shared Style from a Style
			static fromStyle(opts:SharedStyleOptions):void

			// The unique ID of the Shared Style.
			id: string

			// The type of the Shared Style.
			styleType: StyleType

			// The name of the Shared Style.
			name:string

			// The Style value that is shared.
			style:Style

			// Returns an array of all instances of the Shared Style in the document, on all pages.
			getAllInstances(): Style[]

			// Returns an array of all layers with a Style which is an instance of the Shared Style in the document, on all pages.
			getAllInstancesLayers(): Layer[]

			// The Library the Shared Style was defined in, or null if it is a local shared style.
			getLibrary(): Library | null

			// Sync the local reference with the library version. If a Library has some updates, you can synchronize the local Shared Style with the Library’s version and bypass the panel where the user chooses the updates to bring. Returns true if it succeeded.
			syncWithLibrary(): boolean

			// You can unlink a Shared Style from the Library it comes from and make it a local Shared Style instead. Returns true if it succeeded.
			unlinkFromLibrary(): boolean

		}

		// A Symbol override. This component is not exposed, it is only returned when accessing the overrides of a Symbol Instance or Symbol Master. The overrides are not available until after the instance is injected into the document.
		export class Override extends WrappedObject {

				// The path to the override. It’s formed by the symbolId of the nested symbols separated by a /.
				path: string

				// The property that this override controls. It can be "stringValue" for a text override, "symbolID" for a nested symbol, "layerStyle" for a shared layer style override, "textStyle" for a shared text style override, "flowDestination" for a Hotspot target override or "image" for an image override.
				property: "stringValue" | "symbolID" | "layerStyle" | "textStyle" | "flowDestination" | "image"

				// The unique ID of the override (${path}_${property}).
				id: string

				// If the override is a nested symbol override.
				symbolOverride: boolean

				// The value of the override which can be change.
				value: String | ImageData

				// If the override hasn’t been changed and is the default value.
				isDefault: boolean

				// The layer the override applies to. It will be an immutable version of the layer.
				affectedLayer : Text | Image | SymbolInstance

				// If the value of the override can be changed.
				editable: boolean

				// If the override is selected (or undefined if it’s the override of a Symbol Master).
				selected: boolean | undefined

				// The frame of an override can be different than the frame of its affected Layer in case where the Symbol Instance has been scaled for example. Returns A Rectangle describing the frame of the affected layer in the Symbol Instance’s coordinates.
				getFrame():Rectangle

		}

		enum BackTarget {
			BackTarget = 'back'
		}

		// Enumeration of the animation types.
		enum AnimationType {
			none = -1,
			slideFromLeft = 0,
			slideFromRight = 1,
			slideFromBottom = 2,
			slideFromTop = 3
		}

		// The prototyping action associated with a layer.
		class Flow extends WrappedObject {

			// The target artboard of the action or Flow.BackTarget if the action is a back action
			target: Artboard | BackTarget

			// The ID of target artboard of the action or Flow.BackTarget if the action is a back action
			targetId: string | BackTarget

			// The type of the animation.
			animationType: AnimationType

			// Check if the action is a Back action. Returns whether the prototyping action is a back action or not, eg. whether layer.flow.target === Flow.BackTarget.
			isBackAction(): boolean

			// Check if the target is valid. In some cases, the target of the action can be invalid, for example when the target has been removed from the document. The methods returns whether the target is valid or not.
			isValidConnection(): boolean

		}

		type fileFormatOptions = 'jpg' | 'png' | 'tiff' | 'eps' | 'pdf' | 'webp' | 'svg'

		// An export format associated with a layer.
		class ExportFormat extends WrappedObject {

			// The file format of the export.
			fileFormat: fileFormatOptions

			// The prefix added to the file name.
			prefix: string | undefined

			// The suffix added to the file name.
			suffix: string | undefined

			// The size of the export. Valid values include 2x, 100w, 100width, 100px, 300h, 300height.
			size: string

		}

		// A utility class to represent the layers selection. Contains some methods to make interacting with a selection easier.
		class Selection {

			// The Layers in the selection. Setting this property will change the selection.
			layers: Layer[] | any

			// The number of Layers in the selection.
			readonly length: number

			// Does the selection contain any layers?
			readonly isEmpty: boolean

			// Even though a selection isn’t an array, it defines map, forEach and reduce by just forwarding the arguments to its layers. Those are just convenience methods to avoid getting the layers every time.

			forEach(action:(layer: Layer) => void):void

			map(action:(layer: Layer) => void): Layer[]

			reduce(action:(initial: number, layer: Layer) => number): number

			// Clears the selection. Return the selection (useful if you want to chain the calls).
			clear(): Selection

		}

		type CGPoint = object

		type NSPoint = object

		// A utility class to represent a point.
		class Point {

			// The x coordinate of the point.
			x: number | Point

			// The y coordinate of the point.
			y: number

			// Return the Point as a CGPoint.
			asCGPoint(): CGPoint

			// Return the Point as a NSPoint.
			asNSPoint(): NSPoint
		}

		enum PointType {
			Undefined,
			Straight,
			Mirrored,
			Asymmetric,
			Disconnected,
			Rounded
		}

		// A utility class to represent a curve point (with handles to control the curve in a path).
		class CurvePoint extends WrappedObject {

			// The position of the point.
			point:Point

			// The position of the handle control point for the incoming path.
			curveFrom: Point

			// The position of the handle control point for the outgoing path.
			curveTo: Point

			// The corder radius of the point.
			cornerRadius:number

			// The type of the point.
			pointType: PointType

			// In case the user is currently editing a path, you can check if a curve point is selected using the curvePoint.isSelected() method.
			isSelected(): boolean

		}

		// Both from and to can be omitted (but not at the same time) to change the basis from/to the Page coordinates.
		interface ChangeBasisOptions {

			// The layer in which the rectangle’s coordinates are expressed.
			from?: Layer

			// The layer in which the rectangle’s coordinates will be expressed.
			to?: Layer
		}

		type CGRect = object

		type NSRect = object

		// A utility class to represent a rectangle. Contains some methods to make interacting with a rectangle easier.
		class Rectangle {

			constructor(x:number, y:number, width:number, height:number)

			constructor(rect:Rectangle)

			// The x coordinate of the top-left corner of the rectangle. Or an object with {x, y, width, height}
			x: number | Rectangle

			// The y coordinate of the top-left corner of the rectangle.
			y: number

			// The width of the rectangle.
			width: number

			// The height of the rectangle.
			height: number

			// Adjust the rectangle by offsetting it. Return this rectangle (useful if you want to chain the calls).
			offset(x:number, y:number): Rectangle

			// Adjust the rectangle by scaling it. The scaleHeight argument can be omitted to apply the same factor on both the width and the height. Return this rectangle (useful if you want to chain the calls).
			scale(scaleWidth:number, scaleHeight:number):Rectangle

			// Each layer defines its own system of coordinates (with its origin at the top left of the layer). You can change that basis from one layer to the other with changeBasis.
			changeBasis(change:ChangeBasisOptions):void

			// Return the Rectangle as a CGRect.
			asCGRect():CGRect

			// Return the Rectangle as a NSRect.
			asNSRect():NSRect

		}

		// Wrapper classes that are used to represent reusable assets retrieved from a document or globally.

		class Asset extends WrappedObject {

			// The name of the asset, or null.
			name: string | null

		}

		interface GlobalAssets {
			colors?: ColorAsset[]
			gradients?: GradientAsset[]
		}

		class ColorAsset extends Asset {

			// The hex string for the color.
			color: string

		}

		class GradientAsset extends Asset {

			// The hex string for the color.
			gradient: Gradient

		}

		// The transformation applied to the Layer.
		interface Transform {

			// The rotation of the Layer in degrees, clock-wise.
			rotation?: number

			// If the layer is horizontally flipped.
			flippedHorizontally?: boolean

			// If the layer is vertically flipped.
			flippedVertically?: boolean

		}

		// A Sketch layer. This is the base class for most of the Sketch components and defines methods to manipulate them.
		export class Layer extends WrappedObject {

			// The unique ID of the Layer.
			id: string

			// The name of the Layer
			name: string

			// The group the layer is in.
			parent: Group

			// If the layer is locked.
			locked: boolean

			// If the layer is hidden.
			hidden: boolean

			// The frame of the Layer. This is given in coordinates that are local to the parent of the layer.
			frame: Rectangle

			// If the layer is selected.
			selected: boolean

			// The prototyping action associated with the layer.
			flow: Flow

			// The export formats of the Layer.
			exportFormats: ExportFormat[]

			// The transformation applied to the Layer.
			transform: Transform

			// A new identical layer will be inserted into the parent of this layer. Returns A new Layer.
			duplicate(): Layer

			// Remove this layer from its parent. Returns The current layer (useful if you want to chain the calls).
			remove():Layer

			// Get the position in the hierarchy . The index of this layer in its parent. The layer at the back of the parent (visually) will be layer 0. The layer at the front will be layer n - 1 (if there are n layers).
			index: number

			// You can set the index of the layer to move it in the hierarchy. Move this layer to the front of its parent. Returns The current layer (useful if you want to chain the calls).
			moveToFront(): Layer

			// Move this layer forward in its parent. Returns The current layer (useful if you want to chain the calls).
			moveForward(): Layer

			// Move this layer to the back of its parent. Returns The current layer (useful if you want to chain the calls).
			moveToBack(): Layer

			// Move this layer backward in its parent. Returns The current layer (useful if you want to chain the calls).
			moveBackward(): Layer

			// access the page the layer is in
			getParentPage(): Page | undefined

			// access the artboard the layer is in (if any)
			getParentArtboard(): Artboard

			// access the symbol master the layer is in (if any)
			getParentSymbolMaster(): SymbolMaster | undefined

			// access the shape the layer is in (if any)
			getParentShape(): Shape | undefined

		}

		class StyledLayer extends Layer {

			// The style of the Layer.
			style: Style

			// The ID of the SharedStyle this layer is linked to if any.
			sharedStyleId: string | null

			// returns shared style
			sharedStyle: SharedStyle | null

		}

		// A group of layers. It is also an instance of Layer so all the methods defined there are available.
		class Group extends StyledLayer {

			constructor(opts?:object)

			// The transformation applied to the Group.
			transform: Transform


			// The layers that this component groups together.
			layers: Layer[]

			// Adjust the group to fit its children. Returns The current group (useful if you want to chain the calls).
			adjustToFit(): Group

		}

		// A Sketch page. It is an instance of both Layer and Group so all the methods defined there are available.
	  class Page extends Group {

			constructor(name?:string)

			// A method to get the Symbols Page of a Document.
			static getSymbolsPage(doc: Document): Page | undefined

			// A method to create the Page with the name that Sketch will recognize as the Symbols Page.
			static createSymbolsPage(): Page

			// A method to tell if the page is the Symbols Page.
			isSymbolsPage(): boolean

	  }

		// The background of the Artboard
		interface Background {

			// If the background should be enabled, eg. shown or not
			enabled: boolean

			// If the background should be exported or if it should be transparent during the export
			includedInExport: boolean

			// The rgba representation of the color of the background
			color: string

		}

		// A Sketch artboard. It is an instance of both Layer and Group so all the methods defined there are available.
		class Artboard extends Group{

			constructor(opts?:object)

			// A Start Point allows you to choose where to start your prototype from.
			flowStartPoint: boolean

			// The background of the Artboard
			background: Background

		}

		// A shape layer. It is an instance of Layer so all the methods defined there are available. It is shaped by its layers which have boolean operations between them.
		class Shape extends Group {

			constructor(opts?:object)

			// The style of the Shape.
			style: Style

			// The ID of the SharedStyle this Shape is linked to if any.
			sharedStyleId: string | null

		}

		// An ImageData is a wrapper around a native NSImage. You can access the native NSImage with nsimage or a native NSData representation of the image with nsdata.

		interface ImageData {
			nsimage: object
			nsdata: object
		}

		// An image layer. It is an instance of Layer so all the methods defined there are available.
		class Image extends StyledLayer {

			constructor(opts?:object)


			// The actual image of the layer.
			// The image property accept a wide range of input:an ImageData, a Buffer,a native NSImage ,a native NSURL,a native MSImageData,a string: path to the file to load the image from an object with a path property: path to the file to load the image froman object with a base64 string: a base64 encoded image
			image: ImageData

		}

		// Enumeration of the type of Shared Style.
		enum ShapeType {
			Rectangle = 'Rectangle',
		  Oval = 'Oval',
		  Polygon = 'Polygon',
		  Star = 'Star',
		  Triangle = 'Triangle',
		  Custom = 'Custom',
		}

		// A shape path layer. It is an instance of Layer so all the methods defined there are available.
		class ShapePath extends StyledLayer {

			// You can only set the shapeType when creating a new one. Once it is created, the shapeType is read-only. If it is not specified and you do not specify any points, it will default to ShapePath.ShapeType.Rectangle (if you do specify some points, it will default to ShapePath.ShapeType.Custom).
			constructor(opts?:object)

			// The type of the Shape Path. It can only be set when creating a new ShapePath.
			shapeType: ShapeType

			// The points defining the Shape Path.
			points: CurvePoint[]

			// If the Path is closed.
			closed: boolean

			// You can also create a new ShapePath from an SVG path (the string that goes in the d attribute of a path tag in an SVG).
			static fromSVGPath(svgPath:string): ShapePath

			// Returns a string representing the SVG path of the ShapePath.
			getSVGPath():string

		}

		// Enumeration of the line spacing behavior for the text.
		enum LineSpacing {
			// Uses min & max line height on paragraph style
			constantBaseline = 2,

			// Uses MSConstantBaselineTypesetter for fixed line height
			variable = 1
		}

		// Enumeration of the alignments of the text.
		enum Alignment {
			left = 'left', // Visually left aligned
  		right = 'right', // Visually right aligned
  		center = 'center', // Visually centered
  		justified = 'justified', // Fully-justified. The last line in a paragraph is natural-aligned.
  		natural = 'natural', // Indicates the d
		}

		// Enumeration of the vertical alignments of the text.
		enum VerticalAlignment {
			top = 'top', // Visually top aligned
		  center = 'center', // Visually center aligned
		  bottom = 'bottom', // Visually bottom aligned
		}

		// text fragments interface
		interface Fragment {
			rect: Rectangle
			baselineOffset: object
			range: object
			text: string
		}


		class Text extends StyledLayer {

			constructor(opts?:object)

			// The string value of the text layer.
			text: string

			//  The line spacing of the layer.
			lineSpacing: LineSpacing

			// Whether the layer should have a fixed width or a flexible width.
			fixedWidth: boolean

			// text alignment
			alignment:Alignment

			// Adjust the Text to fit its value. Returns The current Text (useful if you want to chain the calls).
			adjustToFit(): Text

			// Returns a array of the text fragments for the text. Each one is a object containing a rectangle, a baseline offset, the range of the fragment, and the substring {rect, baselineOffset, range, text}.
			fragments: Fragment[]

		}

		// A Symbol master. It is an instance of Artboard (hence of Layer and Group) so all the methods defined there are available.
		class SymbolMaster extends Artboard {

			constructor(opts?:object)

			// The unique ID of the Symbol that the master and its instances share.
			symbolId: string

			// The array of the overrides that the instances of the Symbol Master will be able to change.
			overrides: Override[]

			// Create a new Symbol Master from an Artboard
			static fromArtboard(artboard: Artboard): SymbolMaster

			// Replace the symbol master with an artboard and detach all its instances converting them into groups. Returns a new Artboard
			toArtboard():Artboard

			// Creates a new SymbolInstance linked to this master, ready for inserting in the document.
			createNewInstance(): SymbolInstance

			// Returns an array of all instances of the symbol in the document, on all pages.
			getAllInstances(): SymbolInstance[]

			// If the Symbol Master was imported from a library, the method can be used to:know about it or get the library back
			getLibrary():Library | null

			// Sync the local reference with the library version. If a Library has some updates, you can synchronize the local Symbol Master with the Library’s version and bypass the panel where the user chooses the updates to bring. Returns true on success.
			syncWithLibrary():boolean

			// Unlink the local reference from the library. You can unlink a Symbol Master from the Library it comes from and make it a local Symbol Master instead. It will be added to the Symbols Page. Returns true on success.
			unlinkFromLibrary(): boolean

		}

		interface SymbolDetachOptions {
			recursively: boolean
		}

		// A Symbol instance. It is an instance of Layer so all the methods defined there are available.
		class SymbolInstance extends StyledLayer {

			constructor(opts?:object)

			// The unique ID of the Symbol that the instance and its master share.
			symbolId: string

			// The Symbol master that the instance is linked to.
			master: SymbolMaster

			// The array of the overrides to modify the instance.
			overrides: Override[]

			// Detach the instance. Replaces a group that contains a copy of the Symbol this instance refers to. Returns null if the master contains no layers instead of inserting an empty group
			detach(opts?: SymbolDetachOptions): Group | null

			// Set an Override value. Change the value of the override. Returns The current Symbol instance (useful if you want to chain the calls).
			setOverrideValue(override:Override, value: string | object): SymbolInstance

		}

		// A Sketch hotspot. It is an instance of Layer so all the methods defined there are available.
		class Hotspot extends Layer {

			constructor(opts?:object)

			// Create a new Hotspot from a Layer
			static fromLayer(layer:Layer): Hotspot

		}

		// A Sketch slice. It is an instance of Layer so all the methods defined there are available.
		class Slice extends Layer {

			constructor(opts?:object)

		}

	}


declare module "sketch/settings" {

	import {Layer, Override, Document, SymbolInstance} from 'sketch/dom'

	// A set of functions to handle user settings. The settings are persisted when the user closes Sketch.

	// Return the value of a setting scoped to your plugin for a given key. Returns The setting that was stored for the given key. undefined if there was nothing.
	function settingForKey(key: string): any

	// Store a value of a setting scoped to your plugin for a given key.
	function setSettingForKey(key: string, value: any): void

	// Return the value of a Sketch setting for a given key. Returns The setting that was stored for the given key. undefined if there was nothing.
	function globalSettingForKey(key: string): any

	// Store a value of a Sketch setting for a given key.
	function setGlobalSettingForKey(key: string, value: any): void

	// Return the value of a setting for a given key on a specific Layer or DataOverride or Override.
	function layerSettingForKey(layer:Layer | DataOverride | Override, key:string): any

	// Store a value of a setting for a given key on a specific Layer or DataOverride or Override.
	function setLayerSettingForKey(layer:Layer | DataOverride | Override, key:string, value: any):void

	// Return the value of a setting for a given key on a specific document.
	function documentSettingForKey(document:Document, key:string): any

	// Store a value of a setting for a given key on a specific document.
	function setDocumentSettingForKey(document:Document, key:string, value: any): void

	// Get a session variable
	// Return the value of a variable which is persisted when the plugin finishes to run but is not persisted when Sketch closes. It is useful when you want to keep a value between plugin’s runs.
	function sessionVariable(key: string): any

	// Store a value of a variable which is persisted when the plugin finishes to run but is not persisted when Sketch closes. It is useful when you want to keep a value between plugin’s runs.
	function setSessionVariable(key:string, value: any): void

	// A special object passed in the context of the action to supply data when the item is an Override.
	class DataOverride {

		// The name of the override.
		id: string

		// The override whose value will replaced by the supplied data.
		override: Override

		// The symbol instance that the override is on that will have the data replaced.
		symbolInstance: SymbolInstance

	}

}

// A set of functions to show some user interfaces. The set is small on purpose. Any more complex UI should be provided by third party libraries and doesn’t need to be in the core.
declare module "sketch/ui" {

	import {Document} from 'sketch/dom'

	// The enumeration of the different input types.
	enum InputType {
		string = 'string',
	  slider = 'slider',
	  selection = 'selection'
	}

	interface UIInputOptions {
		// The type of the input.
		type?: InputType

		// The initial value of the input.
		initialValue?: string | number

		// The possible choices that the user can make. Only used for a selection input.
		possibleValues?: string []

		// Controls the height of the input field. Only used for a string input. If a value is provided it converts the textfield into a scrollable textarea.
		numberOfLines?: number

		// A function called after the user entered the input. It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined).
		callback?: (err: Error, value: string | number | undefined) => void

	}

	// Show a message
	function message(text:string, document?: Document): void

	// Show an alert
	function alert(title: string, text: string): void

	// Get an input from the user
	function getInputFromUser(message: string, opts?: UIInputOptions): void

	// Get the theme of Sketch
	// Sketch has 2 themes: light and dark. If your plugin has some custom UI, it should support both as well.
	function getTheme(): 'light' | 'dark'

}

// When your plugin supplies some data, don’t forget to set the suppliesData field to true in your manifest.json!
declare module "sketch/DataSupplier" {

	import {SketchNativeObject} from 'sketch/dom'


	// Register some data with a name and a key.
	function registerDataSupplier(dataType: 'public.text' | 'public.image', dataName: string, action: string): void

	interface ContextData {

		// 	A unique key to identify the supply request. You need to pass it to the supply method untouched.
		key:string

		// The array of native model objects for which we want some data. It can be either a native Text, a native Shape or a native DataOverride (a special object when the data is for an Override)
		items: SketchNativeObject[]
	}

	// When a user runs a Data plugin, Sketch will forward the request to your plugin, passing a context.data object with all the information you need to fulfil the request:
	class context {
		data: ContextData
	}

	// When the plugin providing the dynamic data has finished generating the data (could be an asynchronous operation), it will call this function with the data key and the data.
	function supplyData(key: string, data: string[]): void


	// When the plugin providing the dynamic data has finished generating the datum (could be an asynchronous operation), it will call this function with the data key and the datum.
	function supplyDataAtIndex(key: string, datum: string, index: number): void

	// When registering something, it’s good practice to clean up after it. This is specially useful when your plugin is updated: the Shutdown Action will be called before the Startup will. It gives you the opportunity to update your handler cleanly.
	function deregisterDataSuppliers(): void

}

declare module "sketch/async" {

	// A fiber is a way to keep track of a asynchronous task. The script will stay alive as long as at least one fiber is running.
	class Fiber {

		// To end a fiber, call fiber.cleanup(). This will tell Sketch that it can garbage collect the script if no other fiber is running.
		cleanup():void

		// You can run a function when the fiber is about to be cleaned up by setting a callback:
		onCleanup(callback:() => void): void
	}

	function createFiber():Fiber
}
