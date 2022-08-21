/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */

var minNumberOfHours = function(initialEnergy, initialExperience, energy, experience) {
  const allEnergy = energy.reduce((a, b) => a + b);
  const remainEnergy = allEnergy >= initialEnergy ? allEnergy - initialEnergy + 1 : 0;
  let remainExp = 0;
  experience.forEach((a ) => {
    if(initialExperience > a) initialExperience += a;
    else {
      const cha = a - initialExperience + 1;
      remainExp += cha;
      initialExperience = initialExperience + cha + a;
    }
  })
  return remainExp + remainEnergy;
};

console.log(minNumberOfHours(2, 4, [1], [3]));