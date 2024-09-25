jQuery(document).ready(function(){
    jQuery(".skt-blocks-quick-links").click(function(){
        if(jQuery(".skt-blocks-quick-links").hasClass( "skt-blocks-quick-links-close" )) {
            jQuery(".skt-blocks-quick-links").removeClass( "skt-blocks-quick-links-close" );
            jQuery(".skt-blocks-quick-links").addClass( "skt-blocks-quick-links-open" );
        } else {
            jQuery(".skt-blocks-quick-links").addClass( "skt-blocks-quick-links-close" );
            jQuery(".skt-blocks-quick-links").removeClass( "skt-blocks-quick-links-open" );
        }
    }); 

    jQuery(".skt-blocks-welcome-video-image").click(function() {
        if(!jQuery("#welcome-video").length) {
            jQuery(".skt-blocks-welcome-video-image").append( '<div id="welcome-video" class="skt-blocks-welcome-overlay"><div class="skt-blocks-welcome-overlay-inner"><span class="close-video">&#10006;</span><div class="skt-blocks-welcome-overlay-content"><iframe width="700" height="500" src="https://www.youtube.com/embed/Gs-h74Qnrlw?autoplay=1&amp;modestbranding=1&amp;showinfo=0&amp;rel=0&amp;fs=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; autoplay; picture-in-picture;" allowfullscreen="allowfullscreen"></iframe></div></div></div>' );
        } else {
            jQuery(".skt-blocks-welcome-video-image").empty();
        }
    });
});
