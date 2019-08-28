export default class AutoSave {
  //TODO add description how class works..
  //how class function could be expanded

  constructor(_delay) {
    this.countFrames = 0;
    if(_delay){
      this.delayToReset = _delay;
    }
    else{
      this.delayToReset = 0;
    }
    
  }

  saveImage(_saveOnFrame, _filename) {
    this.countFrames++;
    console.log(this.countFrames)
    if(this.countFrames===_saveOnFrame ){
      saveCanvas(_filename, 'png');
      console.log("image saved")
    };
    if(this.countFrames>=_saveOnFrame+this.delayToReset ){
      this.countFrames = 0;
      console.log("reset counter")
    }
  }
}