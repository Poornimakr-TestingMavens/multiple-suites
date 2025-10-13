// utils/test-data.ts
export const testData = {
  form: {
    name: "", // Randomized before each test
    email: "charles@test.com",
    phone: "9876543210",
    address: "Kerala, India",
    gender: "Female",
    experience: "Intermediate",
    hobbies: ["Reading", "Music"],
    skills: ["JavaScript", "Python"],
    terms: true,
    newsletter: true,
    comments: "No additional comments"
  },

  movieStars: [
    "Robert Downey Jr.",
    "Scarlett Johansson",
    "Leonardo DiCaprio",
    "Jennifer Lawrence",
    "Chris Hemsworth",
    "Emma Watson",
    "Dwayne Johnson",
    "Angelina Jolie",
    "Tom Hanks",
    "Natalie Portman",
    "Brad Pitt",
    "Margot Robbie",
    "Chris Evans",
    "Gal Gadot",
    "Johnny Depp"
  ]
};

// Utility function to get random movie star
export const getRandomMovieStar = () =>
  testData.movieStars[Math.floor(Math.random() * testData.movieStars.length)];
