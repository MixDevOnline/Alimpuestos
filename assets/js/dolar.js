function fetchDolarValuesJSONP(e){let t="jsonpCallback_"+Math.round(1e5*Math.random()),l=document.createElement("script");l.src=`https://horizontalinsidiousrepo.mixdevcode.repl.co/valores?callback=${t}`,document.body.appendChild(l),window[t]=function(a){e(a),document.body.removeChild(l),delete window[t]}}function buildDolarSelect(e){localStorage.setItem("dolarValues",JSON.stringify(e));let t=new Date,l;if(t.getHours()>=15||t.getHours()>=13)l=t.toLocaleDateString("es-AR",{day:"2-digit",month:"2-digit",year:"numeric"});else{let a=new Date(t);a.setDate(t.getDate()-1),l=a.toLocaleDateString("es-AR",{day:"2-digit",month:"2-digit",year:"numeric"})}localStorage.setItem("ultFecha",l),t.getHours()>=13&&15>t.getHours()?localStorage.setItem("ultHora",13):t.getHours()>=15&&localStorage.setItem("ultHora",15);let o=document.getElementById("bancoSelect");e&&Array.isArray(e)&&o&&(o.innerHTML="",e.forEach(e=>{let t=document.createElement("option");t.value=e.value,t.text=e.name,o.appendChild(t)}),document.getElementById("loader").classList.remove("is-active"),document.getElementById("calculadora").style="display: block;",changeDolar())}function shouldUpdateDolarValue(){let e=new Date,t=localStorage.getItem("ultFecha"),l=localStorage.getItem("ultHora");if(!t||null==l)return!0;let a=t.split("/"),o=new Date(a[2],a[1]-1,a[0]);return(e.getHours()>=15||e.getHours()>=13)&&(e-o>=864e5||15!=l)}function updateDolarValueIfNeeded(){shouldUpdateDolarValue()?fetchDolarValuesJSONP(buildDolarSelect):buildDolarSelect(JSON.parse(localStorage.getItem("dolarValues")))}