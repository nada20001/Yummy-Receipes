let nameSearch = document.querySelector("#byName");
let letterSearch = document.querySelector("#byLetter");
let card = document.querySelector(".displayMeals");
let categoryCard = document.querySelector(".displayCtegories");
let navLinks = document.querySelectorAll(".links a ");
let searchInputs = document.querySelector(".searchInputs");
let site = document.querySelector(".siteSection");
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAge = document.getElementById("age");
let userPassword = document.getElementById("password");
let userRePassword = document.getElementById("rePassword");
let userNameAlert = document.getElementById("namealert");
let userEmailAlert = document.getElementById("emailalert");
let userPhoneAlert = document.getElementById("phonealert");
let userAgeAlert = document.getElementById("agealert");
let userpasswordAlert = document.getElementById("passwordalert");
let userRepasswordAlert = document.getElementById("repasswordalert");
console.log(navLinks);
let mealsList = [];

// loading screen
search("").then(() => {
  $(".loading-screen").fadeOut(500, () => {
    $("body").css("overflow", "visible");
  });
});

$(document).ready(function () {
  $(".loading-screen").fadeOut(1000);
});
// side Navbar
$(".menu i").click(function () {
  let navWidth = $("#sideNav").outerWidth();
  if ($(".sideNav-container").css("left") == "0px") {
    $(".sideNav-container").animate({ left: `-${navWidth}` }, 500);
  } else {
    $(".sideNav-container").animate({ left: "0px" }, 500);
  }
});
// search
async function search(word) {
  $(".loading-screen").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  meals = await meals.json();
  mealsList = meals.meals.splice(0, 20);
  displayMeals();
  $(".loading-screen").fadeOut(400);
  return meals;
}
async function getByLetter(letter) {
  if (letter) {
    $(".loading-screen").fadeIn(100);
    let meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    meals = await meals.json();

    arr = meals.meals.splice(0, 20);
    displayMeals();

    $(".loading-screen").fadeOut(100);
  }
}
function displayMeals() {
  let meals = "";
  for (let i = 0; i < mealsList.length; i++) {
    meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  ">
            <div onclick="getMeal('${mealsList[i].idMeal}')" class="meal-card   position-relative">
                <div class="post ">
                    <img src='${mealsList[i].strMealThumb}' class="w-100 " />
                    <div class="overlay d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${mealsList[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  }
  site.innerHTML = meals;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

// get and display all categories..
async function allCategories() {
  let categoryApiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let finalList = await categoryApiResponse.json();
  mealsList = finalList.categories.splice(0, 20);
  // console.log(mealsList);
  displayCategories();
}
function displayCategories() {
  let category = "";
  for (var i = 0; i < mealsList.length; i++) {
    category += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="meal-card trxt-center position-relative">
            <div onclick="filterByCategory('${
              mealsList[i].strCategory
            }')" class="post">
                <img src='${
                  mealsList[i].strCategoryThumb
                }' class="w-100 rounded" />
                <div class="overlay d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${mealsList[i].strCategory}</h2>
                        <p>${mealsList[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  }
  site.innerHTML = category;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
async function filterByCategory(category) {
  $(".loading-screen").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  meals = await meals.json();

  mealsList = meals.meals.splice(0, 20);
  displayMeals();
  $(".loading-screen").fadeOut(500);
}

// get and display all area
async function allArea() {
  let areaApiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let finalList = await areaApiResponse.json();
  mealsList = finalList.meals.splice(0, 20);
  // console.log(mealsList);
  displayArea();
}
function displayArea() {
  let area = "";
  for (var i = 0; i < mealsList.length; i++)
    area += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="meal-card  position-relative text-center">
            <div onclick=(filterByArea('${mealsList[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${mealsList[i].strArea}</h2>
            </div>
        </div>
    </div>`;
  site.innerHTML = area;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}
async function filterByArea(area) {
  $(".loading-screen").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  meals = await meals.json();
  mealsList = meals.meals.slice(0, 20);
  displayMeals();
  $(".loading-screen").fadeOut(500);
}

// allIngredients;
async function allIngredients() {
  let areaApiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let finalList = await areaApiResponse.json();
  mealsList = finalList.meals.splice(0, 20);
  // console.log(mealsList);
  displayIngredients();
}
function displayIngredients() {
  let ingredint = "";
  for (let i = 0; i < mealsList.length; i++) {
    ingredint += `
    <div class="col-md-6 col-lg-3 my-3  ">
        <div  onclick="getMainIngredient('${
          mealsList[i].strIngredient
        }')" class=" meal-card  text-center position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${mealsList[i].strIngredient}</h2>
                <p class="text-white">${mealsList[i].strDescription
                  .split(" ")
                  .splice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
    site.innerHTML = ingredint;

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      200
    );
  }
}
async function getMainIngredient(mealName) {
  $(".loading-screen").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`
  );
  meal = await meal.json();
  mealsList = meal.meals;
  displayMeals();
  $(".loading-screen").fadeOut(500);
}

// click on specified meal
async function getMeal(mealID) {
  // $(".loading-screen").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  displayMeal(meal.meals[0]);
  $(".loading-screen").fadeOut(500);
}
function displayMeal(meal) {
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `
   <li class="my-3 mx-1 p-1 alert-success fs-10px " id="recipe">${
     meal[`strMeasure${i}`]
   } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags.split(",");
  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `
    <li class="my-3 mx-1 p-1 alert-danger   "id="tag-item">${tags[i]}</li>`;
  }
  let info = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn bg-danger youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`;
  site.innerHTML = info;
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tag;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

// contact

function validUserName() {
  let regex = /[A-Z][a-z]$/;
  if (regex.test(userName.value == true)) {
    return true;
  } else {
    return false;
  }
}
function validUserEmail() {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(userEmail.value == true)) {
    return true;
  } else {
    return false;
  }
}
//
function validUserPhone() {
  let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regex.test(userPhone.value == true)) {
    return true;
  } else {
    return false;
  }
}
function validUserAge() {
  let regex = /^[1-9][0-9]?$|^100$/;
  if (regex.test(userAge.value == true)) {
    return true;
  } else {
    return false;
  }
}
function validPassword() {
  let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (regex.test(userPassword.value == true)) {
    return true;
  } else {
    return false;
  }
}
function validRePassword() {
  if (userPassword.value == userRePassword.value) {
    return true;
  } else {
    return false;
  }
}

function checkValidation() {
  $(userName).on("focus", function () {
    if (validUserName()) {
      userName.classList.remove("is-invalid");
      userName.classList.add("is-valid");
      userNameAlert.classList.replace("d-block", "d-none");
      userNameAlert.classList.replace("d-block", "d-none");
    } else {
      userName.classList.replace("is-valid", "is-invalid");
      userNameAlert.classList.replace("d-none", "d-block");
    }
  });
  if (
    validUserName() == true &&
    validUserEmail() == true &&
    validUserPhone() == true &&
    validUserAge() == true &&
    validPassword() == true &&
    validRePassword() == true
  ) {
    document.getElementById("submitBtn").remove("disabled");
  } else document.getElementById("submitBtn").setAttribute("disabled", "true");
}

//to display site of clicked link..
$(".links .link a ").click(async (eventInfo) => {
  let clickedLink = eventInfo.target.getAttribute("link-name");
  $("html", "body").animate({ scrollTop: 0 }, 1000);
  searchInputs.innerHTML = "";
  site.innerHTML = "";

  // to display search site
  if (clickedLink == "search") {
    site.innerHTML = "";

    searchInputs.innerHTML = `
    <div class="container">
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control text-white" id="byName" />
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control text-white" id="byLetter" />
          </div>
        </div>
      </div>`;
    $("#byName").keyup((eventInfo) => {
      search(eventInfo.target.value);
    });
    $("#byLetter").keyup((eventInfo) => {
      getByLetter(eventInfo.target.value);
    });
  }
  // to display category site
  if (clickedLink == "categories") {
    allCategories();
  }
  // to display area site
  if (clickedLink == "area") {
    allArea();
  }
  // to display ingredients site
  if (clickedLink == "ingredients") {
    allIngredients();
  }
  // to display contact site
  if (clickedLink == "contact") {
    site.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light text-center mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control  " onkeyup="checkValidation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>
<div class="d-flex justify-content-center text-center mt-3 ">
			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger " >Submit</button>
		</div></div>
</div>
	</section>`;
  }
});
