document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('names');
    const userLink = document.getElementById('lg');
    const form = document.getElementById('memberForm');
    const button = document.getElementById('button');

    function addNewDiv(data) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `<p>${data.id}</p><p>${data.gy}</p><a id="new" href="#">${data.name}</a>`;
        container.appendChild(newDiv);
    }

    function getData(event) {
        event.preventDefault(); 

        const memberName = form.elements['member'].value;
        const id = form.elements['mid'].value;
        const gy = form.elements['gy'].value;
        const data = { "name": memberName, "id": id, "gy": gy };

        addNewDiv(data);
        form.reset();
    }

    function b64d(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    function sCookie(cookieName, valueOnly) {
        const allCookie = document.cookie.split(';');
        const cnRE = new RegExp(cookieName + '=');

        for (const cookie of allCookie) {
            if (cnRE.test(cookie)) {
                let fc = cookie.trim();
                if (valueOnly) {
                    fc = fc.replace(cookieName + '=', '');
                }
                return fc;
            }
        }
        return null;
    }

    function updateUserLink() {
        const val = sCookie("user", true);
        if (val) {
            const data = b64d(val);
            const jdata = JSON.parse(data);
            userLink.textContent = jdata.username;
            userLink.href = `/user/${jdata._id}`;
            button.style.display = jdata.is_admin ? "flex" : "none";
        }
    }

    function openForm() {
        document.getElementById("mform").style.display = "flex";
        container.style.display = "none";
        button.style.display = "none";
    }

    function closeForm() {
        document.getElementById("mform").style.display = "none";
        container.style.display = "flex";
        button.style.display = "flex";
    }

    // function customAlertHandler(message) {
    //     confirm(message);
    // }

    // window.alert = async function(message) {
    //     const url = '/alert';
        
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ message })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json(); 
    //         customAlertHandler(data.flag); 

    //     } catch (error) {
    //         console.error('Error:', error); 
    //     }
    // };

    form.addEventListener('submit', getData);
    updateUserLink();

    window.openForm = openForm;
    window.closeForm = closeForm;
});
