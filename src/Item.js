// 2. Create a class for meals with nutrients, category and calories
class Meal {
  constructor(name, calories, fats, carbs, proteins, category) {
    this.id = Math.random().toString(16).slice(2); //16 base random nber
    this.name = name;
    this.calories = calories;
    this.fats = fats;
    this.carbs = carbs;
    this.proteins = proteins;
    this.category = category;
  }
}
// 3. Create a class for workouts
class Workout {
  constructor(name, calories, category) {
    this.id = Math.random().toString(16).slice(2); //16 base random nber
    this.name = name;
    this.calories = calories;
    this.category = category;
  }
}

export { Meal, Workout };
