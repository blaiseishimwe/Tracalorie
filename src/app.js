import '@fortawesome/fontawesome-free/js/all.js';
import { Modal, Collapse } from 'bootstrap';
import './css/bootstrap.css';
import './css/style.css';
import CalorieTracker from './Tracker.js';
import { Meal, Workout } from './Item.js';

// 5. Create a class for the app (putting everything together)
class App {
  constructor() {
    // instantiate _tracker, prop of App and instance of CalorieTracker class
    this._tracker = new CalorieTracker();
    this._tracker.loadItems();
    // add event listeners of the App
    this._loadEventListeners();
  }
  _loadEventListeners() {
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal')); // use bind method to target the instance of App specifically instead of the element it's attached on.
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));
    // Display Macros event
    document
      .getElementById('meal-items')
      .addEventListener('click', this._displayMacro.bind(this));
    // Convert Macros to cal event///////
    document
      .getElementById('macros')
      .addEventListener('click', this._convertMacros.bind(this));
    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal')); //event delegation
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout')); //event delegation
    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItems.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItems.bind(this, 'workout'));
    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));
    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  // create event handler _newItem()
  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    const fats = document.getElementById('meal-fats');
    const carbs = document.getElementById('meal-carbs');
    const proteins = document.getElementById('meal-proteins');
    const category = document.getElementById(`${type}-category`);

    // Validate inputs
    if (name.value === '' || calories.value === '' || category.value === '') {
      alert('Please fill in all fields.');
      return;
    }
    if (type === 'meal') {
      if (fats.value === '' || carbs.value === '' || proteins.value === '') {
        alert('Please fill in all fields.');
        return;
      } else {
        const meal = new Meal(
          name.value,
          +calories.value, // convert str to nber using '+'
          +fats.value,
          +carbs.value,
          +proteins.value,
          category.value
        );
        this._tracker.addMeal(meal);
        fats.value = '';
        carbs.value = '';
        proteins.value = '';
      }
    } else {
      const workout = new Workout(
        name.value,
        +calories.value, // convert str to nber using '+'
        category.value
      );
      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';
    category.value = '';

    // https://getbootstrap.com/docs/5.3/components/accordion/#events
    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }
  // _displaMacro() Handler
  _displayMacro(e) {
    if (e.target.classList.contains('mx-1')) {
      const id = e.target.closest('.card').getAttribute('data-id');
      this._tracker.displayMacro(id);
      console.log(id);
    }
    //alert(e.target.classList);
  }
  // _convertMacros() handler
  _convertMacros(e) {
    if (e.target.id === 'fats-consumed') {
      const fats = +e.target.innerHTML;
      alert(
        `Fats are the most energy-dense macronutrient, providing more than twice the energy of protein or carbs but not all fats are equal; health experts recommend focusing on unsaturated (healthy) fats while limiting saturated and trans fats for better heart health. ${fats} grams of fats provide ${
          fats * 9
        } calories.`
      );
    } else if (e.target.id === 'carbs-consumed') {
      const carbs = +e.target.innerHTML;
      alert(
        `Carbohydrates provide 4 calories per gram, a standard conversion used in nutrition labeling, meaning to find calories from carbs, you multiply the grams of carbs by four. ${carbs} grams of carbs provide ${
          carbs * 4
        } calories.`
      );
    } else if (e.target.id === 'proteins-consumed') {
      const proteins = +e.target.innerHTML;
      alert(
        `Protein provides 4 calories per gram, the same as carbohydrates. Protein is crucial for growth, muscle repair, and energy. Your body burns more calories digesting protein (Thermic Effect of Food) than carbs or fat, making it beneficial for weight management. To find calories from proteins, you multiply the grams of proteins by four. ${proteins} grams of proteins provide ${
          proteins * 4
        } calories.`
      );
    }
  }
  // _removeItem() handler
  _removeItem(type, e) {
    // target the btn
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('delete item?')) {
        // get the target data-id
        const id = e.target.closest('.card').getAttribute('data-id');
        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest('.card').remove();
      }
    }
  }
  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById('limit');
    if (limit.value === '') {
      alert('Please add a limit.');
      return;
    }
    this._tracker.setLimit(+limit.value);
    limit.value = '';
    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
  _reset() {
    // clear sored data
    this._tracker.reset();
    // clear DOM
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }
}

const app = new App();
