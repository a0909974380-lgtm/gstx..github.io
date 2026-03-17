document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  var mw = document.getElementById('mascot-wrap'),
      me = document.getElementById('mascot-el'),
      cp = document.getElementById('chat-panel'),
      cc = document.getElementById('chat-close'),
      cm = document.getElementById('chat-msgs'),
      ci = document.getElementById('chat-input'),
      cs = document.getElementById('chat-send');

  if (mw && me) {
    mw.addEventListener('mousemove', function (e) {
      var r = mw.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
      me.style.transform = 'rotateY(' + (x * 14) + 'deg) rotateX(' + (y * -14) + 'deg)';
    });
    mw.addEventListener('mouseleave', function () { me.style.transform = ''; });
  }

  function addBot(t) { if (!cm) return; var d = document.createElement('div'); d.className = 'msg bot'; d.textContent = t; cm.appendChild(d); cm.scrollTop = cm.scrollHeight; }
  function addUser(t) { if (!cm) return; var d = document.createElement('div'); d.className = 'msg user'; d.textContent = t; cm.appendChild(d); cm.scrollTop = cm.scrollHeight; }
  function openChat() { if (cp) { cp.classList.add('open'); if (ci) ci.focus(); if (cm && cm.children.length === 0) addBot('\u55e8\uff0c\u6211\u662f\u5a01\u5c0f\u679c\uff5e \u60f3\u77e5\u9053\u6eaf\u6e90\u3001\u4ea7\u54c1\u8fd8\u662f\u5408\u4f5c\uff1f\u968f\u4fbf\u95ee\u6211\uff5e'); } }
  function closeChat() { if (cp) cp.classList.remove('open'); }

  function reply(u) {
    var t = (u || '').replace(/\s/g, '');
    if (/\u6eaf\u6e90|\u533a\u5757\u94fe|\u4e00\u679c\u4e00\u7801|\u626b\u7801|\u8d28\u68c0|\u571f\u58e4|\u65bd\u80a5|\u91c7\u6458/.test(t)) return '\u6211\u4eec\u6bcf\u4e00\u9897\u65e0\u82b1\u679c\u90fd\u6709\u300c\u4e00\u679c\u4e00\u7801\u300d\u6570\u5b57\u8eab\u4efd\u8bc1\uff5e\u626b\u7801\u5c31\u80fd\u770b\u5230\u4ece\u571f\u58e4\u68c0\u6d4b\u5230\u8d28\u68c0\u62a5\u544a\u7684\u5168\u6d41\u7a0b\u6570\u636e\uff01';
    if (/\u4ea7\u54c1|\u679c\u9171|\u679c\u9152|\u6587\u521b|\u5e06\u5e03|\u536b\u8863|\u8d2d\u4e70|\u9c9c\u679c/.test(t)) return '\u54b1\u4eec\u6709\u94dc\u9505\u6587\u706b\u6162\u7194\u7684\u679c\u9171\u3001\u4f4e\u6e29\u53d1\u9175\u7684\u679c\u9152\uff0c\u8fd8\u6709\u5a01\u5c0f\u679c\u7cfb\u5217\u6587\u521b\u548c\u9c9c\u679c\u76f4\u4f9b\uff5e\u60f3\u4e86\u89e3\u54ea\u4e00\u6b3e\uff1f';
    if (/\u5408\u4f5c|B\u7aef|\u52a0\u76df|\u8bd5\u6837|\u6388\u6743|\u9910\u996e|\u793c\u76d2/.test(t)) return '\u6211\u4eec\u9762\u5411\u5168\u56fd\u5f00\u653eB\u7aef\u5408\u4f5c\uff01\u63d0\u4f9b\u65e0\u82b1\u679c\u539f\u6d46\u3001\u679c\u8089\u539f\u6599\u3001\u4f01\u4e1a\u5b9a\u5236\u793c\u76d2\u548cIP\u6388\u6743\u3002\u6b22\u8fce\u7533\u8bf7\u514d\u8d39\u8bd5\u6837\uff5e';
    if (/\u52a9\u519c|\u516c\u76ca|\u679c\u519c|\u6536\u8d2d/.test(t)) return '\u6211\u4eec\u901a\u8fc7\u300c\u8ba2\u5355\u4fdd\u6536\u300d\u673a\u5236\uff0c\u7279\u7ea7\u679c\u6ea2\u4ef720%\u6536\u8d2d\uff0c\u76f4\u63a5\u63d0\u5347\u679c\u519c\u6536\u5165\uff01';
    if (/\u4f60\u597d|\u55e8|hello|hi|\u5728\u5417|\u662f\u8c01/.test(t)) return '\u4f60\u597d\u5440\uff01\u6211\u662f\u5a01\u5c0f\u679c\uff0c\u6d77\u98ce\u917f\u9020\u7684\u4e1c\u65b9\u751c\u5c31\u662f\u6211\uff5e';
    if (/\u8c22\u8c22|\u611f\u8c22|\u518d\u89c1|\u62dc\u62dc/.test(t)) return '\u4e0d\u5ba2\u6c14\uff5e \u968f\u65f6\u518d\u6765\u627e\u6211\u73a9\uff01';
    return '\u563b\u563b\uff0c\u4f60\u53ef\u4ee5\u95ee\u6211\uff1a\u6eaf\u6e90\u600e\u4e48\u67e5\u3001\u6709\u54ea\u4e9b\u4ea7\u54c1\u3001B\u7aef\u600e\u4e48\u5408\u4f5c\u3001\u6211\u4eec\u600e\u4e48\u52a9\u519c\uff0c\u6211\u90fd\u719f\uff01';
  }

  if (mw) mw.addEventListener('click', function (e) { e.preventDefault(); openChat(); });
  if (cc) cc.addEventListener('click', closeChat);
  document.addEventListener('click', function (e) { if (cp && cp.classList.contains('open') && !cp.contains(e.target) && mw && !mw.contains(e.target)) closeChat(); });

  if (cs && ci) {
    function send() { var t = (ci.value || '').trim(); if (!t) return; addUser(t); ci.value = ''; setTimeout(function () { addBot(reply(t)); }, 400); }
    cs.addEventListener('click', send);
    ci.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); send(); } });
  }

  // Contact form
  var f = document.getElementById('contact-form'), s = document.getElementById('contact-success');
  if (f && s) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('c-name').value.trim(), p = document.getElementById('c-phone').value.trim(), i = document.getElementById('c-interest').value;
      if (!n || !p || !i) return;
      f.style.display = 'none'; s.classList.add('show');
    });
  }
});
