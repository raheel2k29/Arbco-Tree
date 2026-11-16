const fs = require('fs');
const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
console.log('Homepage contains "What Our Townsville Customers Say":', html.includes('What Our Townsville Customers Say'));
console.log('Homepage contains "Read Our Google Reviews":', html.includes('Read Our Google Reviews'));
console.log('Homepage contains "Verified Google Reviews":', html.includes('Verified Google Reviews'));
console.log('Homepage contains Place ID ChIJG-YJIXv51WsR13gvhrSbQYA:', html.includes('ChIJG-YJIXv51WsR13gvhrSbQYA'));
console.log('Homepage contains outdated static testimonials:', html.includes('Meet Our Happy Customers'));
