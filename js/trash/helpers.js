function coinFlip(arg1, arg2, chance = .5){
  let randomize = random(1)
  if (randomize<chance){
    return arg1
  }
  else{
    return arg2
  }
}

function edgeless(x = undefined){
    if (x > width){x = 0};
    if (x < 0){x = width};
  return x;
}

function addRemoveObj(arr, quantity, obj){
  if(arr.length>quantity){
    arr.splice(0, 1);
  }
  else if(arr.length<quantity){
    arr.push(
      obj)
  }
}

function mobileVersion(normal, mobile){
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
    return mobile
  }
  else if(document.documentElement.clientWidth < 900){
    return mobile
  }
  else{
    return normal
  }
}
