function line(kiri, atas, panjang, sudut, warna){
    garis = document.createElement("div");
    gaya = `border: 1px solid ${warna}; 
    border-radius: 3px;
    width: ${panjang}px; 
    height: 3px; 
    background-color: ${warna};
    -moz-transform: rotate(${sudut}deg); 
    -webkit-transform: rotate(${sudut}deg);
    -o-transform: rotate(${sudut}deg);
    -ms-transform: rotate(${sudut}deg);
    -webkit-transform-origin: 0px 0px;
    transform-origin: 1px 1px;
    animation-name: Muncul;
    animation-duration: 0.5s; 
    position: absolute; 
    top: ${atas}px; 
    left: ${kiri}px;`;
    garis.setAttribute('style', gaya);
    garis.classList.add('garis');
    garis.classList.add(indeksLemparan + poinKe[indeksPoin-1]);
    lapangan.appendChild(garis);
}

function membuatLine(x1,y1,x2,y2,warna){
    let a = y2-y1;
    let b = x2-x1;
    let panjang = Math.sqrt(a*a+b*b);

    let sudut = 180/Math.PI*Math.atan(a/b);
    if(x2<x1){
        sudut = 180+sudut
    }

    line(x1,y1,panjang,sudut,warna);
}
 
function menghapusLine(){
    for(let i=0; i<2*(poinKe[indeksPoin-1]+indeksLemparan); i++){
        garisHapus = Array.from(document.getElementsByClassName(i))
        if(garisHapus){
            garisHapus.forEach(e => {
                lapangan.removeChild(e)
            });
        }
    }
}

arrayX = []          // menyimpan koordinat bola pada setiap lemaparan kok
arrayY = []
indeksLemparan = 0
lapangan = document.querySelector(".lapangan");
lapangan.addEventListener("click",function(e){
    console.log(e.clientX)
    if(indeksLemparan==0){
        arrayX[indeksLemparan + poinKe[indeksPoin-1]] = e.clientX;
        arrayY[indeksLemparan + poinKe[indeksPoin-1]] = e.clientY;
        x = e.clientX
        y = e.clientY
        membuatLine(x,y,x,y,"yellow");
    }else{
        arrayX[indeksLemparan + poinKe[indeksPoin-1]] = e.clientX;
        arrayY[indeksLemparan + poinKe[indeksPoin-1]] = e.clientY;
        membuatLine(arrayX[indeksLemparan + poinKe[indeksPoin-1]-1],arrayY[indeksLemparan + poinKe[indeksPoin-1]-1],arrayX[indeksLemparan + poinKe[indeksPoin-1]],arrayY[indeksLemparan + poinKe[indeksPoin-1]],(arrayX[indeksLemparan + poinKe[indeksPoin-1]]>1023)?"yellow":"red");
    }
    // tambah setelah operasi(akan kosong)
    indeksLemparan += 1              
})

tombolUndo = document.querySelector(".undo")
tombolUndo.addEventListener("click",function(){
    if(indeksLemparan>0){
        indeksLemparan -= 1
    }
    garisHapus = Array.from(document.getElementsByClassName(indeksLemparan + poinKe[indeksPoin-1]))
    garisHapus.forEach(e => {
        lapangan.removeChild(e)
    });
})

poinKe = []          // menyimpan banyaknya lemparan kok pada setiap poin
poinKe[0] = 0
indeksPoin = 1
ubahSkorKiri = 0
ubahSkorKanan = 0
tombolDone = document.querySelector(".done")
tombolDone.addEventListener("click", function() {
    skorKiri = document.querySelector(".skor .tim-kiri span")
    skorKanan = document.querySelector(".skor .tim-kanan span")
    if(indeksLemparan>1){
        if(arrayX[indeksLemparan + poinKe[indeksPoin-1]-1]>1023){
            ubahSkorKiri += 1
        }else{
            ubahSkorKanan += 1
        }
        skorKanan.innerHTML = ubahSkorKanan;
        skorKiri.innerHTML = ubahSkorKiri
        poinKe[indeksPoin] = indeksLemparan + poinKe[indeksPoin-1]
        menghapusLine()
        indeksLemparan = 0
        indeksPoin += 1
    }
})

tampilHistory = document.querySelector(".history button")
tampilHistory.addEventListener("click",function(){
    if(indeksLemparan==0){
        menghapusLine()
        historyPoinKeBerapa = document.querySelector(".history input").value
        console.log(poinKe)
        for(let i=1; i<poinKe[historyPoinKeBerapa]-poinKe[historyPoinKeBerapa-1]; i++){
            console.log(i+poinKe[historyPoinKeBerapa-1])
            membuatLine(arrayX[i+poinKe[historyPoinKeBerapa-1]-1],arrayY[i+poinKe[historyPoinKeBerapa-1]-1],arrayX[i+poinKe[historyPoinKeBerapa-1]],arrayY[i+poinKe[historyPoinKeBerapa-1]],(arrayX[i+poinKe[historyPoinKeBerapa-1]]>1023)?"yellow":"red");
        }
    } 
})