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

  // Adding all input fields as per the updated column names
  newRow.innerHTML = `
        <td>${productDropdown}</td>
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
})

// Save data locally in the browser
document.getElementById("save-data").addEventListener("click", function () {
  const tableRows = document.querySelectorAll("#table-body tr")
  const tableData = Array.from(tableRows).map((row) => {
    return {
      product: row.querySelector(".product").value,
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
      "Kill Floor",
      "Bonning Room",
      "Ecchy",
      "Bruising",
      "Myositis",
      "Butchershop",
      "Dark Cutter",
      "Non-Halal",
      "Downgrades",
      "Downgrades MB2+",
      "Downgrades MB4+",
      "Other",
      "Total",
    ],
  ]

  Array.from(tableRows).forEach((row) => {
    tableData.push([
      row.querySelector(".product").value,
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

  let csvContent =
    "data:text/csv;charset=utf-8," +
    tableData.map((e) => e.join(",")).join("\n")

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "table_data.csv")
  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)
})
console.log('Script loaded');
