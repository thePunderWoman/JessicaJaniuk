(function() {
  var u = 'jessica.janiuk';
  var d = 'gmail.com';
  var el = document.getElementById('email-link');
  var desc = document.getElementById('email-desc');
  var addr = u + '@' + d;
  el.href = 'mailto:' + addr;
  desc.textContent = addr;
})();
