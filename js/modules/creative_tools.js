// import below does not work, remove if unresolved
import seedrandom from './seedrandom.js';

export default class CreativeTools {
  constructor(_obj) {
    this.state = {
    }
    //console.log(Math.seedrandom())
  }

  setState(_obj, state = this.state) {
    if (!_obj) return;
    try {
      Object.keys(_obj).forEach(key => {
        if (typeof state[key] === 'object' && !Array.isArray(state[key])) {
          this.setState(_obj[key], state[key]);
          return;
        }
        state[key] = _obj[key];
      })
    }
    catch(error) {
      console.error(error);
    }
  }

  getState(_obj){
    return this.state[_obj]
  }


}
