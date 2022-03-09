function test(people) {
  let input = "Billy";
  let trait = "firstName";
  let results = testValidation(people, input, trait);
  console.log(results)
}

function testValidation(people, input, traits) {
  let trait = traitsValidation(traits)
  let key = 1;
  let found = false;
  const keys = [
    "id",
    "firstName",
    "lastName",
    "gender",
    "dob",
    "height",
    "weight",
    "eyeColor",
    "occupation",
    "parents",
    "currentSpouse",
  ];

  if (keys.includes(trait)) {
    for (let i = 0; i < people.length; i++) {
      if (people[i][keys[key]] == input) {
        found = true;
        break;
      }
      
    }
  } else {
    alert("Not valid entry");
    return testValidation(people, input, trait);
  }
  return found;
}


function traitsValidation(trait) {
  

  
}