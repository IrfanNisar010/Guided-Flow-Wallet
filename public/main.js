let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");

let classList = profileDropdownList.classList;

const toggle = () => classList.toggle("active");

window.addEventListener("click", function (e) {
  if (!btn.contains(e.target)) classList.remove("active");
});

const chart = document.querySelector("#chart").getContext('2d');

// create a new chart instance

new Chart(chart, {

  type:'line',
  data: {
    labels: ['Jan', 'Feb',
    'Jul', 'Aug',
    'Oct', 'Nov',
    'Mar', 'Apr',
    'May' ,'Jun',
    'Sep', 'Oct',
    'Nov'],

    datasets: [
      {
        label: 'BTC',
        data:[29374, 33537, 49631, 59095, 57828, 36684, 33572, 39974, 48847, 48116, 61004],
        borderWidth: 1,
        borderColor: 'red'
      },
      {
        label: 'ETH',
        data: [3150, 41000, 88800, 26000, 46000, 32698,
          5000, 3000, 18656, 24832, 36844],        
        borderWidth: 1,
        borderColor: 'blue'
      }
    ]
  },
  Option: {
    responsive:true
  }
});