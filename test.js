function testValidation(people, input, trait) {
  let found = false;
  //
  for (let i = 0; i < people.length; i++) {
    if (people[i].firstName == input) {
      found = true;
      break;
    }
  }
  return found
}
