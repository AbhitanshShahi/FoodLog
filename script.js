const messMenu = {
  "Monday": {
    Breakfast: "Chola Bhatura, Bread, Butter, Jam, Tea",
    Lunch: "Rice, Roti, Dal, Mix Veg with Corn, Salad, French Fries",
    Snacks: "Badapav, Coffee",
    Dinner: "Rice, Roti, Mix Dal Tadka, Aloo Jeera Capsicum (Dry), Rasgulla, Mix Boiled Veg"
  },
  "Tuesday": {
    Breakfast: "Dahi Bada, Aloo Dum/Vada Ghughuni with Chutney, Cornflakes, Milk, Banana, Tea",
    Lunch: "Roti, Rice, Dal, Fish Besar, Matar Paneer, Salad, Papad, Mix Boiled Veg",
    Snacks: "Rusk, Tea",
    Dinner: "Rice, Roti, Dal, Chhole Masala, Aloo Bhujia, Jalebi (2 pcs), Mix Boiled Veg"
  },
  "Wednesday": {
    Breakfast: "Bread, Butter, Jam, Boiled Egg/Vegetable Cutlet, Chilli Sauce, Tea",
    Lunch: "Rice, Roti, Dal, Vegetable Kofta, Egg Kasha, Finger Chips, Salad, Pickle, Mix Boiled Veg",
    Snacks: "Sweetcorn Chat, Coffee",
    Dinner: "Fried Rice, Roti, Dal Fry, Paneer Bhurji, Chicken Hydrabadi, Icecream/Kulfi, Mix Boiled Veg"
  },
  "Thursday": {
    Breakfast: "Pav Bhaji, Cornflakes, Milk, Banana, Pickle, Onion, Coffee",
    Lunch: "Lemon Rice, Roti, Dal, Rajma Masala, Mix Bhaji, Salad, Mix Boiled Veg",
    Snacks: "Papmudi Chat, Chutney, Tea",
    Dinner: "Zeera Rice, Roti, Dal Makhani, Kashmiri Aloo Dum, Gulab Jamun (1 pc), Mix Boiled Veg"
  },
  "Friday": {
    Breakfast: "Bread, Butter, Jam, Omlet, Veg Cutlet, Tea",
    Lunch: "Roti, Rice, Dal, Paneer Hydrabadi, Fish Masala, Potato Karela Chips, Salad, Mix Boiled Veg",
    Snacks: "Biscuit, Coffee",
    Dinner: "Chicken Biryani/Veg Biryani, Paneer Butter Masala, Raita, Jalejeera Water"
  },
  "Saturday": {
    Breakfast: "Poha with Matar, Sev Bhujia, Onion, Ghuguni, Cornflakes, Milk, Banana, Tea",
    Lunch: "Rice, Roti, Dal, Aloo Chokha, Manchurian, Sriram Papad, Mix Boiled Veg",
    Snacks: "Maggie, Coffee",
    Dinner: "Rice, Roti, Dal, Chicken Mughlai, Chilli Paneer, Fruit Custard, Mix Boiled Veg"
  },
  "Sunday": {
    Breakfast: "Dosa, Sambar, Chutney, Bread, Butter, Jam, Coffee",
    Lunch: "Roti, Rice, Dal, Egg Masala, Aloo Besan, Soyabin Masala, Salad, Dahi, Mix Boiled Veg",
    Snacks: "Pasta, Tea",
    Dinner: "Zeera Rice, Roti, Dal, Kadhai Paneer, Chicken Kasa, Malpua, Mix Boiled Veg"
  }
};

const mealColors = {
  breakfast: { text: 'text-amber-300', border: 'border-amber-400' },
  lunch: { text: 'text-green-300', border: 'border-green-400' },
  snacks: { text: 'text-purple-300', border: 'border-purple-400' },
  dinner: { text: 'text-sky-300', border: 'border-sky-400' }
};

const weekday = new Date().toLocaleString('en-US', { weekday: "long" });

let todayMenu = [];

switch (weekday) {
  case "Monday":
    todayMenu = messMenu.Monday
    break;
  case "Tuesday":
    todayMenu = messMenu.Tuesday;
    break;
  case "Wednesday":
    todayMenu = messMenu.Wednesday;
    break;
  case "Thursday":
    todayMenu = messMenu.Thursday;
    break;
  case "Friday":
    todayMenu = messMenu.Friday;
    break;
  case "Saturday":
    todayMenu = messMenu.Saturday;
    break;
  case "Sunday":
    todayMenu = messMenu.Sunday;
    break;
  default:
    todayMenu = { message: "No Menu available" }
    break;
}

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


const menuContainer = document.querySelector("#menu-container");
const menuDayTitle = document.querySelector("#menu-day-title");
const daySelect = document.querySelector("#day-select");

function displayMenu(dayName) {
  const today = new Date().toLocaleString('en-US', { weekday: "long" });

  
  if (dayName === today) {
    menuDayTitle.textContent = "Today's Menu";
  } else {
    menuDayTitle.textContent = `${dayName}'s Menu`;
  }

  menuContainer.innerHTML = "";

  const menu = messMenu[dayName];
  if (menu) {
    for (const [meal, items] of Object.entries(menu)) {
      const mealKey = meal.toLowerCase();
      const colors = mealColors[mealKey] || { text: 'text-gray-300' };

      const mealTitle = document.createElement("h4");
      mealTitle.className = `text-2xl font-medium mt-4 ${colors.text}`;
      mealTitle.textContent = `${meal}:`;
      menuContainer.appendChild(mealTitle);

      const list = document.createElement("ul");
      items.split(", ").forEach(item => {
        const li = document.createElement("li");
        li.className = "ml-5 mt-2 list-disc mb-3";
        li.textContent = item;
        list.appendChild(li);
      });
      menuContainer.appendChild(list);
    }
  } else {
    menuContainer.innerHTML = "<p>No menu available</p>";
  }
}


daySelect.addEventListener("change", (e) => {
  const selectedDay = daysOfWeek[parseInt(e.target.value)];
  displayMenu(selectedDay);
});


window.onload = () => {
  const todayIndex = new Date().getDay(); 
  daySelect.value = todayIndex;
  displayMenu(daysOfWeek[todayIndex]);
};
