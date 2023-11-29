class FoodData {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

function comp(f1, f2) {
    if (f1.price < f2.price) return -1;
    else if (f1.price > f2.price) return 1;
    return 0;
}

v = [];

const main = () => {
    document.getElementById('outputtable').innerHTML = '';
    let texts = document.getElementById('menua').value;
    v = texts.split('\n');

    const border = parseInt(document.getElementById('bordernum').value);
    const allFoodData = [];
    const output = [];
    const idFoodData = {};

    for (let i = 0; i < v.length; i++) {
        const [name, price] = v[i].split(',');
        if (name.substr(0,1) == '#') continue;
        if (name.substr(0,1) == '') continue;
        if (parseInt(price) == 0) continue;
        const id = i;
        const fd = new FoodData(id, name, parseInt(price));
        allFoodData.push(fd);
        idFoodData[id] = fd;
    }

    allFoodData.sort(comp);
    console.log(v);
    let now = border;

    while (now >= allFoodData[0].price) {
        const searchData = new FoodData(0, null, now);
        let ModNum = allFoodData.findIndex(element => element.price > searchData.price);
        if (ModNum == -1) ModNum = allFoodData.length;
        const idx = (ModNum > 0 ? Math.floor(Math.random() * 1000000) % ModNum : -1);

        if (idx === -1) break;

        const addData = allFoodData[idx];
        output.push(addData);
        now -= addData.price;
    }
    let sm = 0;
    for (let i = 0; i < output.length; i++) {
        const fd = idFoodData[output[i].id];
        console.log(`${fd.name} ${fd.price}`);
        sm += fd.price;
        document.getElementById('outputtable').innerHTML +=  `<tr><td>${i+1}</td><td>${fd.name}</td> <td>${fd.price}円</td></tr>`;
    }
    document.getElementById('totalarea').textContent = sm;
};

document.getElementById('runbtn').addEventListener('click', main);

let is_hidden = false;
document.getElementById('hiddenbtn').addEventListener('click', () => {
    document.getElementById('outputarea').style.height = (is_hidden ? '40vh' : '80vh') ;
    document.getElementById('menua').style.display = (is_hidden ? 'block' : 'none');
    is_hidden = !is_hidden;
});