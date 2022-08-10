const simpsonsContainer = document.getElementById('simpsons')
const renderCountries = (simpsons) => {
  let result = ''
  simpsons.forEach(element => {
    if (element.id > 10) {
      return;
    }
    console.log(simpsons)
    result += `
      <table>
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.yearsInOffice}</td>
            <td>${element.vicePresidents}</td>
        </tr>
        </table>
      `
  })
  simpsonsContainer.innerHTML = result
  localStorage.setItem("simp", JSON.stringify(simpsons))
 console.log(result)
}
// 
const fetchData = () => {
  const simps = localStorage.getItem("simp")
  const localSimp = JSON.parse(simps)
  // console.log(localSimp)
  if (!!localSimp) {
    renderCountries(localSimp)
  }
  else {
  }
  fetch("https://api.sampleapis.com/presidents/presidents")
    .then((response) => {
      return response.json();
    })
    .then((simpsons) => {
      renderCountries(simpsons);
    })
    .catch((error) => {
      alert('ERROR', error)
    });
  }

fetchData()

function search() {
  let input, filter,table, tr, td, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  table = document.getElementById('simpsons');
  tr = table.getElementsByTagName("tr");
  for(let i = 0; i < tr.length; i++){
      td = tr[i].getElementsByTagName("td")[1];
      if(td){
          txtValue = td.textContent || td.innerText;
          if(txtValue.toUpperCase().indexOf(filter) > -1){
              tr[i].style.display = "";
          }
          else{
              tr[i].style.display = "none"
          }
      }
  }
}


function filterTable() {
  let dropdown, table, rows, cells, vp, filter;
  dropdown = document.getElementById("vpDropdown");
  table = document.getElementById("simpsons");
  rows = table.getElementsByTagName("tr");
  filter = dropdown.value;

  
  for (let row of rows) { 
    cells = row.getElementsByTagName("td");
    vp = cells[3] || null; 
    
    if (filter === "All" || !vp || (filter === vp.textContent)) {
      row.style.display = "";
    }
    else {
      row.style.display = "none"; 
    }
  }
}

function sortTableA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById('simpsons');
  switching = true;
  
  while (switching) {
    
    switching = false;
    rows = table.rows;
    
    for (i = 0; i < (rows.length - 1); i++) {
      
      shouldSwitch = false;
     
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];

     
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;


    
    }
  }

  document.getElementById("sortAz").style.display = "none";
  document.getElementById("sortZa").style.display = "block"
}




function sortTableZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById('simpsons');
  switching = true;
  
  while (switching) {
    
    switching = false;
    rows = table.rows;
    
    for (i = 0; i < (rows.length - 1); i++) {
      
      shouldSwitch = false;
     
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];

     
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  document.getElementById("sortZa").style.display = "none";
  document.getElementById("sortAz").style.display = "block"
  
}






