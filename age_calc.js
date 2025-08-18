// Age Calc
window.addEventListener("DOMContentLoaded", () => {
  const birthDate = new Date("1998-01-01");

  function calculateAge(birthday) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  const ageElementPT = document.getElementById("age");
  if (ageElementPT) {
    ageElementPT.textContent =
      `Olá, chamo-me André Oliveira e tenho ${calculateAge(birthDate)} anos.`;
  }

  const ageElementEN = document.getElementById("age_en");
  if (ageElementEN) {
    ageElementEN.textContent =
      `Hello, my name is André Oliveira and I am ${calculateAge(birthDate)} years old.`;
  }
});
