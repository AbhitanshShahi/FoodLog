const mealColors = {
  breakfast: { text: 'text-amber-300', border: 'border-amber-400' },
  lunch: { text: 'text-green-300', border: 'border-green-400' },
  snacks: { text: 'text-purple-300', border: 'border-purple-400' }, 
  dinner: { text: 'text-sky-300', border: 'border-sky-400' }
};

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MessSelect = document.querySelector('#Mess-select');
let messMenu = {};
const menuContainer = document.querySelector("#menu-container");
const menuDayTitle = document.querySelector("#menu-day-title");
const daySelect = document.querySelector("#day-select");

MessSelect.addEventListener("change", async function () {
  const filePath = this.value;
  if (!filePath) return;
  localStorage.setItem('SaveMess', filePath)

  try {
    const res = await fetch(`menus/${filePath}`);
    messMenu = await res.json();
  
    const selectedDay = daysOfWeek[parseInt(daySelect.value)];
    displayMenu(selectedDay);

  } catch (err) {
    console.error("Error fetching mess menu:", err);
    menuContainer.innerHTML = "<p>Error loading mess menu.</p>";
  }
});

function displayMenu(dayName) {
  const today = new Date().toLocaleString('en-US', { weekday: "long" });

  if (dayName === today) {
    menuDayTitle.textContent = "Today's Menu";
  } else {
    menuDayTitle.textContent = `${dayName}'s Menu`;
  }

  menuContainer.innerHTML = "";

  
  const menuDay = messMenu.weeklyMenu.find(d => d.day === dayName);

  if (menuDay) {
    for (const [meal, items] of Object.entries(menuDay)) {
      if (meal === "day") continue; 

      const mealKey = meal.toLowerCase();
      const colors = mealColors[mealKey] || { text: 'text-gray-300' };

      const mealTitle = document.createElement("h4");
      mealTitle.className = `text-2xl font-medium mt-4 ${colors.text}`;
      
      mealTitle.textContent = `${meal.charAt(0).toUpperCase() + meal.slice(1)}:`;
      menuContainer.appendChild(mealTitle);

      const list = document.createElement("ul");
      
      items.forEach(item => {
        const li = document.createElement("li");
        li.className = "ml-5 mt-2 list-disc mb-3";
        li.textContent = item;
        list.appendChild(li);
      });
      menuContainer.appendChild(list);
    }
  } else {
    menuContainer.innerHTML = "<p>No menu available for this day.</p>";
  }
}

daySelect.addEventListener("change", (e) => {
  const selectedDay = daysOfWeek[parseInt(e.target.value)];
  displayMenu(selectedDay);
});

window.onload = () => {
  const todayIndex = new Date().getDay(); 
  daySelect.value = todayIndex;
  const SaveMess = localStorage.getItem('SaveMess');
  if (SaveMess) {
    MessSelect.value = SaveMess;
  }

  const defaultMess = MessSelect.value;
  if (defaultMess) {
    fetch(`menus/${defaultMess}`)
      .then(res => res.json())
      .then(data => {
        messMenu = data;
        displayMenu(daysOfWeek[todayIndex]);
      })
      .catch(err => {
        console.error("Error loading default mess:", err);
        menuContainer.innerHTML = "<p>Failed to load the default menu.</p>";
      });
  }
};