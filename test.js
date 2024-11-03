const reviews = [];

reviews.push({ ratings: 5, comment: "i love this plave" });

reviews.push({ ratings: 4, comment: "best place to live in pune" });

for (const list of reviews) {
  console.log(list.ratings);
  console.log(list.comment);
}
