document.addEventListener('DOMContentLoaded', () => {
    function b64_to_utf8( str ) {
        let decodedUrl = decodeURIComponent(str);
        let decodedBase64 = window.atob(decodedUrl);
        return decodedBase64;
    }
    function getSpecificCookie(cookieName,valueOnly) {
        var oCookieArray = document.cookie.split(';'),
            fc,
            cnRE = new RegExp(cookieName + '\=');
        //Loop through cookies
        for (var c = 0; c < oCookieArray.length; c++) {

            //If found save to variable and end loop
            if (cnRE.test(oCookieArray[c])) {
                fc = oCookieArray[c].trim();
                if (valueOnly) {
                    fc = fc.replace(cookieName +'=', '');
                }
                break;
            }

        }
        return fc;
    }
    const userLink = document.getElementById('lg');
    let val = getSpecificCookie("user",true);
    let data = b64_to_utf8(val)
    let jdata = JSON.parse(data);
    let uname = jdata.username
    let id = jdata._id
    if(val){
        userLink.textContent = `${uname}`;
        userLink.href = `/user/${id}`;
    }
});
