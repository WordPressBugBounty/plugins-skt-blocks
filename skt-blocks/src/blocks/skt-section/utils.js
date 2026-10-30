/**
 * Shared style + class builders for the SKT Section block.
 * Used by BOTH edit.js and save.js so the editor preview and the frontend
 * output always match.
 */

/**
 * Build the inline style object for the section wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object} React style object (may include CSS custom properties).
 */
export function getSectionStyles(attributes) {
	const {
		flexDirection,
		justifyContent,
		alignItems,
		flexWrap,
		columnGap,
		rowGap,
		backgroundType,
		backgroundColor,
		gradientColor,
		backgroundImageUrl,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundAttachment,
		overlayType,
		overlayColor,
		overlayGradient,
		overlayOpacity,
		flexGrow,
		flexBasis,
		flexBasisUnit,
		widthType,
		widthValue,
		widthUnit,
		zIndex,
		borderStyle,
		borderColor,
		borderWidth,
		borderRadius,
		boxShadowEnable,
		boxShadowColor,
		boxShadowH,
		boxShadowV,
		boxShadowBlur,
		boxShadowSpread,
		textColor,
		linkColor,
		linkHoverColor,
		backdropEnable,
		backdropBlur,
		backdropBrightness,
		backdropContrast,
		backdropSaturate,
		backdropGrayscale,
		stickyEnable,
		stickyOffset,
		minHeight,
		minHeightUnit,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		marginTop,
		marginBottom,
		paddingUnit,
		marginUnit,
		textAlign,
		backdropHueRotate,
		backdropInvert,
		backdropSepia,
	} = attributes;

	const pu = paddingUnit || "px";
	const mu = marginUnit || "px";

	const styles = {
		display: "flex",
		flexDirection: flexDirection || "column",
		justifyContent: justifyContent || "flex-start",
		alignItems: alignItems || "stretch",
		flexWrap: flexWrap || "nowrap",
		columnGap:
			typeof columnGap === "number" ? `${columnGap}px` : undefined,
		rowGap: typeof rowGap === "number" ? `${rowGap}px` : undefined,
		paddingTop:
			typeof paddingTop === "number" ? `${paddingTop}${pu}` : undefined,
		paddingRight:
			typeof paddingRight === "number"
				? `${paddingRight}${pu}`
				: undefined,
		paddingBottom:
			typeof paddingBottom === "number"
				? `${paddingBottom}${pu}`
				: undefined,
		paddingLeft:
			typeof paddingLeft === "number"
				? `${paddingLeft}${pu}`
				: undefined,
		marginTop:
			typeof marginTop === "number" ? `${marginTop}${mu}` : undefined,
		marginBottom:
			typeof marginBottom === "number"
				? `${marginBottom}${mu}`
				: undefined,
	};

	if (typeof minHeight === "number") {
		styles.minHeight = `${minHeight}${minHeightUnit || "px"}`;
	}

	// Flex grow (useful when this section is nested inside another flex section).
	if (typeof flexGrow === "number" && flexGrow > 0) {
		styles.flexGrow = flexGrow;
	}

	// Flex basis (starting size of this section when nested in a flex row).
	if (flexBasisUnit === "auto") {
		styles.flexBasis = "auto";
	} else if (typeof flexBasis === "number") {
		styles.flexBasis = `${flexBasis}${flexBasisUnit || "px"}`;
	}

	// Width (column behaviour inside a horizontal Flex Block).
	if (widthType === "fill") {
		styles.flexGrow = 1;
		styles.flexShrink = 1;
		styles.flexBasis = 0;
	} else if (widthType === "custom" && typeof widthValue === "number") {
		const wu = widthUnit || "%";
		styles.flexGrow = 0;
		styles.flexShrink = 0;
		styles.flexBasis = `${widthValue}${wu}`;
		styles.maxWidth = `${widthValue}${wu}`;
		styles.width = `${widthValue}${wu}`;
	}

	// Z-index (flex items honour z-index without needing position).
	if (typeof zIndex === "number") {
		styles.zIndex = zIndex;
	}

	// Sticky offset (position:sticky is applied via a class in CSS so it can be
	// limited by breakpoint and disabled inside the editor).
	if (stickyEnable) {
		styles["--skt-sticky-offset"] =
			`${typeof stickyOffset === "number" ? stickyOffset : 0}px`;
	}

	// Border.
	if (borderStyle && borderStyle !== "none") {
		styles.borderStyle = borderStyle;
		styles.borderWidth =
			typeof borderWidth === "number" ? `${borderWidth}px` : "1px";
		if (borderColor) {
			styles.borderColor = borderColor;
		}
	}

	if (typeof borderRadius === "number" && borderRadius > 0) {
		styles.borderRadius = `${borderRadius}px`;
	}

	// Box shadow.
	if (boxShadowEnable) {
		const h = typeof boxShadowH === "number" ? boxShadowH : 0;
		const v = typeof boxShadowV === "number" ? boxShadowV : 4;
		const blur = typeof boxShadowBlur === "number" ? boxShadowBlur : 12;
		const spread =
			typeof boxShadowSpread === "number" ? boxShadowSpread : 0;
		const color = boxShadowColor || "rgba(0, 0, 0, 0.2)";
		styles.boxShadow = `${h}px ${v}px ${blur}px ${spread}px ${color}`;
	}

	// Backdrop filter (works on transparent / semi-transparent sections that
	// have content behind them).
	if (backdropEnable) {
		const parts = [];
		if (typeof backdropBlur === "number" && backdropBlur > 0) {
			parts.push(`blur(${backdropBlur}px)`);
		}
		if (
			typeof backdropBrightness === "number" &&
			backdropBrightness !== 100
		) {
			parts.push(`brightness(${backdropBrightness}%)`);
		}
		if (
			typeof backdropContrast === "number" &&
			backdropContrast !== 100
		) {
			parts.push(`contrast(${backdropContrast}%)`);
		}
		if (
			typeof backdropSaturate === "number" &&
			backdropSaturate !== 100
		) {
			parts.push(`saturate(${backdropSaturate}%)`);
		}
		if (
			typeof backdropGrayscale === "number" &&
			backdropGrayscale > 0
		) {
			parts.push(`grayscale(${backdropGrayscale}%)`);
		}
		if (typeof backdropHueRotate === "number" && backdropHueRotate !== 0) {
			parts.push(`hue-rotate(${backdropHueRotate}deg)`);
		}
		if (typeof backdropInvert === "number" && backdropInvert > 0) {
			parts.push(`invert(${backdropInvert}%)`);
		}
		if (typeof backdropSepia === "number" && backdropSepia > 0) {
			parts.push(`sepia(${backdropSepia}%)`);
		}

		if (parts.length) {
			const value = parts.join(" ");
			styles.backdropFilter = value;
			styles.WebkitBackdropFilter = value;
		}
	}

	// Background.
	if (backgroundType === "color" && backgroundColor) {
		styles.backgroundColor = backgroundColor;
	} else if (backgroundType === "gradient" && gradientColor) {
		styles.backgroundImage = gradientColor;
	} else if (backgroundType === "image" && backgroundImageUrl) {
		styles.backgroundImage = `url(${backgroundImageUrl})`;
		styles.backgroundPosition = backgroundPosition || "center center";
		styles.backgroundSize = backgroundSize || "cover";
		styles.backgroundRepeat = backgroundRepeat || "no-repeat";
		styles.backgroundAttachment = backgroundAttachment || "scroll";
	}

	// Typography colors.
	if (textColor) {
		styles.color = textColor;
	}
	if (linkColor) {
		styles["--skt-section-link"] = linkColor;
	}
	if (linkHoverColor) {
		styles["--skt-section-link-hover"] = linkHoverColor;
	}

	// Overlay (rendered via a ::before layer in CSS that reads these vars).
	if (overlayType === "color" && overlayColor) {
		styles["--skt-section-overlay"] = overlayColor;
		styles["--skt-section-overlay-opacity"] =
			(typeof overlayOpacity === "number" ? overlayOpacity : 50) / 100;
	} else if (overlayType === "gradient" && overlayGradient) {
		styles["--skt-section-overlay"] = overlayGradient;
		styles["--skt-section-overlay-opacity"] =
			(typeof overlayOpacity === "number" ? overlayOpacity : 100) / 100;
	}

	if (textAlign) {
		styles.textAlign = textAlign;
	}

	return styles;
}

/**
 * Build the className string for the section wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Space-separated class names.
 */
export function getSectionClassNames(attributes) {
	const {
		overlayType,
		overlayColor,
		overlayGradient,
		linkColor,
		linkHoverColor,
		hideDesktop,
		hideTablet,
		hideMobile,
		stickyEnable,
		stickyBreakpoint,
		overlayLinkEnable,
		overlayLinkUrl,
	} = attributes;

	const hasOverlay =
		(overlayType === "color" && overlayColor) ||
		(overlayType === "gradient" && overlayGradient);

	const classes = ["skt-section"];
	if (hasOverlay) {
		classes.push("has-skt-overlay");
	}
	if (linkColor) {
		classes.push("has-skt-link-color");
	}
	if (linkHoverColor) {
		classes.push("has-skt-link-hover");
	}
	if (hideDesktop) {
		classes.push("skt-hide-desktop");
	}
	if (hideTablet) {
		classes.push("skt-hide-tablet");
	}
	if (hideMobile) {
		classes.push("skt-hide-mobile");
	}
	if (stickyEnable) {
		classes.push("skt-sticky");
		classes.push(`skt-sticky-${stickyBreakpoint || "always"}`);
	}
	if (overlayLinkEnable && overlayLinkUrl) {
		classes.push("has-skt-overlay-link");
	}
	if (attributes.uniqueId &&
		(hasResponsiveSpacing(attributes) ||
			hasHoverStyles(attributes) ||
			typeof attributes.mobileOrder === "number" ||
			(attributes.dynamicBgSource &&
				attributes.dynamicBgSource !== "none"))) {
		classes.push(`skt-section-${attributes.uniqueId}`);
	}

	return classes.join(" ");
}

/**
 * True when any tablet/mobile spacing override is set.
 *
 * @param {Object} attributes Block attributes.
 * @return {boolean}
 */
export function hasResponsiveSpacing(attributes) {
	const keys = [
		"paddingTopTablet",
		"paddingRightTablet",
		"paddingBottomTablet",
		"paddingLeftTablet",
		"paddingTopMobile",
		"paddingRightMobile",
		"paddingBottomMobile",
		"paddingLeftMobile",
		"marginTopTablet",
		"marginBottomTablet",
		"marginTopMobile",
		"marginBottomMobile",
	];
	return keys.some((k) => typeof attributes[k] === "number");
}

function spacingDeclsForDevice(attributes, suffix, pu, mu) {
	const decls = [];
	const push = (prop, key, unit) => {
		const v = attributes[key];
		if (typeof v === "number") {
			decls.push(`${prop}:${v}${unit}!important`);
		}
	};
	push("padding-top", `paddingTop${suffix}`, pu);
	push("padding-right", `paddingRight${suffix}`, pu);
	push("padding-bottom", `paddingBottom${suffix}`, pu);
	push("padding-left", `paddingLeft${suffix}`, pu);
	push("margin-top", `marginTop${suffix}`, mu);
	push("margin-bottom", `marginBottom${suffix}`, mu);
	return decls.join(";");
}

/**
 * Build the responsive (tablet/mobile) spacing CSS for one block instance.
 * Desktop spacing stays inline (backward compatible); only tablet/mobile go here.
 *
 * @param {Object} attributes Block attributes (needs uniqueId).
 * @return {string} CSS text (empty when nothing to output).
 */
export function getResponsiveSpacingCSS(attributes) {
	const { uniqueId } = attributes;
	if (!uniqueId || !hasResponsiveSpacing(attributes)) {
		return "";
	}

	const pu = attributes.paddingUnit || "px";
	const mu = attributes.marginUnit || "px";
	const selector = `.wp-block-skt-blocks-skt-section.skt-section-${uniqueId}`;

	let css = "";

	const tablet = spacingDeclsForDevice(attributes, "Tablet", pu, mu);
	if (tablet) {
		css += `@media (max-width:1024px){${selector}{${tablet}}}`;
	}

	const mobile = spacingDeclsForDevice(attributes, "Mobile", pu, mu);
	if (mobile) {
		css += `@media (max-width:767px){${selector}{${mobile}}}`;
	}

	return css;
}

export function hasHoverStyles(attributes) {
	const {
		backgroundHoverType,
		backgroundHoverColor,
		gradientHoverColor,
		borderHoverColor,
		textHoverColor,
		boxShadowHoverEnable,
	} = attributes;
	return !!(
		(backgroundHoverType === "color" && backgroundHoverColor) ||
		(backgroundHoverType === "gradient" && gradientHoverColor) ||
		borderHoverColor ||
		textHoverColor ||
		boxShadowHoverEnable
	);
}

export function getHoverCSS(attributes) {
	const {
		uniqueId,
		backgroundHoverType,
		backgroundHoverColor,
		gradientHoverColor,
		borderHoverColor,
		textHoverColor,
		boxShadowHoverEnable,
		boxShadowHoverColor,
		boxShadowHoverH,
		boxShadowHoverV,
		boxShadowHoverBlur,
		boxShadowHoverSpread,
	} = attributes;
	if (!uniqueId || !hasHoverStyles(attributes)) {
		return "";
	}
	const sel = `.wp-block-skt-blocks-skt-section.skt-section-${uniqueId}:hover`;
	const decls = [];
	if (backgroundHoverType === "color" && backgroundHoverColor) {
		decls.push(`background-color:${backgroundHoverColor}!important`);
	}
	if (backgroundHoverType === "gradient" && gradientHoverColor) {
		decls.push(`background-image:${gradientHoverColor}!important`);
	}
	if (borderHoverColor) {
		decls.push(`border-color:${borderHoverColor}!important`);
	}
	if (textHoverColor) {
		decls.push(`color:${textHoverColor}!important`);
	}
	if (boxShadowHoverEnable) {
		const h = typeof boxShadowHoverH === "number" ? boxShadowHoverH : 0;
		const v = typeof boxShadowHoverV === "number" ? boxShadowHoverV : 8;
		const blur = typeof boxShadowHoverBlur === "number" ? boxShadowHoverBlur : 20;
		const spread =
			typeof boxShadowHoverSpread === "number" ? boxShadowHoverSpread : 0;
		const color = boxShadowHoverColor || "rgba(0, 0, 0, 0.2)";
		decls.push(`box-shadow:${h}px ${v}px ${blur}px ${spread}px ${color}!important`);
	}
	if (!decls.length) {
		return "";
	}
	return `${sel}{${decls.join(";")}}`;
}

export function getMobileOrderCSS(attributes) {
	const { uniqueId, mobileOrder } = attributes;
	if (!uniqueId || typeof mobileOrder !== "number") {
		return "";
	}
	const sel = `.wp-block-skt-blocks-skt-section.skt-section-${uniqueId}`;
	return `@media (max-width:767px){${sel}{order:${mobileOrder}}}`;
}

export function getSectionCSS(attributes) {
	return (
		getResponsiveSpacingCSS(attributes) +
		getHoverCSS(attributes) +
		getMobileOrderCSS(attributes)
	);
}
