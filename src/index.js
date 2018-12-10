import Modal from './modal.js';

let template = document.getElementById('modal-template').innerHTML;
let tag1 = document.getElementById('id1');
let tag2 = document.getElementById('id2');
let tag3 = document.getElementById('id3');

let modal1 = new Modal(tag1, {
    mode: '',
    text: '啦啦啦,德玛西亚!tag1',
    template: template,
    close: function(){
        console.log('close tag1')
    }
});

let modal2 = new Modal(tag2, {
    mode: 'alert',
    text: '兽人永不为奴!tag2',
    template: template,
    success: function(){
        console.log('兽人永不为奴')
    },
    close: function(){
        console.log('close tag2')
    }
});

let modal3 = new Modal(tag3, {
    mode: 'confirm',
    text: '德玛西亚!tag3',
    template: template,
    success: function(){
        console.log('德玛西亚')
    },
    close: function(){
        console.log('close tag3')
    }
});