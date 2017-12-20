var Colors = {
  "RED":"#ff0000",
  "GREEN":"	#008000",
  "BLUE":"#0000ff"
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
