const person = {
  name: "Anand",
  address: {
    line: 5,
    city: "Mumbai",
  },
  72: 52,
  profiles: ["Twitter", "Instagram", "Linkedin"],
  allprofiles: () => {
    person.profiles.map((profile) => console.log(profile));
  },
};

function LearningJavascript() {
  return (
    <>
      <div className="LearningJavascript">Learning JavaScript</div>
      <div>{person.name}</div>
      <div>{person.address.city}</div>
      <div>{person.address.line}</div>
      <div>{person[72]}</div>
      <div>{person.profiles[1]}</div>
      <div>{person.allprofiles()}</div>
    </>
  );
}

export default LearningJavascript;
