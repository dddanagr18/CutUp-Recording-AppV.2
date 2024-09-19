// script.js
// List of products
const products = [
  "Flank Steak",
  "Flap Meat",
  "Thin Flank Meat",
  "Point End",
  "Navel End",
  "Brisket Rib Meat",
  "Dingo Bait",
  "Striploin - 1 Rib",
  "Striploin - 3 Rib",
  "Intercostals",
  "Rib End Meat",
  "Tenderloin",
  "Tenderloin Side Strap",
  "O.P. Rib / Tomahawk",
  "Cube Roll - 5 Rib",
  "Cube Roll - 7 Rib",
  "Rib Cap",
  "Rib Blade Meat",
  "Chuck Rib",
  "Short Rib",
  "Rump",
  "Rostbiff",
  "Rump Cap",
  "Tri Tip",
  "Outside Flat",
  "Eye Round",
  "Knuckle",
  "Inside",
  "Blade / Clod",
  "Oyster Blade",
  "Bolar Blade",
  "Shoulder Tender",
  "Chuck Tender",
  "Chuck Roll",
  "Chuck Tail Flap",
  "Chuck Crest",
  "Shin Shank",
  "Patela Bones",
  "Aitch Bone",
  "Chuck Rib Bone",
  "Vertebrae",
]

// List of shifts
const shifts = [
  "GOLD",
  "GOLD NIGHT",
  "GREEN",
  "GREEN NIGHT"
]

// List of cattle types
const cattleTypes = [
  "Treated",
  "Wagyu",
  "Angus"
]

// Add a new row to the table
document.getElementById("add-row").addEventListener("click", function () {
  const tableBody = document.getElementById("table-body")
  const newRow = document.createElement("tr")

  // Create product dropdown
  let productDropdown = '<select class="product">'
  products.forEach((product) => {
    productDropdown += `<option value="${product}">${product}</option>`
  })
  productDropdown += "</select>"

  // Create shift dropdown
  let shiftDropdown = '<select class="shift">'
  shifts.forEach((shift) => {
    shiftDropdown += `<option value="${shift}">${shift}</option>`
  })
  shiftDropdown += "</select>"

  // Create cattle type dropdown
  let cattleTypeDropdown = '<select class="cattle-type">'
  cattleTypes.forEach((cattleType) => {
    cattleTypeDropdown += `<option value="${cattleType}">${cattleType}</option>`
  })
  cattleTypeDropdown += "</select>"

  // Adding all input fields as per the updated column names
  newRow.innerHTML = `
        <td>${productDropdown}</td>
        <td>${shiftDropdown}</td>
        <td>${cattleTypeDropdown}</td>
        <td><input type="number" class="kill-floor"></td>
        <td><input type="number" class="bonning-room"></td>
        <td><input type="number" class="ecchy"></td>
        <td><input type="number" class="bruising"></td>
        <td><input type="number" class="myositis"></td>
        <td><input type="number" class="butchershop"></td>
        <td><input type="number" class="dark-cutter"></td>
        <td><input type="number" class="non-halal"></td>
        <td><input type="number" class="downgrades"></td>
        <td><input type="number" class="downgrades-mb2"></td>
        <td><input type="number" class="downgrades-mb4"></td>
        <td><input type="text" class="other"></td>
        <td><input type="number" class="total" disabled></td>
    `
  tableBody.appendChild(newRow)

  // Add event listeners to all input fields in the new row
  addTotalCalculation(newRow)
})

// Function to add event listeners for total calculation
function addTotalCalculation(row) {
  const inputs = row.querySelectorAll('input[type="number"]')
  inputs.forEach(input => {
    input.addEventListener('input', () => calculateTotal(row))
  })
}

// Function to calculate the total
function calculateTotal(row) {
  const totalInput = row.querySelector('.total')
  const inputs = row.querySelectorAll('input[type="number"]')
  let total = 0
  inputs.forEach(input => {
    const value = parseFloat(input.value) || 0
    total += value
  })
  totalInput.value = total
}

// Save data locally in the browser
document.getElementById("save-data").addEventListener("click", function () {
  const tableRows = document.querySelectorAll("#table-body tr")
  const tableData = Array.from(tableRows).map((row) => {
    return {
      product: row.querySelector(".product").value,
      shift: row.querySelector(".shift").value,
      cattleType: row.querySelector(".cattle-type").value,
      killFloor: row.querySelector(".kill-floor").value,
      bonningRoom: row.querySelector(".bonning-room").value,
      ecchy: row.querySelector(".ecchy").value,
      bruising: row.querySelector(".bruising").value,
      myositis: row.querySelector(".myositis").value,
      butchershop: row.querySelector(".butchershop").value,
      darkCutter: row.querySelector(".dark-cutter").value,
      nonHalal: row.querySelector(".non-halal").value,
      downgrades: row.querySelector(".downgrades").value,
      downgradesMB2: row.querySelector(".downgrades-mb2").value,
      downgradesMB4: row.querySelector(".downgrades-mb4").value,
      other: row.querySelector(".other").value,
      total: row.querySelector(".total").value,
    }
  })
  localStorage.setItem("tableData", JSON.stringify(tableData))
  alert("Data saved locally")
})

// Export data to Excel (CSV format)
document.getElementById("export-data").addEventListener("click", function () {
  const tableRows = document.querySelectorAll("#table-body tr")
  let tableData = [
    [
      "Product",
      "Shift",
      "Cattle Type",
      "Kill Floor (KF)",
      "Bonning Room (B/R)",
      "Ecchy",
      "Bruising",
      "Myositis/Dog Bite",
      "Butchershop",
      "Dark Cutter/EK",
      "Non-Halal",
      "Downgrades",
      "Downgrades MB2+",
      "Downgrades MB4+",
      "Other (Please Specify)",
      "Total",
    ],
  ]

  tableRows.forEach(row => {
    tableData.push([
      row.querySelector(".product").value,
      row.querySelector(".shift").value,
      row.querySelector(".cattle-type").value,
      row.querySelector(".kill-floor").value,
      row.querySelector(".bonning-room").value,
      row.querySelector(".ecchy").value,
      row.querySelector(".bruising").value,
      row.querySelector(".myositis").value,
      row.querySelector(".butchershop").value,
      row.querySelector(".dark-cutter").value,
      row.querySelector(".non-halal").value,
      row.querySelector(".downgrades").value,
      row.querySelector(".downgrades-mb2").value,
      row.querySelector(".downgrades-mb4").value,
      row.querySelector(".other").value,
      row.querySelector(".total").value,
    ])
  })

  const csvContent = "data:text/csv;charset=utf-8," +
    tableData.map(e => e.join(",")).join("\n")
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "data.csv")
  document.body.appendChild(link)
  link.click()
})
