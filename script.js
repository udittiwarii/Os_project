const time = document.querySelector('.time');
const date = document.querySelector('.date');
const wifi = document.querySelector('.showwifi');
const wifiopen = document.querySelector('.wifi');
const showmenu = document.querySelector('.showmenu');
const clickmenu = document.querySelectorAll('.clickmenu');
const shownnotification = document.querySelector('.shownnotification');
const clickshownnotification = document.querySelector('.clickshownnotification');
const controlcalen = document.querySelector('.calendar');
const clickcalneder = document.querySelector('.openclender');
const focutoggle = document.querySelector('.focustoggle');
const clickfocustoggle = document.querySelector('.clickfocustoggle');
const closeclock = document.querySelector('.closeclock');
const Openfullclock = document.querySelector('.Openfullclock');
const focusUi = document.querySelector('.focus-ui');
const cancleapp = document.querySelector('.cancle');
const brightnessCon = document.querySelector('.brightness-controll');
const wrapper = document.getElementById('brightness-wapper');
const hover = document.querySelector('.brightness-hover');
const CalenDate = document.querySelector('#calendar-days');
const premonth = document.querySelector('#prev-month');
const nextmonth = document.querySelector('#next-month');
const setdate = document.querySelector('#month-name');
const setuperdate = document.querySelector('.month-clen');
const monthDisplay = document.querySelector('.claendar .text-sm');
const timerfix = document.querySelector('.timer-fix');
const dectimer = document.querySelector('.dectimer');
const inctimer = document.querySelector('.inctimer');
const clocktimer = document.querySelector('.clocktimer');
const focustimedisplay = document.querySelector('.focus-time-display');
const focusPauseBtn = document.getElementById('focus-pause');
const focusRestartBtn = document.getElementById('focus-restart');
const pannelcontrol = document.querySelector('.panel-section');
const panels = document.querySelectorAll('.panel');
const wifiopens = document.querySelector('.box');
const changeconditionwifi = document.querySelector('.changeconditionwifi')
const realwifi = document.getElementById('11')
const bluetooth = document.getElementById('22')
const aroplane = document.getElementById('33')
const saver = document.getElementById('44')
const wifimode = document.getElementById('55')
const accessiblity = document.getElementById('66')
const darkModeToggle = document.querySelector('#darkModeToggle')
const lightModeToggle = document.querySelector('#lightModeToggle')
const studyModeToggle = document.querySelector('#studyModeToggle')
const nightModeToggle = document.querySelector('#nightModeToggle')
const bluetoothonly = document.querySelector('#bluetoothonly')
const wifionly = document.querySelector('#wifionly')


if (localStorage.getItem('Theme') == 'dark') {
    document.documentElement.classList.add('dark');
    darkModeToggle.checked = true;
    lightModeToggle.checked = false;

} else {
    document.documentElement.classList.remove('dark');
    darkModeToggle.checked = false;
    lightModeToggle.checked = true;

}
darkModeToggle.addEventListener('click', () => {
    if (darkModeToggle.checked) {
        document.documentElement.classList.add('dark');
        lightModeToggle.checked = false
        localStorage.setItem('Theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('Theme', 'light')
        lightModeToggle.checked = true;

    }

})
lightModeToggle.addEventListener('click', () => {
    if (lightModeToggle.checked) {
        document.documentElement.classList.remove('dark');
        darkModeToggle.checked = false
        localStorage.setItem('Theme', 'light')
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('Theme', 'dark')
        darkModeToggle.checked = true;

    }

})
if (localStorage.getItem('StudyMode') === 'on') {
    wrapper.style.filter = 'sepia(0.2) brightness(0.85) contrast(0.9) saturate(0.8)';
    wrapper.style.transition = 'filter 0.3s ease';
    studyModeToggle.checked = true;
} else {
    wrapper.style.filter = 'none';
    studyModeToggle.checked = false;
}

studyModeToggle.addEventListener('click', () => {
    if (studyModeToggle.checked) {
        wrapper.style.filter = 'sepia(0.2) brightness(0.85) contrast(0.9) saturate(0.8)';
        wrapper.style.transition = 'filter 0.3s ease';
        localStorage.setItem('StudyMode', 'on');
    } else {
        wrapper.style.filter = 'none';
        localStorage.setItem('StudyMode', 'off');
    }
});

// State Flags
let check = false, checkmenu = false, checknoti = false, claendaropen = false, checkfocus = false;
let timer = 30; // initial timer in minutes
let clcktimer = timer;
let countdownInterval;
let remainingTime = 0;
let isPaused = false;
let checkrealwifi = false;
let checkbluetooth = false;
let checkaroplane = false;
let checksaver = false;
let checkwifimode = false;
let checkaccessiblity = false;

// Utility Functions
const toggleElement = (el, condition) => el.classList.toggle('show', condition);
const updateButtonIcon = (el, isUp) => el.innerHTML = `<i class="ri-arrow-${isUp ? 'up' : 'down'}-s-line"></i>`;
const getMonthName = (month) => ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"][month];

const closeOnClickOutside = (state, elements, callback, event) => {
    if (state && elements.every(el => !el.contains(event.target))) callback();
};

// Clock & Date Setup
const timeFormatter = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const dateFormatter = new Intl.DateTimeFormat('en-GB');
const updateClock = () => {
    const now = new Date();
    time.textContent = timeFormatter.format(now);
    document.querySelector('.lock-time').textContent = timeFormatter.format(now)
    date.textContent = dateFormatter.format(now);
    document.querySelector('.lock-date').textContent = dateFormatter.format(now)
};
setInterval(updateClock, 500);

// Timer Display Update
function displaytimer(time) {
    timerfix.innerHTML = typeof time === 'number' ? `${time} min` : time;
    if (typeof time === 'number') {
        clcktimer = time;
        clocktimer.innerHTML = `${String(clcktimer).padStart(2, '0')}:00`;
    }
}
displaytimer(timer);

// Increase & Decrease Timer
inctimer.addEventListener('click', () => {
    if (timer >= 120) {
        displaytimer('Too much time!');
        setTimeout(() => displaytimer(timer), 1000);
        return;
    }
    timer += (timer >= 30) ? 15 : 5;
    displaytimer(timer);
});

dectimer.addEventListener('click', () => {
    if (timer <= 0) {
        displaytimer('Please increase time');
        setTimeout(() => displaytimer(timer), 1000);
        return;
    }
    if (timer <= 5) timer -= 1;
    else if (timer <= 30) timer -= 5;
    else timer -= 15;

    if (timer < 0) timer = 0;
    displaytimer(timer);
});

// Focus Timer Logic
function alarm(minutes) {
    const totalSeconds = Number(minutes) * 60;
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("⛔ Invalid or zero time");
        return;
    }

    clearInterval(countdownInterval);
    isPaused = false;
    remainingTime = totalSeconds;

    countdownInterval = setInterval(() => {
        if (isPaused) return;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            clocktimer.textContent = `⏰ Time's up!`;
            focustimedisplay.textContent = `⏰`;
            clocktimer.textContent = `⏰`;
            return;
        }

        remainingTime--;
        const mins = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;
        clocktimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        focustimedisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

const password = document.querySelector('#password')
let lenght
password.addEventListener('input', () => {
    lenght = password.value.length
})
document.querySelector('.unlock-btn').addEventListener('click', () => {
    if (lenght > 5) {
        document.querySelector('.lock-screen').style.display = "none"
        document.querySelector('.homescreen').style.display = 'block'
    } else {
        alert('Password too short!');
    }
})




// Pause/Resume Button
focusPauseBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    const icon = focusPauseBtn.querySelector('i');
    if (isPaused) {
        icon.classList.remove('ri-pause-line');
        icon.classList.add('ri-play-line');
    } else {
        icon.classList.remove('ri-play-line');
        icon.classList.add('ri-pause-line');
    }
});

// Restart Button
focusRestartBtn?.addEventListener('click', () => {
    clearInterval(countdownInterval);
    alarm(clcktimer);
    isPaused = false;
    const icon = focusPauseBtn.querySelector('i');
    icon.classList.remove('ri-play-line');
    icon.classList.add('ri-pause-line');
});

// Focus Toggle Button
clickfocustoggle?.addEventListener('click', () => {
    shownnotification.classList.remove('show');
    checknoti = false;

    setTimeout(() => {
        checkfocus = !checkfocus;
        toggleElement(focutoggle, checkfocus);
        clickfocustoggle.textContent = checkfocus ? ' ▶ End Session' : ' ▶ focus';

        if (checkfocus) alarm(clcktimer);
        else clearInterval(countdownInterval);
    }, 1000);
});

// Full Clock Cancel & Close
closeclock?.addEventListener('click', () => {
    checkfocus = false;
    focutoggle.classList.remove('show');
    clickfocustoggle.textContent = ' ▶ focus';
    clearInterval(countdownInterval);
});

Openfullclock?.addEventListener('click', () => {
    focusUi.classList.remove('hiden');
    focutoggle.classList.remove('show');
    clearInterval(countdownInterval);
});
cancleapp?.addEventListener('click', () => {
    focusUi.classList.add('hiden');
    clickfocustoggle.textContent = ' ▶ focus';
    clearInterval(countdownInterval);
});

// Remaining Features: Wi-Fi, Notification, Calendar, Brightness
// (Left unchanged for brevity, but are still part of original code)

// Wi-Fi Toggle
wifi?.addEventListener('click', () => {
    check = !check;
    toggleElement(wifiopen, check);
});
function togglewifisection(name, condition) {
    if (condition) {
        name.style.background = 'blue'
    } else {
        name.style.background = 'white'
    }
}
// On page load, restore WiFi state from localStorage:
if (localStorage.getItem('wifi') === 'on') {
    checkrealwifi = true;
    realwifi.style.background = 'blue';
    document.querySelector('#bluecompletewifi').style.background = 'blue';
    changeconditionwifi.innerHTML = '<i class="ri-wifi-line"></i>';
    wifionly.checked = true;
} else {
    checkrealwifi = false;
    realwifi.style.background = 'white';
    document.querySelector('#bluecompletewifi').style.background = 'white';
    changeconditionwifi.innerHTML = '<i class="ri-earth-line"></i>';
    wifionly.checked = false;
}
realwifi.addEventListener('click', () => {
    checkrealwifi = !checkrealwifi;
    if (checkrealwifi) {
        realwifi.style.background = 'blue';
        document.querySelector('#bluecompletewifi').style.background = 'blue';
        changeconditionwifi.innerHTML = '<i class="ri-wifi-line"></i>';
        wifionly.checked = true;
        localStorage.setItem('wifi', 'on');
    } else {
        realwifi.style.background = 'white';
        document.querySelector('#bluecompletewifi').style.background = 'white';
        changeconditionwifi.innerHTML = '<i class="ri-earth-line"></i>';
        wifionly.checked = false;
        localStorage.setItem('wifi', 'off');
    }
});
wifionly.addEventListener('click', () => {
    if (wifionly.checked) {
        realwifi.style.background = 'blue';
        document.querySelector('#bluecompletewifi').style.background = 'blue';
        changeconditionwifi.innerHTML = '<i class="ri-wifi-line"></i>';
        checkrealwifi = true;
        localStorage.setItem('wifi', 'on');
    } else {
        realwifi.style.background = 'white';
        document.querySelector('#bluecompletewifi').style.background = 'white';
        changeconditionwifi.innerHTML = '<i class="ri-earth-line"></i>';
        checkrealwifi = false;
        localStorage.setItem('wifi', 'off');
    }
});

if (localStorage.getItem('bluetooth') === 'on') {
    bluecompleteblutooth.style.background = 'blue';
    checkbluetooth = true;
    bluetoothonly.checked = true;
} else {
    bluecompleteblutooth.style.background = 'white';
    checkbluetooth = false;
    bluetoothonly.checked = false;
}

bluetoothonly.addEventListener('click', () => {
    if (bluetoothonly.checked) {
        bluecompleteblutooth.style.background = 'blue';
        localStorage.setItem('bluetooth', 'on');
        checkbluetooth = true;
    } else {
        bluecompleteblutooth.style.background = 'white';
        localStorage.setItem('bluetooth', 'off'); // 
        checkbluetooth = false;
    }
});

bluetooth.addEventListener('click', () => {
    checkbluetooth = !checkbluetooth;
    togglewifisection(bluetooth, checkbluetooth);
    if (checkbluetooth) {
        bluecompleteblutooth.style.background = 'blue';
        bluetoothonly.checked = true;
        localStorage.setItem('bluetooth', 'on');
    } else {
        bluecompleteblutooth.style.background = 'white';
        bluetoothonly.checked = false;
        localStorage.setItem('bluetooth', 'off'); // 
    }
});

aroplane.addEventListener('click', () => {
    checkaroplane = !checkaroplane
    togglewifisection(aroplane, checkaroplane)
    if (checkaroplane) {
        realwifi.style.background = 'white'
        bluetooth.style.background = 'white'
        document.querySelector('#bluecompletewifi').style.background = 'white';
        changeconditionwifi.innerHTML = ' <i class="ri-plane-line"></i>'
        checkrealwifi = false;
    }
    else {
        changeconditionwifi.innerHTML = '<i class="ri-earth-line"></i>'

    }
})
saver.addEventListener('click', () => {
    checksaver = !checksaver
    togglewifisection(saver, checksaver)
})
accessiblity.addEventListener('click', () => {
    checkaccessiblity = !checkaccessiblity
    togglewifisection(accessiblity, checkaccessiblity)
})
// On page load
if (localStorage.getItem('mode') === 'night') {
    checkwifimode = true;
    togglewifisection(wifimode, checkwifimode);
    wrapper.style.filter = 'sepia(0.3) brightness(0.9)';
    document.querySelector('.modeiconchange').innerHTML = '<i class="ri-moon-line"></i>';
    nightModeToggle.checked = true;
} else {
    checkwifimode = false;
    togglewifisection(wifimode, checkwifimode);
    wrapper.style.filter = 'sepia(0) brightness(1)';
    document.querySelector('.modeiconchange').innerHTML = '<i class="ri-sun-line"></i>';
    nightModeToggle.checked = false;
}

// WiFi mode toggle (clicks the Night Mode too)
wifimode.addEventListener('click', () => {
    checkwifimode = !checkwifimode;
    togglewifisection(wifimode, checkwifimode);

    if (checkwifimode) {
        wrapper.style.filter = 'sepia(0.3) brightness(0.9)';
        document.querySelector('.modeiconchange').innerHTML = '<i class="ri-moon-line"></i>';
        nightModeToggle.checked = true;
        localStorage.setItem('mode', 'night');
    } else {
        wrapper.style.filter = 'sepia(0) brightness(1)';
        document.querySelector('.modeiconchange').innerHTML = '<i class="ri-sun-line"></i>';
        nightModeToggle.checked = false;
        localStorage.setItem('mode', 'sun');
    }
});

// Direct night mode toggle
nightModeToggle.addEventListener('click', () => {
    if (nightModeToggle.checked) {
        wrapper.style.filter = 'sepia(0.3) brightness(0.9)';
        document.querySelector('.modeiconchange').innerHTML = '<i class="ri-moon-line"></i>';
        checkwifimode = true;
        togglewifisection(wifimode, true);
        localStorage.setItem('mode', 'night');
    } else {
        wrapper.style.filter = 'sepia(0) brightness(1)';
        document.querySelector('.modeiconchange').innerHTML = '<i class="ri-sun-line"></i>';
        checkwifimode = false;
        togglewifisection(wifimode, false);
        localStorage.setItem('mode', 'sun');
    }
});

// Notification Toggle
clickshownnotification?.addEventListener('click', (e) => {
    e.stopPropagation();
    checknoti = !checknoti;
    toggleElement(shownnotification, checknoti);
});

// Start Menu
clickmenu?.forEach(menu => {
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        checkmenu = !checkmenu;
        toggleElement(showmenu, checkmenu);
    });
});

// Full Clock View
Openfullclock?.addEventListener('click', () => {
    focusUi.classList.remove('hiden');
    checkfocus = false;
    focutoggle.classList.remove('show');
    clearInterval(countdownInterval);
});

// Calendar Control
clickcalneder?.addEventListener('click', (e) => {
    e.stopPropagation();
    claendaropen = !claendaropen;
    controlcalen.classList.toggle('hidden', !claendaropen);
    updateButtonIcon(clickcalneder, claendaropen);
});

document.addEventListener('click', (e) => {
    closeOnClickOutside(check, [wifiopen, wifi, pannelcontrol], () => {
        wifiopen.classList.remove('show');
        pannelcontrol.style.display = 'none';
        panels.forEach(panel => panel.style.display = 'none');
        check = false;
    }, e);

    closeOnClickOutside(checknoti, [shownnotification, clickshownnotification], () => {
        shownnotification.classList.remove('show');
        checknoti = false;
    }, e);

    closeOnClickOutside(claendaropen, [controlcalen, clickcalneder], () => {
        controlcalen.classList.add('hidden');
        updateButtonIcon(clickcalneder, false);
        claendaropen = false;
    }, e);

    closeOnClickOutside(checkmenu, [showmenu, ...clickmenu], () => {
        showmenu.classList.remove('show');
        checkmenu = false;
    }, e);
});

// Brightness Control
brightnessCon.addEventListener('input', (e) => {
    const brightness = e.target.value;
    hover.textContent = `${brightness - 50}%`;
    wrapper.style.filter = `brightness(${brightness}%)`;
});

// Calendar Render
let currentDate = new Date();
function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    CalenDate.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        CalenDate.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.className = 'p-1 rounded hover:bg-gray-300 cursor-pointer';
        if (day === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayDiv.classList.add('bg-blue-400');
        }
        CalenDate.appendChild(dayDiv);
    }

    const monthName = getMonthName(month);
    if (monthDisplay) monthDisplay.textContent = `${monthName} ${year}`;
    setdate.textContent = `${monthName}, ${date.getDate()} ${year}`;
    setuperdate.textContent = `${monthName}, ${date.getDate()} ${year}`;
}
premonth?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});
nextmonth?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});
renderCalendar(currentDate);



// whether 
const API_KEY = "751ba18b7f8142df9c1121113252606";
const city = "Bhopal";
const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

function getWeatherIcon(condition) {
    const text = condition.toLowerCase();
    if (text.includes("sun") || text.includes("clear")) return "https://static.vecteezy.com/system/resources/previews/021/625/166/non_2x/sunny-weather-icon-sun-icon-weather-forecast-icon-for-sunny-weather-suitable-for-social-media-and-app-icon-sun-illustration-yellow-color-summer-and-hot-weather-sign-and-tag-minimalism-free-vector.jpg";
    if (text.includes("cloud")) return "https://i.pinimg.com/564x/65/88/72/6588720cf0b315a2480af217b80430c9.jpg";
    if (text.includes("rain") || text.includes("drizzle")) return "https://static.vecteezy.com/system/resources/previews/020/235/675/non_2x/rainy-weather-icon-isolated-on-black-rainy-weather-symbol-suitable-for-graphic-design-and-websites-on-a-white-background-icon-free-vector.jpg";
    if (text.includes("thunder")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStFl6-drFgjdKDgGEHMyPmRlsTmaV6zxjBNQ&s";
    return "https://static.vecteezy.com/system/resources/previews/020/235/675/non_2x/rainy-weather-icon-isolated-on-black-rainy-weather-symbol-suitable-for-graphic-design-and-websites-on-a-white-background-icon-free-vector.jpg";
}

fetch(url)
    .then(res => res.json())
    .then(data => {
        const condition = data.current.condition.text;
        const temp = data.current.temp_c;

        document.querySelector(".weather-temp").textContent = `${temp} °C`;
        document.querySelector(".weather-temps").textContent = `${temp} °C`;
        document.querySelector(".weather-condition").textContent = condition;
        document.querySelector(".weather-conditions").textContent = condition;
        document.querySelector(".weather-icon").src = getWeatherIcon(condition);
    })
    .catch(error => {
        console.error("Weather fetch failed:", error);
        document.querySelector(".weather-condition").textContent = "Failed to load";
    });


const imageArray = [
    // Sunny
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    // Rainy
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    // Stormy
    "https://images.unsplash.com/photo-1585305572974-38544e0c218d",
    // Cloudy
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
    // Snowy
    "https://images.unsplash.com/photo-1489587021122-2cba41b2ddec",
    // Foggy forest
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    // Calm water
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    // Night sky
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
];

const trigger = document.querySelector('.weather-widget');
const panel = document.querySelector('.weather-panel');
let hideTimeout;

// Show panel + random image
function showPanel() {
    clearTimeout(hideTimeout); // Cancel any pending hide
    panel.classList.remove('opacity-0', 'translate-x-[-20px]', 'pointer-events-none');
    panel.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
    loadRandomImage();
}

// Hide panelx
function hidePanel() {
    panel.classList.add('opacity-0', 'translate-x-[-20px]', 'pointer-events-none');
    panel.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
}

function loadRandomImage() {
    randomimgindex = Math.floor(Math.random() * imageArray.length)
    const randomImg = document.querySelector('.random-img');
    randomImg.src = `${imageArray[randomimgindex]}?auto=format&fit=crop&w=600&q=80`;
}

// Trigger hover
trigger.addEventListener('mouseenter', showPanel);
trigger.addEventListener('mouseleave', (e) => {
    hideTimeout = setTimeout(() => {
        if (!panel.matches(':hover')) hidePanel();
    }, 1000);
});

// Panel hover cancels hide
panel.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
panel.addEventListener('mouseleave', hidePanel);


wifiopen.addEventListener('click', (e) => {
    const targetWithId = e.target.closest('[id]');
    if (!targetWithId) return; // no id found

    const ids = targetWithId.id;
    console.log(ids)
    // Show main panel
    if (ids == 1 || ids == 2 || ids == 3) {
        pannelcontrol.style.display = 'block';

        // Hide all panels first
        panels.forEach(panel => panel.style.display = 'none');

        // Show matching panel
        const activepanel = document.querySelector(`#panel-${ids}`);
        if (activepanel) {
            activepanel.style.display = 'block';
        }
    }
});

const backButtons = document.querySelectorAll('.backtowifi');

backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        pannelcontrol.style.display = 'none';
        panels.forEach(panel => panel.style.display = 'none');
    });
});
//  <i class="ri-wifi-line"></i>


// Select all your main start blocks (with ids like 11, 22, 33...)
// Get all start blocks

const tabsContainer = document.getElementById('tabs');
const tabContentContainer = document.getElementById('tabContentContainer');
const closeWindow = document.getElementById('closeWindow');

let tabCount = 2; // Unique ID for new tabs
let tabs = {};    // Store tab elements and content

function createTab(id) {
    const tabDiv = document.createElement('div');
    tabDiv.className = 'tab';
    tabDiv.dataset.id = id;
    tabDiv.innerHTML = `Tab ${id} <small class="closetab">✕</small>`;
    tabsContainer.insertBefore(tabDiv, tabsContainer.querySelector('.add-tab'));

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.dataset.id = id;

    let arr = [
        "Radha Krishna",
        "Mahakal",
        "Jai Shree Ram",
        "Sheryians",
        "ChatGPT"
    ];
    let indexofarr = Math.floor(Math.random() * arr.length);
    let WhatSearch = arr[indexofarr];

    tabContent.innerHTML = `
    <iframe src="https://www.bing.com/search?q=${encodeURIComponent(WhatSearch)}"></iframe>
  `;

    tabContentContainer.appendChild(tabContent);

    tabs[id] = { tab: tabDiv, content: tabContent };

    // ✅ Close handler
    const closeBtn = tabDiv.querySelector('.closetab');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(id);
    });

    // ✅ Update tab label
    updateTabTitle(tabDiv, WhatSearch);

    switchTab(id);
}

function switchTab(id) {
    tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tabContentContainer.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

    if (tabs[id]) {
        tabs[id].tab.classList.add('active');
        tabs[id].content.style.display = 'flex';
    }
}

function closeTab(id) {
    tabs[id].tab.remove();
    tabs[id].content.remove();
    delete tabs[id];

    const remaining = Object.keys(tabs);
    if (remaining.length) {
        switchTab(remaining[0]);
    } else {
        // ✅ If no tabs left → close the whole browser window
        document.querySelector('.chrome').classList.add('hiden')
    }
}

// Helper to update tab name only, keep ✕ intact
function updateTabTitle(tabDiv, title) {
    tabDiv.childNodes[0].nodeValue = title + ' ';
}

// Add first tab automatically
createTab(1);

// Tab switching
tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab') && !e.target.classList.contains('add-tab')) {
        const id = e.target.dataset.id;
        switchTab(id); ``
    }
});

// New tab button
tabsContainer.querySelector('.add-tab').addEventListener('click', () => {
    createTab(tabCount++);
});

// Close the whole window manually
closeWindow.addEventListener('click', () => {
    document.querySelector('.chrome').classList.add('hiden')
});

document.addEventListener('contextmenu', e => e.preventDefault());

// Try to block F12, Ctrl+Shift+I, Ctrl+U
const desktop = document.querySelector('.desktop');
const context = document.querySelector('.context-menu')
const icons = document.querySelector(".icon")
desktop.addEventListener('contextmenu', (e) => {
    context.style.left = `${e.pageX}px`
    context.style.top = `${e.pageY}px`
    context.style.display = "block"
});
window.addEventListener('click', (e) => {
    if (!e.target.context) {
        context.style.display = "none"
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const Refresh = document.querySelector('.Refresh');
    Refresh.addEventListener('click', () => {
        icons.style.opacity = 0

        setTimeout(() => {
            icons.style.opacity = 1
        }, 500);
    });
});


const group = document.querySelectorAll('.group');
let focusui = document.querySelector(".focus-ui")

group.forEach(icon => {
    let isDragging = false;
    let offsetX, offsetY;

    icon.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - icon.getBoundingClientRect().left;
        offsetY = e.clientY - icon.getBoundingClientRect().top;
        icon.style.cursor = 'grabbing';
    });

    icons.addEventListener('mousemove', e => {
        if (!isDragging) return;

        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        // Save current position
        const oldLeft = icon.offsetLeft;
        const oldTop = icon.offsetTop;

        // Move temporarily
        icon.style.left = `${newLeft}px`;
        icon.style.top = `${newTop}px`;

        let overlapping = false;
        icons.forEach(other => {
            if (other === icon) return;

            const r1 = icon.getBoundingClientRect();
            const r2 = other.getBoundingClientRect();

            const isOverlap = !(r1.right < r2.left ||
                r1.left > r2.right ||
                r1.bottom < r2.top ||
                r1.top > r2.bottom);
            if (isOverlap) overlapping = true;
        });

        if (overlapping) {
            // If overlapping, revert to old position
            icon.style.left = `${oldLeft}px`;
            icon.style.top = `${oldTop}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        icon.style.cursor = 'grab';
    });


});
// Get the elements
const focusUI = document.querySelector('.focus-ui');
const minimizeBtn = document.querySelector('.title-right button:nth-child(1)');
const cover = document.querySelector('.cover')
const maximizeBtn = document.querySelector('.title-right button:nth-child(2)');
const netflixapp = document.querySelector('.netflix-app')
const chromes = document.querySelector('.chrome')
const browserwindow = document.querySelector('.browser-window')

// Minimize: hide the section
minimizeBtn.addEventListener('click', () => {
    focusUI.style.display = 'none';
});

function maximizebuttonclick(elem, flag) {
    if (flag) {
        elem.classList.add('halfscreen')
        elem.classList.remove('fullscreen')
    } else {
        elem.classList.add('fullscreen')
        elem.classList.remove('halfscreen')

    }
}
let iswindow = false
let isnetflix = false
let ischome = false
// let isnotes = false
maximizeBtn.addEventListener('click', () => {
    maximizebuttonclick(focusUI, iswindow)
    iswindow = !iswindow

});
document.querySelector('.netflix-height').addEventListener('click', () => {
    maximizebuttonclick(netflixapp, isnetflix)
    isnetflix = !isnetflix
})
document.querySelector('.chromesquare').addEventListener('click', () => {
    maximizebuttonclick(chromes, ischome)
    maximizebuttonclick(browserwindow, ischome)
    ischome = !ischome
})//


document.querySelector(".vscode-close").addEventListener('click', () => {
    document.querySelector('.vscode-app').classList.add('hiden')
})
document.querySelector('.closenetflix').addEventListener('click', () => {
    document.querySelector('.netflix-app').classList.add('hiden')
})

document.addEventListener('DOMContentLoaded', () => {
    const chromeIcon = document.getElementById('chromeid');
    const vscodeIcon = document.getElementById('vscodeid');
    const clockIcon = document.getElementById('clockid');
    const netflixid = document.getElementById('netflixid');
    const fileid = document.querySelector('#fileid')
    const notesapp = document.querySelector('.notes-app')


    chromeIcon.addEventListener('dblclick', () => {
        document.querySelector('.chrome').classList.remove('hiden')
    });

    vscodeIcon.addEventListener('dblclick', () => {
        document.querySelector('.vscode-app').classList.remove('hiden')
    });

    clockIcon.addEventListener('dblclick', () => {
        focusUi.classList.remove('hiden')
    });
    netflixid.addEventListener('dblclick', () => {
        document.querySelector('.netflix-app').classList.remove('hiden')
    })
    fileid.addEventListener('dblclick', () => {
        document.querySelector('.file-explorer-app').classList.remove('hiden')
    })
    document.querySelector('#notesid').addEventListener('dblclick' , ()=>{
        notesapp.classList.remove('hiden')
    })
});

document.querySelectorAll('.snap-layout .cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const windowEl = cell.closest('.focus-ui, .chrome, .netflix-app  , .vscode-app , .file-explorer-app , .notes-app');
        if (!windowEl) return;

        const index = Array.from(cell.parentNode.children).indexOf(cell);
        if (index === 0) {
            // Maximize
            windowEl.style.top = '0';
            windowEl.style.left = '0';
            windowEl.style.width = '100%';
            windowEl.style.height = '92%';
        } else if (index === 1) {
            // Snap left
            windowEl.style.top = '0';
            windowEl.style.left = '0';
            windowEl.style.width = '50%';
            windowEl.style.height = '92%';
        } else if (index === 2) {
            // Snap right
            windowEl.style.top = '0';
            windowEl.style.left = '50vw';
            windowEl.style.width = '50%';
            windowEl.style.height = '92%';
        }
    });
});

// ✅ DRAGGABLE WINDOWS
document.querySelectorAll('.draggable').forEach(bar => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    const windowEl = bar.closest('.focus-ui, .chrome, .netflix-app , .vscode-app , .file-explorer-app , .notes-app');

    bar.addEventListener('mousedown', e => {
        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        windowEl.style.position = 'absolute'; // Ensure absolute for free drag
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            windowEl.style.left = `${e.clientX - offsetX}px`;
            windowEl.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});


const newCreate = document.querySelector('.newcreate');
const newHiddenDiv = document.querySelector('.newhidendiv');

newCreate.addEventListener('mouseenter', () => {
    newHiddenDiv.style.display = 'block';
});

newCreate.addEventListener('mouseleave', () => {
    // Chhota delay + check agar mouse submenu par gaya ho
    setTimeout(() => {
        if (!newHiddenDiv.matches(':hover') && !newCreate.matches(':hover')) {
            newHiddenDiv.style.display = 'none';
        }
    }, 100);
});

newHiddenDiv.addEventListener('mouseleave', () => {
    newHiddenDiv.style.display = 'none';
});

newHiddenDiv.addEventListener('mouseenter', () => {
    newHiddenDiv.style.display = 'block';
});


// fullmode minimize-screen
document.querySelectorAll('.closecoss').forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the parent app window and hide it
        btn.closest('.app-window').classList.add('hiden')
    });
});
document.querySelectorAll('.minimize-screen').forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the parent app window and hide it
        btn.closest('.app-window').classList.add('hiden')
    });
});
const textarea = document.querySelector('.notes-body .notes-textarea');
const saveBtn = document.querySelector('.save-notes-btn');


const savedContent = localStorage.getItem('notes');
if (savedContent) {
    textarea.value = savedContent;
}


let textContent = 'Write to here';

textarea.addEventListener('input', (e) => {
    textContent = e.target.value;
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('notes', textContent);
    alert('Notes saved!');
});


const desktops = document.querySelector('.desktop .icon'); 
const explorerApp = document.querySelector('.file-explorer-app');
const notesApp = document.querySelector('.notes-app');

let folderCount = 1;
let noteCount = 1;

// ✅ NEW FOLDER
document.querySelector('.newfolder').addEventListener('click', () => {
  const folder = document.createElement('div');
  folder.className = 'group';
  folder.innerHTML = `
    <img class="h-10 mx-auto cursor-pointer" src="icons8-file-explorer-new-48.png" alt="Folder" />
    <div class="headdings">New Folder </div>
    <div >New Folder </div>
  `;
  desktops.appendChild(folder);

  // Double click to open Explorer
  folder.addEventListener('dblclick', () => {
    explorerApp.classList.remove('hiden');
  });

  folderCount++;
});

// ✅ NEW NOTE
document.querySelector('.newnotes').addEventListener('click', () => {
  const note = document.createElement('div');
  note.className = 'group';
  note.innerHTML = `
    <img class="h-10 mx-auto cursor-pointer" src="icons8-notes-48.png" alt="Note" />
    <div class="headdings">Note new</div>
    <div >Note new</div>
  `;
  desktops.appendChild(note);

  // Double click to open Notes app
  note.addEventListener('dblclick', () => {
    notesApp.classList.remove('hiden');
  });

  noteCount++;
});

// ✅ CLOSE BUTTONS
document.querySelectorAll('.closecoss').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.app-window').classList.add('hiden');
  });
});


// JS
const wallpapers = [
  "aneesh-matcha-ug0M3sLBgMM-unsplash.jpg",
  "MEET PEOPLE.jpg",
  "download (2).jpg",
  "download (1).jpg"
];

const randomBtn = document.querySelector('.random-wallpaper-btn');


randomBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  const randomWallpaper = wallpapers[randomIndex];
  desktop.style.backgroundImage = `url('${randomWallpaper}')`;
  desktop.style.backgroundSize = 'cover';
  desktop.style.backgroundPosition = 'center';
});



