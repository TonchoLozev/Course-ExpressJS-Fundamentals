const fs = require('fs');
const file = fs.createWriteStream('./file.txt');

for (let i = 0; i <= 1e4; i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, dui id ultricies vestibulum, quam ante pellentesque odio, in cursus massa ipsum eget mi. Donec accumsan, massa rutrum auctor ullamcorper, ipsum nunc efficitur metus, ut malesuada magna lacus ornare lectus. Nunc iaculis dapibus elit tincidunt consequat. Integer a sapien quis erat hendrerit semper. Sed lacinia elit a ex luctus venenatis. Praesent justo est, dignissim eget efficitur non, mattis eu lorem. Cras massa sem, laoreet laoreet tortor vel, tristique dignissim elit. Phasellus rutrum accumsan lorem.')
}

file.end();