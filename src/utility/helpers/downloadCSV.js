import dayjs from "dayjs";

export function convertJSONToCSV(jsonData, columns, filename = "data") {
  const separator = ",";
  const keys = Object.keys(jsonData[0]);
  // columns?.forEach((col)=>{
  //  if(col?.key) keys.push(col?.key)
  // })
  let csv = "";

  // Add the header row
  csv += keys.join(separator) + "\n";

  // Add the data rows
  jsonData.forEach((item) => {
    const values = keys.map((key) => item[key]);
    csv += values.join(separator) + "\n";
  });
  downloadCSV(csv, filename);
  return csv;
}
export function downloadCSV(csv, filename) {
  const link = document.createElement("a");
  link.style.display = "none";
  let current_date = dayjs(new Date()).format("MM/DD/YYYY");
  let current_time = dayjs(new Date()).format("HH:mm");
  // Create a Blob object with the CSV data
  const blob = new Blob([csv], { type: "text/csv" });

  // Set the URL of the <a> element to the Blob URL
  link.href = URL.createObjectURL(blob);

  // Set the filename for the download
  link.download = `${filename}_${current_date}_${current_time}.csv`;

  // Append the <a> element to the document body
  document.body.appendChild(link);

  // Simulate a click on the <a> element to trigger the download
  link.click();

  // Clean up the temporary URL and remove the <a> element
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

// const csvData = convertJSONToCSV(jsonData);

// Download the CSV file
// downloadCSV(csvData);

export function csvDataColumn(data, column, addFieldToCSV) {
  column = JSON.parse(JSON.stringify(column));
  // if (addFieldToCSV == "memberId") {
  //   let insertionObj = {
  //     title: "ClientMemberID",
  //     dataIndex: "memberId",
  //     width: 150,
  //     key: "memberId",
  //     fixed: "left",
  //     sorter: {},
  //   };
  //   column.push(insertionObj);
  // }
  let requireCsvColumn = data.map((item) => {
    let filteredItem = {};
    for (let i = 0; i < column.length; i++) {
      const key = column[i]?.key;
      const title = column[i]?.title;
      const lastNameKey = column[i]?.lastNameKey;
      if (item.hasOwnProperty(key)) {
        filteredItem[title] = item[key]
        // if (column[i]?.type === "date")filteredItem[title] = dayjs(item[key]).format("MM/DD/YYYY");
        // else if (column[i]?.type === "dateTime")
        //   filteredItem[title] = `${dayjs(item[key].slice(0, 10)).format(
        //     "MM/DD/YYYY"
        //   )} ${item[key].slice(10)}`;
        // else filteredItem[title] = item[key];
        // if (lastNameKey)filteredItem[title] = item[key] + " " + item[lastNameKey];
      }else{
        filteredItem[title] = ""
      }
    }

    if (addFieldToCSV) {
    }
    console.log({filteredItem});
    return filteredItem;
  });
  console.log({requireCsvColumn});
  return requireCsvColumn;
}
