$(document).ready(function() {
  // fade in cover elements
  $('.cover__container h5').hide().delay(200).fadeIn('slow');
  $('.cover__headline').hide().fadeIn(3000);
  $('.cover__intro').hide().delay(1400).fadeIn('slow');
  $('.cover__container a').hide().delay(1400).fadeIn('slow');

  $(window).scroll( function(){
    $('.hideme').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if( bottom_of_window > bottom_of_object - 250){
          $(this).animate({'opacity':'1'}, 1000);
      }
    });
  });
});


// // code for theme title shatter effect
//
// ;(function() {
//
// /*
// |
// | Simple testing function
// |
// */
// function dd(test, line){
//     console.group('%c Debug Message', 'color: #777; font-size: 14px')
//     console.log('%c'+ test + ' is being tested','color: #333; font-size: 12px')
//     console.log(test)
//     console.dir(test)
//     console.groupEnd()
// }
//
// /*
// |
// | Base Scene Setup
// |
// */
// var Boom = {}
// var scene, camera, renderer
// var objects = []
// var tl = new TimelineMax(),
// tweens = []
// Boom.init = function() {
//     /*
//     |
//     | Create scene, renderer and camera used by
//     | Three.js. Uses CSS3D renderer
//     |
//     */
//
//     scene = new THREE.Scene()
//
//     camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 )
//     camera.position.z = 300
//     camera.position.x = 0
//     camera.position.y = 0
//
//
//     renderer = new THREE.CSS3DRenderer()
//     renderer.sortObjects = false;
//     renderer.setSize( window.innerWidth, window.innerHeight )
//     renderer.domElement.classList.add('three')
//     document.body.appendChild( renderer.domElement )
//
//     window.addEventListener('resize', function(){
//         camera.aspect = window.innerWidth / window.innerHeight
//         camera.updateProjectionMatrix()
//         renderer.setSize( window.innerWidth, window.innerHeight )
//         renderer.render( scene, camera )
//     })
// }
//
// /*
// |
// | Random number functions
// |
// */
// function getRandomArbitrary(min, max) {
//     /*
//     |
//     | Returns a random number between two other numbers
//     |
//     */
//     return Math.random() * (max - min) + min
// }
//
// function makeRandomNegative(number){
//     /*
//     |
//     | Will randomly make a number positive or
//     | nagative. This is nessecary due to
//     | the three.js coordinate system
//     |
//     */
//
//     var conditional = Math.random()
//     if (conditional > .5 ) {
//         return number * -1
//     } else{
//         return number
//     }
// }
//
//
//
// /*
// |
// | Canvas Fragment Class
// | Extends THREE.CSS3DObject
// |
// | Used to render the triangulated canvas paices to
// | be animated into an explosion.
// |
// */
// ;(function(){
//
//     var Fragment = function(options){
//         /*
//         |
//         | Fragment Constructor
//         |
//         */
//         var opts = options || {}
//
//         this.side = opts.count % 2
//         this.index = opts.count
//         this.gridIndex = opts.gridIndex
//         this.sourceCanvas = opts.sourceCanvas
//         this.tileWidth = Math.round( this.sourceCanvas.width / opts.rows)
//         this.tileHeight = Math.round( this.sourceCanvas.height / opts.columns)
//         this.cRow = Math.floor(this.gridIndex / opts.rows)
//         this.cCol = Math.floor(this.gridIndex % opts.rows)
//
//         this.x = (this.cCol * this.tileWidth)
//         this.y = -(this.cRow * this.tileHeight)
//         this.initCanvas()
//         THREE.CSS3DObject.call(this, this.element)
//         this.setStartPosition()
//         this.setTween()
//     }
//     /*
//     |
//     | Set up inhertitance chain and set p as
//     | a shorthand for the class prototype
//     | class methods are attached to p
//     |
//     */
//     var p = Fragment.prototype = Object.create(THREE.CSS3DObject.prototype)
//
//     p.setTween = function(){
//         /*
//         |
//         | Set up Tween properties using random number
//         | generator functions. Tweening handled
//         | by TweenMax / TimelineMax
//         |
//         */
//
//         tweens.push(TweenMax.to(this.position, 9, {
//             x: makeRandomNegative(this.position.x * getRandomArbitrary(10,13)),
//             y: makeRandomNegative(this.position.y * getRandomArbitrary(10,19)),
//             Z: makeRandomNegative(this.position.z * getRandomArbitrary(10,800)),
//             ease: Power1.easeOut,
//             delay: 0.55
//         }))
//
//         tweens.push(TweenMax.to(this.rotation, 7, {
//             x: this.position.x * getRandomArbitrary(.1,.9),
//             y: this.position.y * getRandomArbitrary(.1,.6),
//             Z: this.position.z * getRandomArbitrary(.1,.4),
//             ease: Power0.easeOut,
//             delay: 0.55
//         }))
//
//         tl.insertMultiple(tweens)
//         tl.pause()
//     }
//
//     p.initCanvas = function(){
//
//         /*
//         |
//         | Set up individual canvas tag to be rendered
//         | to the DOM. Canvas will represent
//         | one fragment of the image
//         |
//         */
//
//         var c = document.createElement('canvas')
//         c.setAttribute('data-index', this.index)
//         c.setAttribute('data-side', this.side)
//         c.setAttribute('width', this.tileWidth)
//         c.setAttribute('height', this.tileHeight)
//         c.style.width = this.tileWidth
//         c.style.height = this.tileHeight
//         this.element = c
//         this.drawToCanvas(c)
//     }
//
//     p.drawToCanvas = function(canvas){
//         /*
//         |
//         | Handles drawing the image element for
//         | this particulat fragment will
//         | draw one triangular peice
//         |
//         */
//         var ctx = canvas.getContext('2d')
//         ctx.fillStyle = 'transparent'
//         ctx.beginPath()
//         ctx.moveTo(0,0)
//         if (this.side == 1) {
//             ctx.lineTo(this.tileWidth, 0)
//         }else{
//             ctx.lineTo(0, this.tileHeight)
//         }
//         ctx.lineTo(this.tileWidth, this.tileHeight)
//         ctx.fill()
//         ctx.clip()
//         ctx.drawImage(this.sourceCanvas, -this.x , this.y )
//     }
//
//     p.setStartPosition = function(){
//         /*
//         |
//         | Sets Three.js position based on where
//         | the element belongs in the grid
//         |
//         */
//         this.position.x = this.x  -200
//         this.position.y = this.y  +100
//         this.position.z = 0
//     }
//
//     // return Fragment class
//     window.Fragment = Fragment
//
// })()
//
//
//
// /*
// |
// | Triangulation Logic
// |
// */
//
// // Triangulatin settings
// var ts = {
//     rows: 8,
//     columns: 8
// }
// var totalSections = (ts.rows * ts.columns) * 2
//
//
// function triangulate(total){
//     var gridIndex = 0
//     for (var i = 0; i < total; i++) {
//         var frag = new Fragment({
//             count: i,
//             sourceCanvas: document.getElementById('base-canvas'),
//             rows: ts.rows,
//             columns: ts.columns,
//             gridIndex: gridIndex
//         })
//
//         if (frag.side == 1) {
//             gridIndex++
//         }
//
//         scene.add( frag )
//         objects.push(frag)
//     }
// }
//
//
// /*
// |
// | Base Canvas Draw Logic
// |
// */
// function getCanvasContext(id){
//     var canvas = document.getElementById(id)
//     return canvas.getContext('2d')
// }
//
// function loadImage(src, width, height,cb){
//     var image = new Image(width,height)
//     image.src = src
//     image.onload = function(){
//         cb.call()
//         triangulate(totalSections)
//     }
//     return image
// }
//
// function drawImageToCanvas(canvas, img){
//     var image = loadImage(img, 0, 0,function(){
//         canvas.drawImage(image, -150, 0 )
//
//         var canvas3d = new THREE.CSS3DObject(document.getElementById('base-canvas'))
//         canvas3d.position.set(15,-37,0)
//         scene.add(canvas3d)
//
//         tl.add(TweenMax.to(canvas3d.element, 0.5, {
//             opacity: 0
//         }))
//     })
// }
//
//
// /*
// |
// | Scroll controlls module
// |
// | Binds animation timeline tp
// | page scrolling
// |
// */
// var Scroller = {}
//
// Scroller.getPageHeight = function(){
//
//     return 900
//     //window.innerHeight
// }
//
// Scroller.getScroll = function(){
//     return window.pageYOffset
// }
//
// Scroller.calculatePerc = function(){
//    var percent = this.distance * 100 / this.height
//    var round = percent.toFixed(4)
//
//     this.setTimeline()
//
//     this.percent = round / 100
//     if(this.percent > 1 ){
//         this.percent = 1
//     } else if(this.percent < 0){
//         this.percent = 0
//     }
// }
//
// Scroller.setTimeline = function(){
//
//     tl.progress( this.percent ).pause()
// }
//
// Scroller.init = function(){
//     var _this = this
//     this.height = this.getPageHeight()
//     this.distance = this.getScroll()
//
//     window.addEventListener('scroll',function(){
//         this.distance = this.getScroll()
//         this.calculatePerc()
//     }.bind(this))
//
//     window.addEventListener('resize',function(){
//         this.height = this.getPageHeight()
//     }.bind(this))
// }
//
//
// var mainCanvas = getCanvasContext('base-canvas');
// drawImageToCanvas(mainCanvas, 'img/theme__title.png');
// // drawImageToCanvas(mainCanvas, 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152724/big_boom_arrow.png')
//
//
//
// // Kick everything off
// Boom.init()
// Scroller.init()
//
// /*
// |
// | Primary render loop. Handles frame updates
// |
// */
// TweenMax.ticker.addEventListener("tick", function(){
//
//     // Render our three.js scene and camera
//     renderer.render( scene, camera )
// })
//
// })();
