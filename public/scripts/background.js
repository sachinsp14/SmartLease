var counter = 0;
function changeBG(){
    var imgs = [
        "url(http://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4147-1/the-hesby-apartments-kitchen.jpg)",
        "url(https://cdnblog.rentcafe.com/blog/wp-content/uploads/2015/05/Aurora-apartments-for-rent-in-North-Bethesda-MD.jpg)",
        "url(https://cornerstone.co.tt/wp-content/uploads/2017/01/renting-850x570.jpg)",
        "url(https://s3.amazonaws.com/influencive.com/wp-content/uploads/2017/05/25101605/blockchain.jpg)",
        "url(https://media.minutouno.com/adjuntos/150/imagenes/024/551/0024551184.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


