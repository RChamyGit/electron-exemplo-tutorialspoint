var $ = require('jquery')  // jQuery now loaded and assigned to $
let fs = require('fs')
let filename = 'contacts'
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile('contacts', name + ',' + email + '\n',  function (err) {
    if (err) throw err;
    console.log('Saved!');
  })

   addEntry(name, email)
})

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()

let count = 0
$('#click-counter').text(count.toString())

$('#countbtn').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
   console.log("ayyy")
}) 


// var stream = fs.createWriteStream("append.txt", {flags:'a'});
// console.log(new Date().toISOString());
// [...Array(10000)].forEach( function (item,index) {
//     stream.write(index + "\n");
// });
// console.log(new Date().toISOString());
// stream.end(); recomendacao p log  - milhares