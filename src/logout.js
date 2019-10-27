require('./themes/default/css/sas.css');
import $ from 'jQuery';
var a=require('./a');
alert(a.square(4));

$(document).on('keydown', function(e)
{
    if (e.keyCode === 27)
    {
        document.location.href = '';
        $('#openModal').hide();
        return false;
    }
});

function setSubmitUrl(form)
    {
        var urlHash = decodeURIComponent(window.location.hash);

        if (urlHash && urlHash.indexOf("#") === -1)
            urlHash = "#" + urlHash;

        form.action = form.action + urlHash;
        return true;
    }

    function are_cookies_enabled()
    {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == "undefined")
        {
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }

        if (!cookieEnabled)
        {
            document.getElementById("nocookie-message").setAttribute("aria-hidden", "false");
            var username = document.getElementById("username");
            username.setAttribute("aria-labelledby", username.getAttribute("aria-labelledby") + " nocookie-message");
            $('#nocookie-message').show();
        }
    }

    $(document).ready(function()
    {
        are_cookies_enabled();
    });

    function modality()
    {
        switch(location.hash)
        {
            case "#openModal" :
                $('#nonModal :input').attr('disabled', true);
                document.getElementById("nonModal").setAttribute("aria-hidden","true");
                document.getElementById("openModal").setAttribute("aria-hidden","false");
                break;
            default :
                $('#nonModal :input').attr('disabled', false);
                document.getElementById("nonModal").setAttribute("aria-hidden","false");
                document.getElementById("openModal").setAttribute("aria-hidden","true");
                break;
        }
    }
    window.onhashchange = modality;
    modality();