class Storage {
  // Static Methods
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }
    return calorieLimit;
  }
  static SetCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }
  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    return totalCalories;
  }
  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }
  static getTotalFats(defaultFats = 0) {
    let totalFats;
    if (localStorage.getItem('totalFats') === null) {
      totalFats = defaultFats;
    } else {
      totalFats = +localStorage.getItem('totalFats');
    }
    return totalFats;
  }
  static updateTotalFats(fats) {
    localStorage.setItem('totalFats', fats);
  }
  static getTotalCarbs(defaultCarbs = 0) {
    let totalCarbs;
    if (localStorage.getItem('totalCarbs') === null) {
      totalCarbs = defaultCarbs;
    } else {
      totalCarbs = +localStorage.getItem('totalCarbs');
    }
    return totalCarbs;
  }
  static updateTotalCarbs(carbs) {
    localStorage.setItem('totalCarbs', carbs);
  }
  static getTotalProteins(defaultProteins = 0) {
    let totalProteins;
    if (localStorage.getItem('totalProteins') === null) {
      totalProteins = defaultProteins;
    } else {
      totalProteins = +localStorage.getItem('totalProteins');
    }
    return totalProteins;
  }
  static updateTotalProteins(proteins) {
    localStorage.setItem('totalProteins', proteins);
  }
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }
  static saveMeal(meal) {
    const meals = this.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  static removeMeal(id) {
    const meals = this.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }
  static saveWorkout(workout) {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  static removeWorkout(id) {
    const workouts = this.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  static clearAll() {
    //localStorage.clearAll();
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');
    localStorage.removeItem('totalFats');
    localStorage.removeItem('totalCarbs');
    localStorage.removeItem('totalProteins');
  }
}

export default Storage;
