export const findUser = (username: string) => {
  let array = JSON.parse(localStorage.getItem("db") || "{}");

  return array.filter((value: any) => {
    return username === value.username;
  })[0];
};

export const addRequestToUser = (
  username: string,
  data: { query: string; name: string; maxResults: number }
) => {
  let allData = JSON.parse(localStorage.getItem("db") || "{}");

  allData.forEach((element: any) => {
    if (element.username === username) {
      let foundComparisons = element.requests.filter((value: any) => {
        return data.name === value.name;
      });

      console.log(foundComparisons);

      if (foundComparisons.length === 0) {
        element.requests.push(data);
      }
    }
  });

  return localStorage.setItem("db", JSON.stringify(allData));
};

export const deleteRequest = (username: string, name: string) => {
  let allData = JSON.parse(localStorage.getItem("db") || "{}");

  allData.forEach((element: any) => {
    if (element.username === username) {
      let foundComparisons = element.requests.filter((value: any) => {
        return name === value.name;
      });

      console.log(foundComparisons);

      if (foundComparisons.length !== 0) {
        element.requests.forEach((value: any, index: number) => {
          if (name === value.name) {
            return element.requests.splice(index, 1);
          }
        });
      }
    }
  });

  return localStorage.setItem("db", JSON.stringify(allData));
};

export const editRequest = (
  username: string,
  newData: { query: string; name: string; maxResults: number },
  originalRequestName: string
) => {
  let allData = JSON.parse(localStorage.getItem("db") || "{}");

  allData.forEach((element: any) => {
    if (element.username === username) {
      let foundComparisons = element.requests.filter((value: any) => {
        return originalRequestName === value.name;
      });

      if (foundComparisons.length !== 0) {
        element.requests.forEach((value: any, index: number) => {
          if (originalRequestName === value.name) {
            return element.requests.splice(index, 1, newData);
          }
        });
      }
    }
  });

  console.log(allData);

  return localStorage.setItem("db", JSON.stringify(allData));
};
