const url = new URL(
  "http://teable.pi.local/api/table/tbl6DiJYHNEummvrHwa/record"
);
const params = {
  fieldKeyType: "name",
  take: 1000,
};

Object.entries(params).forEach(([key, value]) => {
  url.searchParams.append(key, value);
});

fetch(url, {
  method: "GET",
  headers: {
    Authorization:
      "Bearer teable_accvkAeqN6tynN46E4O_jaVh6PfbXwVGrJcs2a+8xpWG7S8Homl3scpmA28WWGI=",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
