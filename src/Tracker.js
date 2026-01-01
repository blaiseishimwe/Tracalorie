import Storage from './Storage';

// 1. Create a calorie tracker class that takes meals and workouts energies
class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0); //Total
    this._totalFats = Storage.getTotalFats(0);
    this._totalCarbs = Storage.getTotalCarbs(0);
    this._totalProteins = Storage.getTotalProteins(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayFatsConsumed();
    this._displayCarbsConsumed();
    this._displayProteinsConsumed();
    this._displayCaloriesProgress();
    document.getElementById('limit').value = this._calorieLimit;
  }
  // Public Methods/API //
  // create a meal, update _totals and add it to the _meals array
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._totalFats += meal.fats;
    Storage.updateTotalFats(this._totalFats);
    this._totalCarbs += meal.carbs;
    Storage.updateTotalCarbs(this._totalCarbs);
    this._totalProteins += meal.proteins;
    Storage.updateTotalProteins(this._totalProteins);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }
  removeMeal(id) {
    const index = this._meals.findIndex((item) => item.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._totalFats -= meal.fats;
      Storage.updateTotalFats(this._totalFats);
      this._totalCarbs -= meal.carbs;
      Storage.updateTotalCarbs(this._totalCarbs);
      this._totalProteins -= meal.proteins;
      Storage.updateTotalProteins(this._totalProteins);
      this._meals.splice(index, 1);
      Storage.removeMeal(id);
      this._render();
    }
  }

  // Display Meal Macro
  displayMacro(id) {
    const index = this._meals.findIndex((item) => item.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      alert(
        `This ${meal.name} has the following macros: ${
          meal.carbs
        } grams of carbs, ${meal.fats} grams of fats, and ${
          meal.proteins
        } grams of proteins with a total of ${
          meal.calories
        } calories. Carbs, Fats and Proteins provide 4, 9 and 4 calories per gram respectively. These values are relatively approximate. ${
          meal.carbs * 4
        }, ${meal.fats * 9} and ${
          meal.proteins * 4
        } calories from carbs, fats and proteins respectively.  `
      );
    }
  }

  // create a workout, update _totalCalories and add it to the _workouts array
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((item) => item.id === id);
    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.SetCalorieLimit(calorieLimit);
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  reset() {
    this._totalCalories = 0;
    this._totalFats = 0;
    this._totalCarbs = 0;
    this._totalProteins = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }
  // Private Methods //

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
    console.log('calories total');
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const caloriesConsumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = caloriesConsumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const caloriesBurned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = caloriesBurned;
    // Might want to add Basal Metabolic //
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const caloriesRemaining = this._calorieLimit - this._totalCalories; // Might want to change to caloriesRemaining = this._calorieLimit - caloriesConsumed //
    caloriesRemainingEl.innerHTML = caloriesRemaining;

    if (caloriesRemaining < 500 && caloriesRemaining > 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-warning'
      );
    } else if (caloriesRemaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-warning'
      );

      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger',
        'bg-warning'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
    }
  }

  _displayFatsConsumed() {
    const fatsConsumedEl = document.getElementById('fats-consumed');
    fatsConsumedEl.innerHTML = this._totalFats;
    if (this._totalFats > 44 && this._totalFats < 78) {
      fatsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-danger',
        'bg-warning'
      );
      fatsConsumedEl.parentElement.parentElement.classList.add('bg-light');
    } else if (this._totalFats >= 0 && this._totalFats <= 44) {
      fatsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-danger'
      );
      fatsConsumedEl.parentElement.parentElement.classList.add('bg-warning');
    } else {
      fatsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-warning'
      );
      fatsConsumedEl.parentElement.parentElement.classList.add('bg-danger');
    }
  }

  _displayCarbsConsumed() {
    const carbsConsumedEl = document.getElementById('carbs-consumed');
    carbsConsumedEl.innerHTML = this._totalCarbs;
    if (this._totalCarbs > 225 && this._totalCarbs < 235) {
      carbsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-danger',
        'bg-warning'
      );
      carbsConsumedEl.parentElement.parentElement.classList.add('bg-light');
    } else if (this._totalCarbs <= 225 && this._totalCarbs >= 0) {
      carbsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-danger'
      );
      carbsConsumedEl.parentElement.parentElement.classList.add('bg-warning');
    } else {
      carbsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-warning'
      );
      carbsConsumedEl.parentElement.parentElement.classList.add('bg-danger');
    }
  }

  _displayProteinsConsumed() {
    const proteinsConsumedEl = document.getElementById('proteins-consumed');
    proteinsConsumedEl.innerHTML = this._totalProteins;
    if (this._totalProteins > 50 && this._totalProteins < 175) {
      proteinsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-danger',
        'bg-warning'
      );
      proteinsConsumedEl.parentElement.parentElement.classList.add('bg-light');
    } else if (this._totalProteins >= 0 && this._totalProteins <= 50) {
      proteinsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-warning'
      );
      proteinsConsumedEl.parentElement.parentElement.classList.add('bg-danger');
    } else {
      proteinsConsumedEl.parentElement.parentElement.classList.remove(
        'bg-light',
        'bg-danger'
      );
      proteinsConsumedEl.parentElement.parentElement.classList.add(
        'bg-warning'
      );
    }
  }

  _displayCaloriesProgress() {
    const progressEL = document.getElementById('calorie-progress');
    const widthPercentage = (this._totalCalories * 100) / this._calorieLimit;
    console.log(widthPercentage);
    const width = Math.min(widthPercentage, 100);
    progressEL.style.width = `${width}%`;
    if (widthPercentage > 100) {
      progressEL.classList.remove('bg-success', 'bg-warning');
      progressEL.classList.add('bg-danger');
    } else if (widthPercentage > 95 && widthPercentage <= 100) {
      progressEL.classList.remove('bg-danger', 'bg-success');
      progressEL.classList.add('bg-warning');
    } else {
      progressEL.classList.remove('bg-danger', 'bg-warning');
      progressEL.classList.add('bg-success');
    }
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name} (touch to view Macros)</h4>
                  <div id="macros"
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                    
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;

    workoutsEl.appendChild(workoutEl);
  }
  _render() {
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayFatsConsumed();
    this._displayCarbsConsumed();
    this._displayProteinsConsumed();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
