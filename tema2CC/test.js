// const mongo = require('mongodb').MongoClient;
// let dbManager = require('./dbManager')();
// const url = 'mongodb://localhost:27017';

// let heroes = [
//     {
//         'hero':'batman',
//         'name':'Bruce Wayne',
//         'affiliates':'Robin,Dick Grayson,James Gordon,Night Wing,BatWoman',
//         'aliases':'The Dark Knight of Gotham City, The Knight of Gotham, The Bat of Gotham',
//         'enemies':'Joker, ClayFace, The Penguin',
//         'first appearance':'Detective Comics #13',
//         'movies':'The Dark Knight Trilogy',
//         'teams':'Justice League, Bat Family'
//     },
    // {
    //     'hero':'atom',
    //     'name':'Ray Palmer',
    //     'affiliates':'Members of Justice League Unlimited',
    //     'aliases':'The Atom',
    //     'enemies':'Villains of DCU',
    //     'first appearance':'Detective Comics #1332',
    //     'movies':'None',
    //     'teams':'Justice League'
    // },
//     {
//         'hero':'superman',
//         'name':'Clark Kent/Kal-El',
//         'affiliates':'Louis Lane, Kara-El',
//         'aliases':'The Man of Steel',
//         'enemies':'Doomsday, Lex Luthro, Darkside',
//         'first appearance':'Detective Comics #1',
//         'movies':'Superman Saga, Man of Steel',
//         'teams':'Justice League'
//     }
// ]

// let villains = [
//     {
//         'villain':'joker',
//         'name':'Unknown',
//         'affiliates':'Harley Quinn, Toy Maker, The Puppet Master',
//         'aliases':'Red Hood, The Clown Prince of Crime',
//         'enemies':'Batman and any other super-hero',
//         'first appearance':'Detective Comics #30',
//         'movies':'The Dark Knight, Suicide Squad',
//         'teams':'Injustice League, Legion of Doom'
//     },
//     {
//         'villain':'lexluthor',
//         'name':'Alexander Luthor',
//         'affiliates':'villains of the DCU',
//         'aliases':'The Smartest Man on Earth',
//         'enemies':'Super-Man and any other hero of the DCU',
//         'first appearance':'Detective Comics #10',
//         'movies':'Superman Saga',
//         'teams':'Injustice League, Legion of Doom'
//     },
//     {
//         'villain':'darkside',
//         'name':'Darkside',
//         'affiliates':'villains of the DCU, grandma',
//         'aliases':'The Ruller of Apocalypse',
//         'enemies':'Super-Man,Batman and other heroes of the DCU',
//         'first appearance':'Detective Comics #144',
//         'movies':'None',
//         'teams':'None'
//     }
// ]

// let movies = [
//     {
//         'title':'Batman vs Superman:Dawn Of Justice',
//         'heroes':['Batman','Superman','WonderWoman'],
//         'villains':['LexLuthor','Doomsday'],
//         'budget':'250 millions $',
//         'imdbRating':'6.5',
//         'release_date':'8/03/2016'
//     },
//     {
//         'title':'Aquaman',
//         'heroes':['Aquaman'],
//         'villains':['Orm','BlackManta'],
//         'budget':'200 millions $',
//         'imdbRating':'7.0',
//         'release_date':'21/12/2018'
//     }
// ]

// mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
//     db = client.db('myDb');
//     // dbManager.insertDocuments(db,movies,'movies',(res)=>{
//     //     client.close();
//     // });
//     // dbManager.insertDocuments(db,[{
//     //     'hero':'Batman',
//     //     'name':'Bruce Wayne'
//     // }],'heroes',(res)=>{
//     //     console.log('inserted');
//     //     client.close();
//     // });
//     dbManager.findDocuments(db,'movies',{},(res)=>{
//         console.log(res);
//         client.close();
//     });
//     // dbManager.updateDocument(db,'heroes',{'hero':'Batman'},{'hero':'Atom','name':'Ray Palmer'},(res)=>{
//     //     dbManager.findDocuments(db,'heroes',{},(res)=>{
//     //         console.log(res);
//     //         client.close();
//     //     });
//     // });
//     // dbManager.removeDocument(db, 'heroes', {}, (res) => {
//     //     dbManager.findDocuments(db, 'heroes', {}, (res) => {
//     //         console.log(res);
//     //         client.close();
//     //     });
//     // });
// });

// let a = ' Ana,Dana';
// a = a.trim();
// a.replace(',','.');
// a.toLowerCase();
// console.log(a.replace(',','_'));

let a = {
    'ana':'are mere'
};
for(let x in a){
    console.log(x);
}
// console.log('ana are mere' in a);