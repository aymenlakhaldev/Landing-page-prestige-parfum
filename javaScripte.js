(function(){
  var cities=["الدار البيضاء","الرباط","سلا","تمارة","المحمدية","القنيطرة","مراكش","فاس","مكناس","طنجة","تطوان","أكادير","وجدة","الناظور","الجديدة","آسفي","بني ملال","خريبكة","سطات","العيون","الداخلة","مدينة أخرى"];
  var sel=document.getElementById('city');
  cities.forEach(function(c){
    var o=document.createElement('option');
    o.value=c;
    o.textContent=c;
    sel.appendChild(o)});

  var prices={"1":199,"2":389}, total=document.getElementById('total');
  document.querySelectorAll('input[name=offer]').forEach(function(r){
    r.addEventListener('change',function(){total.textContent=prices[r.value]+' درهم'})});

  var phone=document.getElementById('phone');
  phone.addEventListener('input',function(){
    var d=phone.value.replace(/\D/g,'').slice(0,10);
    phone.value=d.replace(/(\d{2})(?=\d)/g,'$1 ').trim();
  });

  function setErr(id,msg){var el=document.getElementById(id);
    document.getElementById('e-'+id).textContent=msg;el.classList.toggle('invalid',!!msg);return !msg}

  document.getElementById('f').addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('name').value.trim();
    var tel=phone.value.replace(/\D/g,'');
    var ok=setErr('name',name.length<3?'عافاك كتبي الاسم الكامل ديالك.':'');
    ok=setErr('phone',/^0[567]\d{8}$/.test(tel)?'':'الرقم خاصو يكون فيه 10 أرقام ويبدا ب 05 أو 06 أو 07.')&&ok;
    ok=setErr('city',sel.value?'':'عافاك اختاري المدينة ديالك.')&&ok;
    if(!ok){var first=document.querySelector('.invalid');first&&first.focus();return}
    var order={name:name,phone:tel,city:sel.value,offer:document.querySelector('input[name=offer]:checked').value,
      total:prices[document.querySelector('input[name=offer]:checked').value],date:new Date().toISOString()};
    // TODO: send `order` to Google Sheets / webhook here
    console.log('order',order);
    document.getElementById('fields').hidden=true;
    document.getElementById('thanks').hidden=false;
  });

  var sticky=document.getElementById('sticky'), form=document.getElementById('order');
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){sticky.classList.toggle('hide',en[0].isIntersecting)},{threshold:.1}).observe(form);
  }
})();

function sendWhatsApp(e) {
  e.preventDefault();

  let nom = document.getElementById("name").value;
  let tel = document.getElementById("phone").value;
  let Ville = document.getElementById("city").value;

  // Récupérer l'offre sélectionnée
  let offre = document.querySelector('input[name="offer"]:checked').value;

  let prix = offre === "1" ? "200 DH" : "400 DH";

  let message = `commende:
Nom: ${nom}
Téléphone: ${tel}
Ville: ${Ville}
Offre : ${offre} pack(s)
Prix total : ${prix}`;

  let numero = "212774046851";

  window.open(
    `https://wa.me/${numero}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}