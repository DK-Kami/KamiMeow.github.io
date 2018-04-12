$(document).ready(function() {
    $('a[href*=#]').click(function(event) {
        var bot = $('a[name="' + this.href.split("#")[1] + '"]').offset().top;
        $('html, body').animate({ scrollTop: bot }, 'slow');
    });
});