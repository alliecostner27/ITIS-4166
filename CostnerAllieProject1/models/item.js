const items = [
    {
        id: '1',
        title: 'Fourth Wing',
        seller: 'Allie Costner',
        condition: 'New',
        price: 17,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit sociosqu sit id nostra tempor ridiculus, nulla at? Mus sodales potenti accumsan torquent bibendum.',
        image: 'images/fourthWing.jpg',  // Updated image path
        active: true
    },
    {
        id: '2',
        title: 'A Court of Thorns and Roses',
        seller: 'Feyre Archeron',
        condition: 'New',
        price: 10,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Lorem consequat odio non turpis taciti posuere purus facilisi eu. Dictum nec curabitur ultrices mollis vehicula mus. Curabitur blandit neque euismod nam convallis faucibus.',
        image: 'images/acotar.jpg',  // Updated image path
        active: true
    },
    {
        id: '3',
        title: 'Throne of Glass',
        seller: 'Aelin Galathynius',
        condition: 'New',
        price: 12,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Massa non consequat maximus auctor sit condimentum. Vestibulum platea rutrum maximus ut varius.',
        image: 'images/tog.jpg',  // Updated image path
        active: true
    },
    {
        id: '4',
        title: 'One Dark Window',
        seller: 'Allie Costner',
        condition: 'New',
        price: 13,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Platea rhoncus a venenatis ut, iaculis fusce. Dui tempor consequat viverra semper proin commodo amet purus.',
        image: 'images/oneDarkWindow.jpg',  // Updated image path
        active: true
    },
    {
        id: '5',
        title: 'Powerless',
        seller: 'Paedyn Gray',
        condition: 'New',
        price: 19,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis cursus tempus proin auctor turpis. Quisque adipiscing dignissim suspendisse; efficitur dis habitasse facilisis fames dolor.',
        image: 'images/powerless.jpg',  // Updated image path
        active: true
    },
    {
        id: '6',
        title: 'Broken Bonds',
        seller: 'North Draven',
        condition: 'New',
        price: 17,
        details: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Vulputate nullam quam donec dignissim interdum morbi nisl convallis. Etiam consequat imperdiet primis; placerat hac magna.',
        image: 'images/brokenBonds.jpg',  // Updated image path
        active: true
    }
];

exports.find = function() {
    return items;
}

exports.findById = function(id) {
    return items.find(item => item.id === id);
}

exports.deleteById = function(id){
    let index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        items.splice(index, 1); //delete 1 object
        return true;
    } else {
        return false;
    }
}