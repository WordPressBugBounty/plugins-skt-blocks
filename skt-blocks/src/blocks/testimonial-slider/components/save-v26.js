/**
 * BLOCK: Testimonial - Save Block
 */

import classnames from "classnames"
import AuthorName from "./AuthorName"
import Company from "./Company"
import Description from "./Description"
import PositionClasses from "../classes"
import TestimonialImage from "./Image"
import Style from "style-it";

const { Fragment } = wp.element
const { RichText } = wp.blockEditor

export default function save( props ) {
	const {
		block_id,
		className,
		columns,
		autoplaySpeed,
		autoplay,
		infiniteLoop,
		pauseOnHover,
		transitionSpeed,
		tcolumns,
		arrowSize,
		mcolumns,
		test_block,
		imagePosition,
        imageWidth,
        arrowDots,
        arrowBorderSize,
        arrowBorderRadius,
        arrowColor,
        rowGap,
        columnGap,
        backgroundColor,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        backgroundImageColor,
        backgroundOpacity,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        contentPadding,
        headingAlign,
        imgHrPadding,
        imgVrPadding,
		skin,
        bubbleColor,
        bubblePadding,
        bubbleBorderRadius,
        slicksettings
	} = props.attributes

    var position = backgroundPosition.replace( "-", " " )
    let backopacity = backgroundOpacity? (100 - backgroundOpacity) / 100:0.5;
    function NextArrow( props ) {
        return (
            <button type="button" data-role="none" className="slick-next slick-arrow" aria-label="Next" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
    <Dashicon
        icon="arrow-right-alt2"
        height={arrowSize}
        width={arrowSize}
        /></button>
    )
    }

    function PrevArrow( props ) {
        return (
            <button type="button" data-role="none" className="slick-prev slick-arrow" aria-label="Previous" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
    <Dashicon
        icon="arrow-left-alt2"
        height={arrowSize}
        width={arrowSize}
        /></button>
    )
    }
    let dots = ( "dots" == arrowDots || "arrows_dots" == arrowDots ) ? true : false
    let arrows = ( "arrows" == arrowDots || "arrows_dots" == arrowDots ) ? true : false

    const settings = {
        slidesToShow : columns,
        slidesToScroll : 1,
        autoplaySpeed : autoplaySpeed,
        autoplay : autoplay,
        infinite : infiniteLoop,
        pauseOnHover : pauseOnHover,
        speed : transitionSpeed,
        arrows : arrows,
        dots : dots,
        rtl : false,
        draggable: false,
        nextArrow: <NextArrow arrowSize={arrowSize}/>,
    prevArrow: <PrevArrow arrowSize={arrowSize}/>,
    responsive : [
        {
            breakpoint : 1024,
            settings : {
                slidesToShow : tcolumns,
                slidesToScroll : 1,
            }
        },
        {
            breakpoint : 767,
            settings : {
                slidesToShow : mcolumns,
                slidesToScroll : 1,
            }
        }
    ]
}
	return (
		<Fragment>
        <Style>
        {`
        .skt-blocks-slick-carousel.skt-blocks-block-${block_id} button.slick-arrow {
            border-width: ${arrowBorderSize}px;
            border-radius: ${arrowBorderRadius}px;
            border-color: ${arrowColor};
            }
            .skt-blocks-slick-carousel.skt-blocks-block-${block_id} ul.slick-dots li button:before, ul.slick-dots li.slick-active button:before {
             color: ${arrowColor};
            }
            .skt-blocks-slick-carousel.skt-blocks-block-${block_id} .slick-arrow svg {
             fill: ${arrowColor};
             height: ${arrowSize}px;
             width: ${arrowSize}px;
            }
            .skt-blocks-tm__image img{
            width: ${imageWidth}px;
            max-width: ${imageWidth}px;
            }
            .skt-blocks-testimonial__wrap.skt-blocks-tm__bg-type-color .skt-blocks-tm__content{
            background-color: ${backgroundColor};
            }
            .skt-blocks-testimonial__wrap.skt-blocks-tm__bg-type-image .skt-blocks-tm__content{
            background-image: url(${backgroundImage?backgroundImage.url:null});
            background-position: ${position};
            background-repeat: ${backgroundRepeat};
            background-size: ${backgroundSize};
            }
            .skt-blocks-testimonial__wrap.skt-blocks-tm__bg-type-image .skt-blocks-tm__overlay{
            background-color: ${backgroundImageColor};
            opacity: ${backopacity};
            }
            .skt-blocks-testimonial__wrap {
            	padding-left: ${columnGap / 2}px;
                padding-right: ${columnGap / 2}px;
                margin-bottom: ${rowGap}px;
            }
            .skt-blocks-testimonial__wrap .skt-blocks-tm__image-content {
            padding-left: ${imgHrPadding}px;
                padding-right: ${imgHrPadding}px;
                padding-top: ${imgVrPadding}px;
                padding-bottom: ${imgVrPadding}px;
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-tm__desc {
            padding: ${bubblePadding}px;
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-testinomial-text-wrap:before {
            border-top: 10px solid ${bubbleColor};
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-testinomial-text-wrap {
            background-color: ${bubbleColor};
            border-radius: ${bubbleBorderRadius}px;
            }
            `}
</Style>
			<div className={ classnames(
				className,
				"skt-blocks-testomonial__outer-wrap skt-blocks-slick-carousel skt-blocks-tm__arrow-outside",
				`skt-blocks-block-${block_id}`
			) }
			>
	{settings}
				<div
					className={ classnames(
						"is-carousel",
						`skt-blocks-tm__columns-${ columns }`,
						"skt-blocks-tm__items",
						"responsive-testimonial-slick-carousel",
                        `skt-blocks-block-${block_id}`
					) }
					dataSlick={settings}
				>
					{ test_block.map( ( test, index ) =>

						<div className = { classnames(
							"skt-blocks-testimonial__wrap",
							...PositionClasses( props.attributes ),
						) } key ={ "wrap-"+index } >
							<div className = { classnames("skt-blocks-tm__content", `skin-type-${skin}`, `${headingAlign}-aligned`) } key ={ "tm_content-"+index }
							style={{borderStyle: borderStyle,
									borderWidth: borderWidth,
									borderRadius: borderRadius,
									borderColor: borderColor,
									padding: contentPadding,
									textAlign: headingAlign,
									}}
							>
								<div className = "skt-blocks-tm__overlay"></div>
								{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }

								<div className ="skt-blocks-tm__text-wrap">
									{  // Get description.
										<Fragment>
											<div className = "skt-blocks-testinomial-text-wrap" key={"text-wrap-"+index}>
												<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
											</div>
										</Fragment>
									}
									<div className ="skt-blocks-tm__meta">
										<div className ="skt-blocks-tm__meta-inner">

											{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }

											{ //title_text
												<Fragment>
													<div className = "skt-blocks-testimonial-details" key={"tm_wraps-"+index}>
                                                { ( imagePosition == "stacked" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
												<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
														<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
										</div>
									</div>
								</div>
								{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	)
}
