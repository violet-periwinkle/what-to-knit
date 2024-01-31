
const answerSpan = document.getElementById('project');
let i = 0;
function getRadioValue(name) {
    let radioBtns = Array.from(document.getElementsByName(name));
    for (btn of radioBtns) {
        if (btn.checked) {
            return radioBtns.indexOf(btn);
        }
    }
}
function checkIsChecked(name) {
    return document.getElementsByName(name)[0].checked;
}
class Project {
    constructor(name, difficulty, size, isAPair) {
        this.name = name;
        this.difficulty = difficulty;
        this.size = size;
        this.isAPair = isAPair;
    }
    describe(){
        const difficultyLevels = ['simple', 'moderately difficult', 'complex'];
        const sizeLevels = ['small', 'medium', 'large'];
        if (this.isAPair){
            return `${this.name} are a ${sizeLevels[this.size]}, ${difficultyLevels[this.difficulty]} project.`
        }else{
            return `a ${this.name} is a ${sizeLevels[this.size]}, ${difficultyLevels[this.difficulty]} project.`
        }
    }
}
class Technique {
    constructor(name, difficulty, multicolor) {
        this.name = name;
        this.difficulty = difficulty;
        this.multicolor = multicolor;
    }
}
const projects = [new Project('socks', 2, 0, true), new Project('mittens', 1, 0, true), new Project('gloves', 2, 0, true), new Project('hat', 0, 0, false), new Project('scarf', 0, 2, false), new Project('sweater', 2, 2, false), new Project('blanket', 1, 2, false), new Project('shawl', 1, 2, false), new Project('mug cozy', 0, 0, false), new Project('coaster', 0, 0, false), new Project('dishcloth', 0, 0, false)];

const techniques = [new Technique('colorwork', 1, true), new Technique('cabled', 1, false), new Technique('striped', 0, true), new Technique('lace', 1, false), new Technique('plain', 0, true), new Technique('textured', 1, false)];

genBtn.addEventListener('click', () => {
    try {
        const eligibleProjects = projects.filter((project) => project.difficulty <= getRadioValue('difficulty')).filter((project) => project.size <= getRadioValue('size'));

        const eligibleTechniques = techniques.filter((technique) => technique.difficulty <= getRadioValue('difficulty')).filter((technique) => {
            if (checkIsChecked('multipleColors')) {
                return true;
            } else {
                return technique.multicolor !== true;
            }
        });
        let resultProject = eligibleProjects[Math.floor(Math.random() * eligibleProjects.length)];
        let resultTechnique = eligibleTechniques[Math.floor(Math.random() * eligibleTechniques.length)];
        if (resultProject.isAPair) {
            answerSpan.textContent = `a pair of ${resultTechnique.name} ${resultProject.name}`;
        } else {
            answerSpan.textContent = `a ${resultTechnique.name} ${resultProject.name}`;
        }
    } catch (error) {
        document.getElementById('sentence').textContent = 'Maybe you should try crochet?'
        console.error(error);
    }
})