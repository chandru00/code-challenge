/**
 * Developer: Chandrasekar Kabali
 * Technology Used: Javascript,Jquery,Bootstrap,ES6
 * */

(function () {
    /*@params params is a routing path and option is a call back method*/
    routingMethod = async (params,option) => ( await apiCall(`${params}`,option) );

   /*@params  data server response array
     @descriptor this method looping the user data and binding user info into UI */
   users = async (data) => {
       let usersInfo = data.map ((data) => (
           `<tr class="user-row" id="${data['id']}">
                <td class="user-data">${data['name']}</td>
                <td class="user-data"><div class="btn btn-primary" data-id="${data['id']}" onclick = 'routingMethod ("albums?userId="+event.target.getAttribute("data-id"), "albums")'>Album</div></td>
            </tr>`
       ));
       $('.content-box').empty().append(staticHtml());
       $('.inner-data').empty().append(usersInfo);
       $('.heading').text("Name");
   };

    /*@params  data server response array
     @descriptor manipulating albums rows data and binding html */
   albums = async (data) => {
        let layout = data.map ((data) => (
            `<tr class="user-row" id="${data['userId']}">
                <td class="user-data">${data['title']}</td>
                <td class="user-data"><div class="btn btn-primary" data-id="${data['userId']}" onclick='routingMethod("photos?albumId="+event.target.getAttribute("data-id"),"photos")'>View Photo</div></td>
            </tr>`
        ));
       $('.content-box').empty().append(staticHtml());
       $('.inner-data').empty().append(layout);
       $('.heading').text("Title");
   };


   /*@params  data server response array
    @descriptor checking the photo array length and binding every 100 data updated in the UI */
   photos = async (data) => {
       $('.content-box').empty();
       (data.length >100) ? callRecursive(data) : createPhoto(data);
   };

    /*@params  data server response array ,full data is remaining array of data is pending for binding into UI
    @descriptor checking the photo array length and binding every 100 data updated in the UI */

   createPhoto = async (data,fulldata) => {
       let layout = data.map (data => (
           `<div class="img-box" id="${data['albumId']}">
               <div class="img-box">
                    <img src="${data['thumbnailUrl']}" alt="${data['title']}"/>
                    <p><a href="${data['url']}">${data['title']}</a></p>
                </div>
            </div>`
       ));
       $('.content-box').append(layout);
       if(fulldata) callRecursive(fulldata);

   };

   /*@params response Data of photos array
   @descriptor recursively remove the 100 object in total array and updating 100 objects binding into UI*/

   const callRecursive = (responseData) => {
       let newData=responseData.slice(0, 100);
       responseData.splice(0,100);
       createPhoto(newData,responseData);
   };

    //Select Drop Down trigger here
   changingOption =  async ({target}) => {
        let routes =  $(target).val();
        console.log(routes);
        routingMethod(routes,routes);
    };

    // static page html for table
   const staticHtml = () => (
        '       <table class="table">\n' +
        '            <thead class="thead-dark">\n' +
        '            <tr class="header">\n' +
        '                <th scope="col" class="heading">Name</th>\n' +
        '                <th scope="col">View</th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody class="inner-data">\n' +
        '\n' +
        '            </tbody>\n' +
        '        </table>'
    );

   //Ajax api call fetchinh from Json Placeholder
    const apiCall = (params,callBack) => (
        fetch(`https://jsonplaceholder.typicode.com/${params}`)
            .then(response => response.json())
            .then( response => this[callBack](response))
            .catch(error => console.error('Error:', error))

    );

    /*params first is api call paramter and second is callback method
    First methos to calling it*/
    routingMethod("users","users");


})();

