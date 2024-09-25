/**
 * Returns Dynamic Generated CSS
 */

function PositionClasses( attributes ) {

	var iconimgStyle_class = ""
	iconimgStyle_class += " skt-blocks-tm__imgicon-style-"+attributes.iconimgStyle+ " "
	iconimgStyle_class += "skt-blocks-tm__image-position-"+attributes.imagePosition+ " "

	if( attributes.imagePosition == "left" || attributes.imagePosition == "right"){
    	iconimgStyle_class += "skt-blocks-tm__image-aligned-"+attributes.imageAlignment+ " "
		if( attributes.stack !== "none" ){
			iconimgStyle_class +="skt-blocks-tm-stacked-"+attributes.stack+ " "
			if( attributes.imagePosition === "right" ){
				iconimgStyle_class += "skt-blocks-tm-reverse-order-"+attributes.stack+ " "
			}
		}
	}

	iconimgStyle_class += "skt-blocks-tm__bg-type-"+attributes.backgroundType+ " "

	return [
		iconimgStyle_class
	]
}

export default PositionClasses
