/*
 * Spotlight / Jan 2020 / harold.sikkema@sheridancollege.ca
 * An example showing a "spotlight" effect creted with two images.
 * A darker image serves as a background, while a lighter image is made
 * to "follow" the mouse through continual updates to the alpha channel.
 * Sloth Image: https://www.wwf-junior.de/
 */
let backgroundImage,spotlight;

preload = () => {
  backgroundImage = loadImage('sloth-dark.jpg');
  spotlight = loadImage('sloth-light.jpg');
}
setup = () =>{
  createCanvas(1280, 720);
}

draw = () => {

  // enable direct editing of the pixels array
  spotlight.loadPixels();

  // reset transparency on all alpha pixels
  // see also: https://p5js.org/reference/#/p5.Image/pixels
  for (i=3; i < (spotlight.width*spotlight.height)*4; i+=4){
    spotlight.pixels[i]=0;
  }

  // build opaque spotlight glow/halo near the mouse pointer
  for (let x = 0; x < spotlight.width; x++) {
    for (let y = 0; y < spotlight.height; y++) {

        // assume full transparency until proven otherwise
        let alpha = 0;

        //how far away is the mouse?
        let mouseDistance = dist(x,y,mouseX,mouseY);

        // if the mouse is nearby, add opacity
        if(mouseDistance < 200 ){
            //feather the edge of the spotlight
            if (mouseDistance > 150){
                alpha = map(mouseDistance, 150, 200, 255, 0);
            }
            // spolight is fully opaque near the centre
            else{
              alpha = 255;
            }
        }
        // update alpha channel pixels
        spotlight.pixels[(y*spotlight.width+x)*4+3] = alpha;
    }
  }
  //save pixels array
  spotlight.updatePixels();

  // render both layers.
  image(backgroundImage, 0, 0);
  image(spotlight, 0, 0);
}
