const bcrypt = require('bcrypt');

// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
// });



bcrypt.hash("myPlaintextPassword", 10, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash)
    // $2b$10$H3GGukmuNHffGnRojbYH0OnTzcgJKLVc1M2V0Yen/VeJpgr.tY7hm
});


// bcrypt.compareSync(myPlaintextPassword, hash); // true
// bcrypt.compareSync(someOtherPlaintextPassword, hash); // false



bcrypt.compare("myPlaintextPassword", '$2b$10$H3GGukmuNHffGnRojbYH0OnTzcgJKLVc1M2V0Yen/VeJpgr.tY7hm', function (err, result) {
    // result == true
    console.log(result)
});
bcrypt.compare("someOtherPlaintextPassword", "$2b$10$H3GGukmuNHffGnRojbYH0OnTzcgJKLVc1M2V0Yen/VeJpgr.tY7hm", function (err, result) {
    // result == false
    console.log(result)
});


