function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <h2 style="color: #323312;">Welcome to my car catalog!</h2>

            <p>
                This page acts as a catalog of cars and their specifications. 
                Users may log into the site and submit their own cars with their 
                respective specifications. The site contains a database that contains
                all user-entered entries. Users can enter things like the title 
                (including year), a photo of the car, a description of its specifications,
                an (optional) price, and a date that the car was acquired (also optional).
                The site also contains a navigation bar on the top right, where users may 
                visit other pages of the site. I have personally experimented with car 
                photography, and have posted a few of these photos 
                <a href="https://www.instagram.com/stclairalex151/" target="_blank"> here</a>.
                Enjoy!
            </p>

            <p style="text-align:center;">
                <img src="pics/car.jpg" style="width:50%; border-radius:10px;">
            </p>
    `;
    document.getElementById(id).innerHTML = content;
}