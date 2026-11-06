(function(){
  var cities=["الدار البيضاء","الرباط","سلا","تمارة","المحمدية","القنيطرة","مراكش","فاس","مكناس","طنجة","تطوان","أكادير","وجدة","الناظور","الجديدة","آسفي","بني ملال","خريبكة","سطات","العيون","الداخلة","مدينة أخرى"];
  var sel=document.getElementById('city');
  cities.forEach(function(c){
    var o=document.createElement('option');
    o.value=c;
    o.textContent=c;
    sel.appendChild(o)});

  var prices={"1":199,"2":379}, total=document.getElementById('total');
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
    var form=this;
    var name=document.getElementById('name').value.trim();
    var tel=phone.value.replace(/\D/g,'');
    var ok=setErr('name',name.length<3?'عافاك كتبي الاسم الكامل ديالك.':'');
    ok=setErr('phone',/^0[567]\d{8}$/.test(tel)?'':'الرقم خاصو يكون فيه 10 أرقام ويبدا ب 05 أو 06 أو 07.')&&ok;
    ok=setErr('city',sel.value?'':'عافاك اختاري المدينة ديالك.')&&ok;
    if(!ok){var first=document.querySelector('.invalid');first&&first.focus();return}

    var offerVal=document.querySelector('input[name=offer]:checked').value;
    var labels={"1":"Pack 1 (4 عطور) - 199 DH","2":"Pack 2 (8 عطور) - 379 DH"};

    var data=new FormData(form);
    data.set('phone',tel);
    data.set('offer',labels[offerVal]);
    data.set('total',prices[offerVal]+' DH');
    data.set('subject','Nouvelle commande - Prestige Parfum');

    var btn=form.querySelector('button[type="submit"]');
    var oldText=btn.textContent;
    btn.disabled=true;
    btn.textContent='...';

    fetch('https://api.web3forms.com/submit',{method:'POST',body:data})
      .then(function(r){return r.json()})
      .then(function(res){
        if(res.success){
          document.getElementById('fields').hidden=true;
          document.getElementById('thanks').hidden=false;
        }else{
          throw new Error('failed');
        }
      })
      .catch(function(){
        alert('وقع مشكل، عاود جرب من فضلك');
        btn.disabled=false;
        btn.textContent=oldText;
      });
  });
})();

